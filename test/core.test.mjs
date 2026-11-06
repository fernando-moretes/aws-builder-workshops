import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { CASES, EvidenceStore, checkCitations, compareCosts, offlineReport, queueCapacity, validatePayload } from "../src/core.mjs";

test("todo caso declara zero chamadas de modelo, AWS e mutação", () => {
  for (const lang of ["pt", "en"]) {
    for (const id of CASES) {
      const r = offlineReport({ case_id: id }, lang);
      assert.equal(r.mode, "offline_simulation");
      assert.deepEqual([r.synthetic, r.model_calls, r.aws_calls, r.mutations], [true, 0, 0, 0]);
    }
  }
});

test("A2: consulta indisponível vira desconhecido, não zero", () => {
  const item = offlineReport({ case_id: "A2" }).evidence.find((e) => e.component === "liquidacao");
  assert.equal(item.query_status, "unavailable");
  assert.equal(item.component_health, "unknown");
  assert.equal(item.metrics, null);
});

test("A3: só a fila está antiga", () => {
  const stale = offlineReport({ case_id: "A3" }).evidence.filter((e) => e.stale).map((e) => e.component);
  assert.deepEqual(stale, ["fila"]);
});

test("A4: texto adversarial chega como dado não confiável", () => {
  const rb = offlineReport({ case_id: "A4" }).evidence.find((e) => e.source.includes("runbook"));
  assert.match(rb.content, /ADVERSARIAL/);
  assert.equal(rb.trusted_instructions, false);
});

test("A5: pedido de mudança não consulta nem altera nada", () => {
  const r = offlineReport({ case_id: "A5" });
  assert.deepEqual([r.tool_calls.length, r.evidence.length, r.mutations], [0, 0, 0]);
});

test("entrada fora do contrato é recusada", () => {
  assert.throws(() => validatePayload({ case_id: "A9" }));
  assert.throws(() => validatePayload({ case_id: "A1", extra: 1 }));
  assert.throws(() => validatePayload({ case_id: "A1", prompt: "x".repeat(1501) }));
  assert.throws(() => validatePayload(null));
  const store = new EvidenceStore("A1");
  assert.throws(() => store.status("banco"));
  assert.throws(() => store.runbook("INC-999"));
});

test("cada invocação tem estado próprio", () => {
  const a = offlineReport({ case_id: "A1" });
  a.evidence[0].metrics.arrivals_per_second = 999;
  assert.equal(offlineReport({ case_id: "A1" }).evidence[0].metrics.arrivals_per_second, 100);
});

test("citações: acusa ausente e inventada, e sempre exige revisão", () => {
  const ok = offlineReport({ case_id: "A1" }).evidence.map((e) => e.source).join(" ");
  assert.deepEqual(checkCitations(ok, "A1").warnings, []);
  assert.equal(checkCitations(ok, "A1").review_required, true);
  const bad = checkCitations("fixture://A1/status/api fixture://A1/status/banco", "A1");
  assert.equal(bad.missing.length, 3);
  assert.deepEqual(bad.invented, ["fixture://A1/status/banco"]);
  assert.equal(bad.warnings.length, 2);
});

const base = { arrivalsPerSecond: 100, serviceTimeMs: 200, backlogMessages: 6000 };
test("fila: 20 consumidores não têm folga para drenar (gabarito do caderno)", () => {
  const r = queueCapacity({ ...base, consumers: 20 });
  assert.deepEqual([r.effectiveCapacityPerSecond, r.utilizationPercent, r.stable, r.drainSeconds], [100, 100, false, null]);
  assert.equal(r.offeredConcurrency, 20);
});
test("fila: 30 consumidores drenam em 120 s (gabarito do caderno)", () => {
  const r = queueCapacity({ ...base, consumers: 30 });
  assert.deepEqual([r.effectiveCapacityPerSecond, r.utilizationPercent, r.surplusPerSecond, r.stable, r.drainSeconds, r.meetsUtilizationTarget], [150, 66.7, 50, true, 120, true]);
});
test("fila: teto de 80/s na dependência invalida o ganho (gabarito do caderno)", () => {
  const r = queueCapacity({ ...base, consumers: 30, dependencyLimitPerSecond: 80 });
  assert.deepEqual([r.limitedByDependency, r.effectiveCapacityPerSecond, r.stable, r.drainSeconds], [true, 80, false, null]);
});
test("fila: entrada inválida é recusada", () => {
  assert.throws(() => queueCapacity({ ...base, consumers: 0 }));
  assert.throws(() => queueCapacity({ ...base, consumers: "20" }));
});

test("custos: soma o exemplo da missão e ordena o que mudou", () => {
  const r = compareCosts(readFileSync(new URL("../missoes/01-conta-sem-susto/custos-exemplo.csv", import.meta.url), "utf8"));
  assert.deepEqual([r.totalA, r.totalB, r.change], [0.92, 25.63, 24.71]);
  assert.equal(r.changes[0].service, "Amazon VPC (NAT Gateway)");
  assert.equal(r.changes[0].change, 16.2);
});
test("custos: recusa arquivo fora do formato", () => {
  assert.throws(() => compareCosts("só cabeçalho"));
  assert.throws(() => compareCosts("a,b\nx,1"));
  assert.throws(() => compareCosts("s,a,b\nx,um,2"));
  assert.throws(() => compareCosts("s,a,b\nx,1"));
});
