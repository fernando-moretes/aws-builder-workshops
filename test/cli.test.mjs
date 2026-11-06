import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const BIN = new URL("../bin/cli.mjs", import.meta.url).pathname;
const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: "utf8", env: { ...process.env, NO_COLOR: "1" } });
const tmp = () => mkdtempSync(join(tmpdir(), "bw-"));

test("--help e --version", () => {
  assert.match(run("--help").stdout, /experiment <pasta>/);
  assert.match(run("-v").stdout, /^\d+\.\d+\.\d+/);
});
test("run: saída diz que é simulação, nos dois idiomas", () => {
  assert.match(run("run", "a2").stdout, /offline_simulation/);
  assert.match(run("run", "A2").stdout, /INDISPONÍVEL/);
  assert.match(run("run", "A2", "--lang", "en").stdout, /UNAVAILABLE/);
  assert.equal(JSON.parse(run("run", "A5", "--json").stdout).mutations, 0);
});
test("erros de uso saem com código 2 e mensagem clara", () => {
  for (const args of [["run", "A9"], ["nada"], ["queue", "--arrivals", "x"], ["queue"], ["doc", "../../etc/passwd"], ["init", "emacs"], ["--lang", "fr", "cases"], ["experiment"]]) {
    const r = run(...args);
    assert.equal(r.status, 2, args.join(" "));
    assert.match(r.stderr, /erro:/);
  }
});
test("queue reproduz o gabarito", () => {
  const q = (...a) => JSON.parse(run("queue", "--arrivals", "100", "--service-ms", "200", "--backlog", "6000", "--json", ...a).stdout);
  assert.equal(q("--consumers", "20").drainSeconds, null);
  assert.equal(q("--consumers", "30").drainSeconds, 120);
  assert.equal(q("--consumers", "30", "--dependency-limit", "80").stable, false);
});
test("doc lê só a lista fixa", () => assert.match(run("doc", "atividades").stdout, /Caderno dos participantes/));
test("menu guia pela resposta e sai bem sem entrada", () => {
  const menu = (input, ...a) => spawnSync(process.execPath, [BIN, "menu", ...a], { input, encoding: "utf8", env: { ...process.env, NO_COLOR: "1" } });
  assert.match(menu("3\n").stdout, /Missão 3: Lambda quebrada/);
  assert.match(menu("2\n", "--lang", "en").stdout, /Mission 2: Portfolio online/);
  assert.match(menu("4\n").stdout, /experiment meu-artigo/);
  assert.equal(menu("").status, 0);
});
test("doctor passa", () => assert.equal(run("doctor").status, 0));

test("experiment cria os quatro arquivos e não sobrescreve", () => {
  const dir = join(tmp(), "meu");
  assert.equal(run("experiment", dir).status, 0);
  for (const f of ["PROPOSTA.md", "EVIDENCIAS.md", "ARTIGO.md", "CHECKLIST.md"]) assert.ok(existsSync(join(dir, f)), f);
  writeFileSync(join(dir, "PROPOSTA.md"), "meu texto");
  assert.equal(run("experiment", dir).status, 2);
  assert.equal(readFileSync(join(dir, "PROPOSTA.md"), "utf8"), "meu texto");
  const enDir = join(tmp(), "mine");
  assert.equal(run("experiment", enDir, "--lang", "en").status, 0);
  assert.ok(existsSync(join(enDir, "PROPOSAL.md")));
});

test("init all instala cada cliente com o formato certo", () => {
  const dir = tmp();
  assert.equal(run("init", "all", "--dir", dir).status, 0);
  const read = (p) => JSON.parse(readFileSync(join(dir, p), "utf8"));
  assert.ok(read(".kiro/settings/mcp.json").mcpServers["builder-workshops"]);
  assert.ok(read(".mcp.json").mcpServers["builder-workshops"]);
  assert.ok(read(".cursor/mcp.json").mcpServers["builder-workshops"]);
  assert.ok(read(".vscode/mcp.json").servers["builder-workshops"]);
  for (const p of [".kiro/skills", ".claude/skills", ".cursor/skills", ".github/skills", ".agents/skills"]) assert.ok(existsSync(join(dir, p, "builder-workshops/references/first-experiment.md")), p);
  assert.ok(existsSync(join(dir, ".kiro/steering/builder-workshops.md")));
});
test("init preserva outros servidores e recusa JSON inválido", () => {
  const dir = tmp();
  mkdirSync(join(dir, ".cursor"));
  writeFileSync(join(dir, ".cursor/mcp.json"), JSON.stringify({ mcpServers: { outro: { command: "x" } } }));
  assert.equal(run("init", "cursor", "--dir", dir).status, 0);
  const cfg = JSON.parse(readFileSync(join(dir, ".cursor/mcp.json"), "utf8"));
  assert.ok(cfg.mcpServers.outro && cfg.mcpServers["builder-workshops"]);
  const bad = tmp();
  mkdirSync(join(bad, ".cursor"));
  writeFileSync(join(bad, ".cursor/mcp.json"), "{ nope");
  assert.equal(run("init", "cursor", "--dir", bad).status, 2);
  assert.equal(readFileSync(join(bad, ".cursor/mcp.json"), "utf8"), "{ nope");
});
test("init --dry-run não grava nada", () => {
  const dir = tmp();
  assert.equal(run("init", "kiro", "--dir", dir, "--dry-run").status, 0);
  assert.ok(!existsSync(join(dir, ".kiro")));
});

test("missões: lista, guia, cópia sem sobrescrever e custos", () => {
  assert.match(run("missoes").stdout, /Lambda quebrada/);
  assert.match(run("missao", "2").stdout, /Block Public Access/);
  assert.equal(run("missao", "9").status, 2);
  assert.match(run("missao", "1", "--lang", "en").stdout, /^# Mission 1/);
  const enDir = join(tmp(), "m-en");
  assert.equal(run("missao", "1", enDir, "--lang", "en").status, 0);
  assert.match(readFileSync(join(enDir, "README.md"), "utf8"), /^# Mission 1/);
  assert.equal(existsSync(join(enDir, "README.en.md")), false);
  const dir = join(tmp(), "m");
  assert.equal(run("missao", "3", dir).status, 0);
  assert.ok(existsSync(join(dir, "lambda_function.py")));
  assert.equal(run("missao", "3", dir).status, 2);
  const csv = new URL("../missoes/01-conta-sem-susto/custos-exemplo.csv", import.meta.url).pathname;
  assert.match(run("custos", csv).stdout, /Total: 0\.92 USD -> 25\.63 USD \(\+24\.71 USD\)/);
  assert.equal(run("custos", "/nao/existe.csv").status, 2);
});
test("a função quebrada da missão 3 quebra de verdade, e o evento certo funciona", () => {
  const cwd = new URL("../missoes/03-lambda-quebrada/", import.meta.url).pathname;
  const py = (arg) => spawnSync("python3", ["-B", "rodar_local.py", arg], { cwd, encoding: "utf8" });
  const bad = py("{}");
  assert.notEqual(bad.status, 0);
  assert.match(bad.stderr, /KeyError: 'nome'/);
  assert.match(py('{"nome": "Ana"}').stdout, /Oi, Ana!/);
});
