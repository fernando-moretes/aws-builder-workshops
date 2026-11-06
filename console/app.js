// Console do lab: tudo roda aqui no navegador. Nenhuma chamada de rede depois de carregar a página.
import { CASES, checkCitations, offlineReport, promptFor, queueCapacity } from "./core.mjs";
import { CASE_INFO } from "./catalog.mjs";

const $ = (id) => document.getElementById(id);
const COPY = {
  pt: {
    crumb: "Lab de triagem", lang: "Idioma", modeTitle: "Simulação de ensino.", mode: "Dados fictícios e resposta determinística. Não é saída de modelo e não observa nenhum sistema real. Tudo roda no seu navegador.",
    cases: "Casos", tools: "Ferramentas", docs: "Documentação", expected: "Comportamento esperado de um bom agente", run: "Execução", next: "Próximo passo", reset: "Reiniciar", step: "Passo",
    answer: "Resposta de ensino", evi: "evidências", check: "Teste uma resposta", checkHelp: "Cole a resposta de um modelo, ou escreva a sua, citando fontes fixture://. A checagem acha citação ausente e inventada. Ela não prova que a resposta está certa: quem decide é uma pessoa.",
    draft: "Resposta", checkBtn: "Conferir citações", sample: "Usar exemplo com erro", clean: "Nenhum alerta de citação. Isso não aprova a resposta: revise o conteúdo.", missing: "Recuperadas e não citadas", invented: "Citadas e não recuperadas", none: "Nenhuma ferramenta foi chamada: o pedido está fora do escopo.",
    queueNav: "Capacidade de fila", qKicker: "Exercício", qTitle: "Mais consumidores resolvem o backlog?", qIntro: "Antes de mudar os números, diga em voz alta o que você espera. Depois compare.", arr: "Chegadas por segundo", svc: "Serviço médio (ms)", con: "Consumidores", bac: "Backlog (mensagens)", dep: "Teto da dependência (por segundo)",
    p20: "20 consumidores", p30: "30 consumidores", p80: "30, com teto de 80/s", cap: "Capacidade efetiva", util: "Utilização", surplus: "Folga", drain: "Drenagem", never: "nunca", stable: "Estável", stableNo: "Sem folga: o backlog não diminui com essas taxas.", stableYes: "Há folga para drenar o backlog.", limited: "A dependência é o limite: mais consumidores não criam capacidade do outro lado.",
    qNote: "Taxas constantes. Ignora limites de broker, lotes, retries e falhas. Não é benchmark nem configuração de produção.", foot: "Projeto independente de Fernando Azevedo. Não é material oficial da AWS. Dados fictícios, licença MIT.", caseWord: "Caso", unavailable: "indisponível", stale: "antiga", untrusted: "não confiável", tool: "Ferramenta",
  },
  en: {
    crumb: "Triage lab", lang: "Language", modeTitle: "Teaching simulation.", mode: "Fictional data and a deterministic answer. This is not model output and observes no real system. Everything runs in your browser.",
    cases: "Cases", tools: "Tools", docs: "Documentation", expected: "Expected behavior of a good agent", run: "Run", next: "Next step", reset: "Restart", step: "Step",
    answer: "Teaching answer", evi: "evidence items", check: "Test an answer", checkHelp: "Paste a model's answer, or write your own, citing fixture:// sources. The check finds missing and invented citations. It does not prove the answer is right: a person decides.",
    draft: "Answer", checkBtn: "Check citations", sample: "Use a flawed example", clean: "No citation warnings. This does not approve the answer: review the content.", missing: "Retrieved but not cited", invented: "Cited but not retrieved", none: "No tool was called: the request is out of scope.",
    queueNav: "Queue capacity", qKicker: "Exercise", qTitle: "Do more consumers fix the backlog?", qIntro: "Before changing the numbers, say out loud what you expect. Then compare.", arr: "Arrivals per second", svc: "Average service (ms)", con: "Consumers", bac: "Backlog (messages)", dep: "Dependency limit (per second)",
    p20: "20 consumers", p30: "30 consumers", p80: "30, capped at 80/s", cap: "Effective capacity", util: "Utilization", surplus: "Surplus", drain: "Drain", never: "never", stable: "Stable", stableNo: "No surplus: the backlog does not shrink at these rates.", stableYes: "There is surplus to drain the backlog.", limited: "The dependency is the limit: more consumers don't create capacity on the other side.",
    qNote: "Constant rates. Ignores broker limits, batching, retries and failures. Not a benchmark or a production setting.", foot: "Independent project by Fernando Azevedo. Not official AWS material. Fictional data, MIT license.", caseWord: "Case", unavailable: "unavailable", stale: "stale", untrusted: "untrusted", tool: "Tool",
  },
};

const params = new URLSearchParams(location.search);
const state = { lang: params.get("lang") === "en" ? "en" : "pt", view: params.get("view") === "queue" ? "queue" : "case", caseId: CASES.includes(params.get("case")) ? params.get("case") : "A1", step: 0 };
const el = (tag, props = {}, ...kids) => { const n = Object.assign(document.createElement(tag), props); n.append(...kids); return n; };

function renderChrome() {
  const t = COPY[state.lang];
  document.documentElement.lang = state.lang === "pt" ? "pt-BR" : "en";
  $("lang").value = state.lang;
  const map = { "t-crumb": t.crumb, "t-lang": t.lang, "t-mode-title": t.modeTitle, "t-mode": t.mode, "t-cases": t.cases, "t-tools": t.tools, "t-docs": t.docs, "t-expected": t.expected, "t-run": t.run, "t-answer": t.answer, "t-evi": t.evi, "t-check": t.check, "t-check-help": t.checkHelp, "t-draft": t.draft, "q-kicker": t.qKicker, "q-title": t.qTitle, "q-intro": t.qIntro, "l-arr": t.arr, "l-svc": t.svc, "l-con": t.con, "l-bac": t.bac, "l-dep": t.dep, "q-note": t.qNote, "t-foot": t.foot, next: t.next, reset: t.reset, check: t.checkBtn, sample: t.sample };
  for (const [id, text] of Object.entries(map)) $(id).textContent = text;
  $("cases").replaceChildren(...CASES.map((id) => el("li", {}, navButton(`${id}: ${CASE_INFO[id].title[state.lang]}`, state.view === "case" && state.caseId === id, () => { state.view = "case"; state.caseId = id; state.step = 0; $("draft").value = ""; $("check-out").replaceChildren(); render(); }))));
  $("tools").replaceChildren(el("li", {}, navButton(t.queueNav, state.view === "queue", () => { state.view = "queue"; render(); })));
  $("presets").replaceChildren(...[[t.p20, 20, ""], [t.p30, 30, ""], [t.p80, 30, 80]].map(([label, c, d]) => el("button", { className: "ghost", type: "button", textContent: label, onclick: () => { $("q-con").value = c; $("q-dep").value = d; renderQueue(); } })));
}
function navButton(text, current, onclick) { const b = el("button", { type: "button", textContent: text, onclick }); b.setAttribute("aria-current", String(current)); return b; }

function stepsFor(report) {
  return report.evidence.map((e) => {
    const t = COPY[state.lang];
    const call = report.tool_calls[report.evidence.indexOf(e)];
    const li = el("li");
    const title = el("strong", { textContent: `${call.tool}(${call.component ?? call.incident_id})` });
    if (e.query_status === "unavailable") { li.className = "bad"; title.append(el("span", { className: "tag bad", textContent: t.unavailable })); }
    else if (e.stale) { li.className = "warn"; title.append(el("span", { className: "tag warn", textContent: t.stale })); }
    else if (e.trusted_instructions === false) { li.className = report.case_id === "A4" ? "warn" : "ok"; if (report.case_id === "A4") title.append(el("span", { className: "tag warn", textContent: t.untrusted })); }
    else li.className = "ok";
    const { synthetic, as_of, ...shown } = e;
    li.append(title, el("pre", { textContent: JSON.stringify(shown, null, 2) }));
    return li;
  });
}
function renderCase() {
  const t = COPY[state.lang], id = state.caseId, report = offlineReport({ case_id: id }, state.lang), steps = stepsFor(report), total = Math.max(steps.length, 1), done = state.step >= total;
  $("case-kicker").textContent = `${t.caseWord} ${id}`;
  $("case-title").textContent = CASE_INFO[id].title[state.lang];
  $("case-prompt").textContent = `“${promptFor(id, state.lang)}”`;
  $("case-expected").textContent = CASE_INFO[id].expected[state.lang];
  $("progress").textContent = `${t.step} ${Math.min(state.step, total)}/${total}`;
  $("next").disabled = done; $("reset").disabled = state.step === 0;
  const shown = steps.length ? steps.slice(0, state.step) : state.step ? [el("li", { className: "ok", textContent: t.none })] : [];
  $("steps").replaceChildren(...shown);
  $("answer-panel").hidden = !done;
  $("answer").textContent = report.answer; $("limitation").textContent = report.limitation;
  $("s-model").textContent = report.model_calls; $("s-aws").textContent = report.aws_calls; $("s-mut").textContent = report.mutations; $("s-evi").textContent = report.evidence.length;
}
function renderCheck(text) {
  const t = COPY[state.lang], r = checkCitations(text, state.caseId, state.lang);
  const list = (label, items, cls) => (items.length ? [el("p", {}, el("span", { className: `tag ${cls}`, textContent: label })), el("ul", { className: "clean" }, ...items.map((s) => el("li", {}, el("code", { textContent: s }))))] : []);
  const blocks = [...list(t.missing, r.missing, "warn"), ...list(t.invented, r.invented, "bad")];
  $("check-out").replaceChildren(...(blocks.length ? blocks : [el("p", {}, el("span", { className: "tag ok", textContent: "OK" }), ` ${t.clean}`)]));
}
function renderQueue() {
  const t = COPY[state.lang], dep = $("q-dep").value;
  let r;
  try {
    r = queueCapacity({ arrivalsPerSecond: Number($("q-arr").value), serviceTimeMs: Number($("q-svc").value), consumers: Number($("q-con").value), backlogMessages: Number($("q-bac").value), dependencyLimitPerSecond: dep ? Number(dep) : null });
  } catch (error) { $("q-out").replaceChildren(el("p", { textContent: error.message })); return; }
  const stat = (label, value, cls = "") => el("div", {}, el("dt", { textContent: label }), el("dd", { className: cls, textContent: value }));
  const message = r.limitedByDependency && !r.stable ? t.limited : r.stable ? t.stableYes : t.stableNo;
  $("q-out").replaceChildren(el("dl", { className: "stats" }, stat(t.cap, `${r.effectiveCapacityPerSecond}/s`), stat(t.util, `${r.utilizationPercent}%`, r.stable ? "ok" : "bad"), stat(t.surplus, `${r.surplusPerSecond}/s`), stat(t.drain, r.drainSeconds === null ? t.never : `${r.drainSeconds} s`, r.drainSeconds === null ? "bad" : "ok")), el("p", { textContent: message }));
}
function render() {
  renderChrome();
  $("view-case").hidden = state.view !== "case"; $("view-queue").hidden = state.view !== "queue";
  if (state.view === "case") renderCase(); else renderQueue();
}
$("lang").onchange = (e) => { state.lang = e.target.value; render(); if ($("draft").value && state.view === "case") renderCheck($("draft").value); };
$("next").onclick = () => { state.step += 1; renderCase(); };
$("reset").onclick = () => { state.step = 0; renderCase(); };
$("check").onclick = () => renderCheck($("draft").value);
$("sample").onclick = () => { const id = state.caseId; $("draft").value = (state.lang === "pt" ? `O banco de dados está lento e é a causa raiz. Fonte: fixture://${id}/status/banco` : `The database is slow and it is the root cause. Source: fixture://${id}/status/banco`); renderCheck($("draft").value); };
for (const id of ["q-arr", "q-svc", "q-con", "q-bac", "q-dep"]) $(id).oninput = renderQueue;
render();
