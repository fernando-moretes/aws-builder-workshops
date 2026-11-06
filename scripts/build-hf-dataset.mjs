// Monta o dataset do Hugging Face a partir do repo: casos do motor e saídas reais do Bedrock.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CASES, offlineReport, promptFor } from "../src/core.mjs";
import { CASE_INFO } from "../src/catalog.mjs";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, process.argv[2] ?? "dist-dataset");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const cases = CASES.flatMap((id) => ["pt", "en"].map((lang) => {
  const r = offlineReport({ case_id: id }, lang);
  return { id, lang, title: CASE_INFO[id].title[lang], prompt: promptFor(id, lang), expected: CASE_INFO[id].expected[lang], evidence: JSON.stringify(r.evidence), teaching_answer: r.answer, synthetic: true };
}));
const dir = join(root, "labs/triage-agent/examples/bedrock-2026-11-03");
const runs = readdirSync(dir).sort().map((f) => {
  const r = JSON.parse(readFileSync(join(dir, f), "utf8"));
  return { case_id: r.case_id, model_id: r.model_id, run_date: "2026-11-03", answer: r.answer, evidence: JSON.stringify(r.evidence), tool_calls: JSON.stringify(r.tool_calls), quality_warnings: r.quality_warnings, review_required: r.review_required, model_calls: r.model_calls, mutations: r.mutations, duration_ms: r.duration_ms, input_tokens: r.usage.inputTokens, output_tokens: r.usage.outputTokens };
});
const jsonl = (rows) => `${rows.map((x) => JSON.stringify(x)).join("\n")}\n`;
writeFileSync(join(out, "cases.jsonl"), jsonl(cases));
writeFileSync(join(out, "bedrock_runs.jsonl"), jsonl(runs));
copyFileSync(join(root, "hf/triage-agent-eval/README.md"), join(out, "README.md"));
console.log(`${cases.length} casos e ${runs.length} execuções em ${out}`);
