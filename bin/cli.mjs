#!/usr/bin/env node
// CLI do kit: sem dependências, sem rede, sem credenciais.
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { CASES, offlineReport, queueCapacity } from "../src/core.mjs";
import { CASE_INFO, DOCS, WORKSHOPS } from "../src/catalog.mjs";
import { startStdioServer } from "../src/mcp.mjs";
import { CLIENTS, planInit } from "../src/init.mjs";

const ROOT = new URL("../", import.meta.url);
const VERSION = JSON.parse(readFileSync(new URL("package.json", ROOT), "utf8")).version;
const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => paint(1, s);
const dim = (s) => paint(2, s);
const orange = (s) => paint("38;5;208", s);
const die = (message, code = 2) => { console.error(`${paint(31, "erro:")} ${message}`); process.exit(code); };

const HELP = `${bold("builder-workshops")} ${VERSION}
Workshops práticos de agentes de IA e arquitetura. Offline, dados fictícios, só leitura.
Hands-on AI agent and architecture workshops. Offline, fictional data, read-only.

${bold("Comece aqui / Start here")}
  experiment <pasta>         Cria o seu primeiro experimento (dúvida, evidência, artigo)
  run <A1..A5>               Roda um caso do lab de triagem
  cases                      Lista os casos e o comportamento esperado

${bold("Exercícios / Exercises")}
  queue                      Conta de capacidade de fila
                             --arrivals 100 --service-ms 200 --consumers 30
                             [--backlog 6000] [--dependency-limit 80]
  workshops                  Lista os três workshops de 120 minutos
  doc <nome>                 Lê um documento do kit (${Object.keys(DOCS).join(", ")})

${bold("Agentes e IDEs / Agents and IDEs")}
  mcp                        Inicia o servidor MCP por stdio
  init <cliente>             Instala MCP e skill em: ${[...Object.keys(CLIENTS), "all"].join(", ")}
                             [--dir .] [--force] [--dry-run]
  doctor                     Confere o ambiente

${bold("Opções / Options")}
  --lang pt|en               Idioma (padrão: pt)
  --json                     Saída em JSON
  -v, --version              Versão

Documentação: https://fernando-moretes.github.io/aws-builder-workshops/
`;

const OPTIONS = {
  lang: { type: "string", default: "pt" }, json: { type: "boolean" }, help: { type: "boolean", short: "h" }, version: { type: "boolean", short: "v" },
  dir: { type: "string", default: "." }, force: { type: "boolean" }, "dry-run": { type: "boolean" },
  arrivals: { type: "string" }, "service-ms": { type: "string" }, consumers: { type: "string" }, backlog: { type: "string" }, "dependency-limit": { type: "string" }, concurrency: { type: "string" }, target: { type: "string" },
};
let parsed;
try {
  parsed = parseArgs({ options: OPTIONS, allowPositionals: true });
} catch (error) {
  die(`${error.message}\nUse --help para ver as opções.`);
}
const { values: opts, positionals: [command, ...rest] } = parsed;
if (!["pt", "en"].includes(opts.lang)) die("--lang deve ser pt ou en");
const lang = opts.lang;
const en = lang === "en";

function printReport(report) {
  const info = CASE_INFO[report.case_id];
  console.log(`\n${orange(bold(`${report.case_id}: ${info.title[lang]}`))}`);
  console.log(dim(`${en ? "Expected" : "Esperado"}: ${info.expected[lang]}\n`));
  console.log(`${bold(en ? "Mode" : "Modo")}: ${report.mode} ${dim(`(model_calls ${report.model_calls}, aws_calls ${report.aws_calls}, mutations ${report.mutations})`)}\n`);
  console.log(bold(en ? "Evidence" : "Evidências"));
  if (!report.evidence.length) console.log(dim(en ? "  none: no tool was called" : "  nenhuma: nenhuma ferramenta foi chamada"));
  for (const e of report.evidence) {
    if (e.component) {
      const flag = e.query_status === "unavailable" ? paint(31, en ? " UNAVAILABLE" : " INDISPONÍVEL") : e.stale ? paint(33, en ? " STALE" : " ANTIGA") : "";
      console.log(`  ${e.source}${flag}`);
      console.log(dim(`    observed_at: ${e.observed_at}  metrics: ${JSON.stringify(e.metrics)}`));
    } else {
      console.log(`  ${e.source} ${dim("trusted_instructions: false")}`);
      if (report.case_id === "A4") console.log(paint(33, `    ${e.content.split("\n").pop()}`));
    }
  }
  console.log(`\n${bold(en ? "Teaching answer" : "Resposta de ensino")}\n  ${report.answer}\n`);
  console.log(dim(report.limitation));
}

const commands = {
  cases() {
    const data = CASES.map((id) => ({ id, title: CASE_INFO[id].title[lang], expected: CASE_INFO[id].expected[lang] }));
    if (opts.json) return console.log(JSON.stringify(data, null, 2));
    for (const c of data) console.log(`${orange(c.id)}  ${bold(c.title)}\n    ${c.expected}`);
    console.log(dim(`\n${en ? "Next" : "Próximo passo"}: builder-workshops run A2`));
  },
  run() {
    const id = (rest[0] ?? "").toUpperCase();
    if (!CASES.includes(id)) die(`${en ? "Choose a case" : "Escolha um caso"}: ${CASES.join(", ")}`);
    const report = offlineReport({ case_id: id }, lang);
    if (opts.json) return console.log(JSON.stringify(report, null, 2));
    printReport(report);
  },
  queue() {
    const num = (name) => { const v = opts[name]; if (v === undefined) return undefined; const n = Number(v); if (Number.isNaN(n)) die(`--${name} ${en ? "must be a number" : "deve ser um número"}`); return n; };
    const input = { arrivalsPerSecond: num("arrivals"), serviceTimeMs: num("service-ms"), consumers: num("consumers") };
    for (const [flag, key] of [["arrivals", "arrivalsPerSecond"], ["service-ms", "serviceTimeMs"], ["consumers", "consumers"]]) if (input[key] === undefined) die(`${en ? "missing" : "faltou"} --${flag}`);
    if (opts.backlog !== undefined) input.backlogMessages = num("backlog");
    if (opts["dependency-limit"] !== undefined) input.dependencyLimitPerSecond = num("dependency-limit");
    if (opts.concurrency !== undefined) input.concurrencyPerConsumer = num("concurrency");
    if (opts.target !== undefined) input.targetUtilizationPercent = num("target");
    let r;
    try { r = queueCapacity(input); } catch (error) { die(error.message); }
    if (opts.json) return console.log(JSON.stringify(r, null, 2));
    console.log(`${bold(en ? "Effective capacity" : "Capacidade efetiva")}: ${r.effectiveCapacityPerSecond}/s${r.limitedByDependency ? paint(33, en ? " (limited by the dependency)" : " (limitada pela dependência)") : ""}`);
    console.log(`${bold(en ? "Utilization" : "Utilização")}: ${r.utilizationPercent}%`);
    console.log(`${bold(en ? "Surplus" : "Folga")}: ${r.surplusPerSecond}/s`);
    console.log(`${bold(en ? "Stable" : "Estável")}: ${r.stable ? (en ? "yes" : "sim") : paint(31, en ? "no" : "não")}`);
    console.log(`${bold(en ? "Backlog drain" : "Drenagem do backlog")}: ${r.drainSeconds === null ? paint(31, en ? "never at these rates" : "nunca, com essas taxas") : `${r.drainSeconds} s`}`);
    console.log(dim(`\n${en ? "Constant rates. Not a benchmark or a production setting." : "Taxas constantes. Não é benchmark nem configuração de produção."}`));
  },
  workshops() {
    const data = WORKSHOPS.map((w) => ({ id: w.id, minutes: w.minutes, title: w.title[lang], summary: w.summary[lang], needs: w.needs[lang] }));
    if (opts.json) return console.log(JSON.stringify(data, null, 2));
    for (const w of data) console.log(`${orange(bold(w.title))} ${dim(`(${w.minutes} min, ${w.id})`)}\n  ${w.summary}\n  ${dim(w.needs)}\n`);
  },
  doc() {
    const doc = DOCS[rest[0]];
    if (!doc) die(`${en ? "Choose a document" : "Escolha um documento"}: ${Object.keys(DOCS).join(", ")}`);
    process.stdout.write(readFileSync(new URL(doc.file, ROOT), "utf8"));
  },
  experiment() {
    if (!rest[0]) die(en ? "tell me the folder: builder-workshops experiment my-experiment" : "diga a pasta: builder-workshops experiment meu-experimento");
    const target = resolve(rest[0]);
    const source = new URL(`templates/experiment/${lang}/`, ROOT);
    const names = readdirSync(source);
    const taken = names.filter((n) => existsSync(join(target, n)));
    if (taken.length && !opts.force) die(`${en ? "already exists, nothing changed" : "já existe, nada foi alterado"}: ${taken.join(", ")}`);
    mkdirSync(target, { recursive: true });
    for (const name of names) copyFileSync(new URL(name, source), join(target, name));
    console.log(`${paint(32, "✓")} ${en ? "Created" : "Criado"}: ${target}\n`);
    const [proposal, evidence, article, check] = en ? ["PROPOSAL.md", "EVIDENCE.md", "ARTICLE.md", "CHECKLIST.md"] : ["PROPOSTA.md", "EVIDENCIAS.md", "ARTIGO.md", "CHECKLIST.md"];
    console.log((en
      ? [`1. ${proposal}: write your real question and your hypothesis, before testing.`, `2. ${evidence}: run the smallest test and log what you expected and what happened.`, `3. ${article}: write it yourself, from the evidence. AI reviews, it does not write.`, `4. ${check}: sources, cost, cleanup and data, before publishing.`]
      : [`1. ${proposal}: escreva a dúvida real e a hipótese, antes de testar.`, `2. ${evidence}: rode o menor teste e anote o esperado e o observado.`, `3. ${article}: escreva você, a partir da evidência. A IA revisa, não escreve.`, `4. ${check}: fontes, custo, limpeza e dados, antes de publicar.`]).join("\n"));
  },
  mcp() {
    startStdioServer();
  },
  init() {
    const client = rest[0];
    if (!client || (client !== "all" && !CLIENTS[client])) die(`${en ? "Choose" : "Escolha"}: ${[...Object.keys(CLIENTS), "all"].join(", ")}`);
    let plan;
    try {
      plan = planInit(client, resolve(opts.dir), { force: opts.force });
    } catch (error) {
      die(error.message);
    }
    for (const step of plan) {
      const mark = step.action === "skip" ? dim("-") : paint(32, opts["dry-run"] ? "~" : "✓");
      console.log(`${mark} ${step.path}${step.note ? dim(`  ${step.note}`) : ""}`);
      if (opts["dry-run"] || step.action === "skip") continue;
      mkdirSync(dirname(step.absolute), { recursive: true });
      if (step.action === "write") writeFileSync(step.absolute, step.content);
      if (step.action === "copy-dir") cpSync(new URL(step.source, ROOT), step.absolute, { recursive: true, force: true });
    }
    console.log(dim(`\n${opts["dry-run"] ? (en ? "Dry run: nothing was written." : "Simulação: nada foi gravado.") : en ? "Reopen your IDE or reload MCP servers." : "Reabra o IDE ou recarregue os servidores MCP."}`));
  },
  doctor() {
    const major = Number(process.versions.node.split(".")[0]);
    const checks = [
      ["Node.js >= 20", major >= 20, process.version],
      [en ? "Lab engine" : "Motor do lab", offlineReport({ case_id: "A1" }).mutations === 0, en ? "offline, no mutation" : "offline, sem mutação"],
      [en ? "Kit documents" : "Documentos do kit", Object.values(DOCS).every((d) => existsSync(new URL(d.file, ROOT))), `${Object.keys(DOCS).length}`],
      ["Skill", existsSync(new URL("skills/builder-workshops/SKILL.md", ROOT)), "skills/builder-workshops"],
    ];
    for (const [name, ok, detail] of checks) console.log(`${ok ? paint(32, "✓") : paint(31, "✗")} ${name} ${dim(detail)}`);
    if (checks.some(([, ok]) => !ok)) process.exit(1);
    console.log(dim(en ? "\nNo credentials needed. Nothing here calls the network." : "\nNão precisa de credenciais. Nada aqui chama a rede."));
  },
};

if (opts.version) console.log(VERSION);
else if (opts.help || !command) console.log(HELP);
else if (!Object.hasOwn(commands, command)) die(`${en ? "unknown command" : "comando desconhecido"}: ${command}\n${en ? "Use --help." : "Use --help."}`);
else commands[command]();
