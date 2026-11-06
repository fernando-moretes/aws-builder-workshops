// Diagramas em SVG, um por idioma, gerados aqui para o texto nunca divergir. Sem ícones de terceiros.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
mkdirSync(join(root, "docs/img"), { recursive: true });
const C = { bg: "#ffffff", ink: "#16191f", muted: "#545b64", line: "#879596", squid: "#232f3e", orange: "#ec7211", soft: "#f2f3f3", blue: "#0073bb", blueSoft: "#f1faff", ok: "#1d8102", okSoft: "#f2f8f0", bad: "#d13212", badSoft: "#fdf3f1" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = (x, y, s, { size = 15, weight = 400, fill = C.ink, anchor = "middle" } = {}) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
function box(x, y, w, h, title, lines = [], { fill = C.bg, stroke = C.line, top = null, titleFill = C.ink } = {}) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
  if (top) out += `<rect x="${x}" y="${y}" width="${w}" height="5" fill="${top}"/>`;
  const start = y + (lines.length ? 30 : h / 2 + 5);
  out += text(x + w / 2, start, title, { weight: 700, fill: titleFill });
  lines.forEach((l, i) => { out += text(x + w / 2, start + 22 + i * 19, l, { size: 13, fill: C.muted }); });
  return out;
}
const arrow = (x1, y1, x2, y2, { label, color = C.squid, dash } = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" marker-end="url(#a)"${dash ? ' stroke-dasharray="6 5"' : ""}/>${label ? text((x1 + x2) / 2, (y1 + y2) / 2 - 8, label, { size: 12, fill: C.muted }) : ""}`;
const svg = (w, h, title, desc, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d" font-family="'Open Sans','Helvetica Neue',Arial,sans-serif"><title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc><defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.squid}"/></marker></defs><rect width="${w}" height="${h}" fill="${C.bg}"/>${body}</svg>\n`;

const T = {
  pt: {
    routine: ["A rotina do primeiro experimento", "Quatro etapas, do que confundiu você até um artigo que outra pessoa consegue repetir.", ["1. Dúvida real", "2. Experimento pequeno", "3. Evidência", "4. Artigo"], [["O que me confundiu?", "Para quem isso importa?"], ["Até 2 horas", "Local, dados fictícios"], ["Esperado x observado", "Inclusive o que falhou"], ["Escrito por você", "A IA só revisa"]], ["PROPOSTA.md", "PROPOSTA.md", "EVIDENCIAS.md", "ARTIGO.md + CHECKLIST.md"], "Hipótese derrubada também é resultado: volte para a dúvida com o que aprendeu."],
    arch: ["Arquitetura do kit", "Um motor sem rede atende CLI, servidor MCP e console no navegador. O lab Python é a referência, garantida por teste de paridade.", "Quem usa", ["Pessoa no terminal", "Agente ou IDE", "Pessoa no navegador", "Agente Python"], [["npx, Docker"], ["Kiro, Claude Code,", "Cursor, VS Code"], ["Site e Hugging Face"], ["Strands + Bedrock", "opcional, opt-in"]], ["CLI", "Servidor MCP (stdio)", "Console estático", "labs/triage-agent"], "Motor do lab (core.mjs)", "Evidência sintética, só leitura. Sem rede, sem credencial, zero mutação.", "core.py", "Teste de paridade", "Conteúdo", "Caderno, guia do facilitador, modelos, skill e avaliação real"],
    flow: ["Fronteira de confiança do agente", "O agente só recebe duas ferramentas de leitura. Texto vindo das ferramentas é dado, nunca instrução. Quem decide mudanças é uma pessoa.", "Pedido da pessoa", "Agente", ["Modelo + instruções", "No máximo 4 chamadas"], "consultar_status", ["api, fila, liquidacao"], "consultar_runbook", ["INC-001, não confiável"], "Dados fictícios", ["Relógio fixo"], "Resposta com fontes", ["Observação, hipótese,", "lacuna, próximo passo"], "Revisão humana", ["review_required: true"], "Não existe", ["shell, SQL, HTTP arbitrário", "ferramenta de mudança"], "somente leitura", "sem caminho"],
    pipe: ["Como o projeto é entregue", "Todo pull request passa por testes em Node e Python, Docker e build do site. O merge publica a documentação, e uma tag publica os pacotes.", ["Pull request", "CI", "main", "Tag vX.Y.Z"], [["revisão"], ["Node 20, 22, 24", "Python, Docker, site"], ["merge"], ["versão no", "package.json"]], ["GitHub Pages", "npm (OIDC)", "Imagens no GHCR", "GitHub Release", "Hugging Face"]],
  },
  en: {
    routine: ["The first experiment routine", "Four steps, from what confused you to an article someone else can repeat.", ["1. Real question", "2. Small experiment", "3. Evidence", "4. Article"], [["What confused me?", "Who does it matter to?"], ["Up to 2 hours", "Local, fictional data"], ["Expected vs. observed", "Including what failed"], ["Written by you", "AI only reviews"]], ["PROPOSAL.md", "PROPOSAL.md", "EVIDENCE.md", "ARTICLE.md + CHECKLIST.md"], "A refuted hypothesis is a result too: go back to the question with what you learned."],
    arch: ["Kit architecture", "One engine with no network serves the CLI, the MCP server and the browser console. The Python lab is the reference, guaranteed by a parity test.", "Who uses it", ["Person in a terminal", "Agent or IDE", "Person in a browser", "Python agent"], [["npx, Docker"], ["Kiro, Claude Code,", "Cursor, VS Code"], ["Site and Hugging Face"], ["Strands + Bedrock", "optional, opt-in"]], ["CLI", "MCP server (stdio)", "Static console", "labs/triage-agent"], "Lab engine (core.mjs)", "Synthetic, read-only evidence. No network, no credentials, zero mutations.", "core.py", "Parity test", "Content", "Notebook, facilitator guide, templates, skill and real evaluation"],
    flow: ["Agent trust boundary", "The agent only gets two read-only tools. Text from tools is data, never instructions. A person decides on changes.", "Person's request", "Agent", ["Model + instructions", "At most 4 calls"], "consultar_status", ["api, fila, liquidacao"], "consultar_runbook", ["INC-001, untrusted"], "Fictional data", ["Fixed clock"], "Answer with sources", ["Observation, hypothesis,", "gap, next step"], "Human review", ["review_required: true"], "Does not exist", ["shell, SQL, arbitrary HTTP", "any tool that changes things"], "read-only", "no path"],
    pipe: ["How the project ships", "Every pull request runs Node and Python tests, Docker and the site build. A merge publishes the docs, and a tag publishes the packages.", ["Pull request", "CI", "main", "Tag vX.Y.Z"], [["review"], ["Node 20, 22, 24", "Python, Docker, site"], ["merge"], ["version in", "package.json"]], ["GitHub Pages", "npm (OIDC)", "Images on GHCR", "GitHub Release", "Hugging Face"]],
  },
};

function routine(t) {
  const [title, desc, names, details, files, note] = t.routine;
  let b = "";
  names.forEach((n, i) => {
    const x = 20 + i * 240;
    b += box(x, 30, 205, 112, n, details[i], { top: C.orange, fill: i === 3 ? C.blueSoft : C.bg });
    b += text(x + 102, 168, files[i], { size: 12, fill: C.blue, weight: 600 });
    if (i < 3) b += arrow(x + 205, 86, x + 238, 86);
  });
  b += `<path d="M 842 182 C 842 222, 122 222, 122 186" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a)"/>`;
  b += text(480, 246, note, { size: 13, fill: C.muted });
  return svg(980, 262, title, desc, b);
}
function arch(t) {
  const [title, desc, who, users, details, ifaces, core, coreDesc, py, parity, content, contentDesc] = t.arch;
  let b = text(20, 26, who, { size: 13, weight: 700, fill: C.muted, anchor: "start" });
  users.forEach((u, i) => {
    const x = 20 + i * 240;
    b += box(x, 38, 215, 80, u, details[i], { fill: C.soft });
    b += arrow(x + 107, 118, x + 107, 150);
    b += box(x, 152, 215, 50, ifaces[i], [], { fill: i === 3 ? C.blueSoft : C.bg, top: C.orange });
  });
  [0, 1, 2].forEach((i) => { b += arrow(127 + i * 240, 202, 127 + i * 240, 246); });
  b += `<rect x="20" y="248" width="695" height="72" fill="${C.squid}"/>` + text(367, 278, core, { weight: 700, fill: "#fff", size: 16 }) + text(367, 302, coreDesc, { size: 13, fill: "#d5dbdb" });
  b += box(740, 248, 215, 72, py, [], { fill: C.blueSoft }) + arrow(847, 202, 847, 246);
  b += arrow(715, 284, 738, 284, { color: C.squid }) + text(727, 342, parity, { size: 12, fill: C.blue, weight: 600 });
  b += box(20, 360, 935, 62, content, [contentDesc], { fill: C.soft });
  return svg(975, 436, title, desc, b);
}
function flow(t) {
  const [title, desc, req, agent, agentD, st, stD, rb, rbD, data, dataD, ans, ansD, human, humanD, none, noneD, ro, nopath] = t.flow;
  let b = box(20, 110, 150, 70, req, [], { fill: C.soft });
  b += arrow(170, 145, 218, 145);
  b += box(220, 95, 190, 100, agent, agentD, { top: C.orange });
  b += `<rect x="450" y="20" width="330" height="205" fill="${C.okSoft}" stroke="${C.ok}" stroke-dasharray="6 5"/>` + text(615, 42, ro, { size: 12, fill: C.ok, weight: 700 });
  b += box(465, 52, 195, 70, st, stD) + box(465, 136, 195, 74, rb, rbD);
  b += arrow(410, 125, 463, 90) + arrow(410, 165, 463, 170);
  b += box(680, 90, 88, 84, data.split(" ")[0], [data.split(" ")[1]], { fill: C.bg });
  b += arrow(660, 90, 678, 110) + arrow(660, 170, 678, 150);
  b += box(220, 250, 190, 96, ans, ansD, {}) + arrow(315, 195, 315, 248);
  b += box(20, 262, 150, 74, human, humanD, { fill: C.blueSoft, top: C.blue, titleFill: C.blue });
  b += arrow(220, 298, 172, 298);
  b += `<rect x="450" y="250" width="330" height="96" fill="${C.badSoft}" stroke="${C.bad}"/>` + text(615, 280, none, { weight: 700, fill: C.bad }) + text(615, 304, noneD[0], { size: 13, fill: C.muted }) + text(615, 324, noneD[1], { size: 13, fill: C.muted });
  b += `<line x1="400" y1="195" x2="470" y2="248" stroke="${C.bad}" stroke-width="2" stroke-dasharray="4 5"/>` + text(428, 236, nopath, { size: 11, fill: C.bad, anchor: "end" });
  return svg(800, 366, title, desc, b);
}
function pipe(t) {
  const [title, desc, names, details, outs] = t.pipe;
  let b = "";
  names.forEach((n, i) => { const x = 20 + i * 200; b += box(x, 30, 170, 92, n, details[i], { top: i === 3 ? C.orange : C.squid }); if (i < 3) b += arrow(x + 170, 76, x + 198, 76); });
  b += arrow(530, 122, 530, 170);
  b += box(435, 172, 190, 46, outs[0], [], { fill: C.blueSoft });
  outs.slice(1).forEach((o, i) => { const y = 144 + i * 42; b += box(655, y, 150, 36, o, [], { fill: C.soft }); });
  b += arrow(705, 122, 705, 142);
  return svg(830, 320, title, desc, b);
}
const BANNER = { pt: ["Aprenda AWS testando.", "Missões de 1 hora, com a IA ao seu lado. Dá para começar sem conta."], en: ["Learn AWS by testing.", "One-hour missions, with AI at your side. You can start without an account."] };
function banner(lang) {
  const [title, sub] = BANNER[lang];
  let grid = "";
  for (let x = 0; x <= 1200; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="300" stroke="#fff" stroke-opacity=".04"/>`;
  for (let y = 0; y <= 300; y += 40) grid += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#fff" stroke-opacity=".04"/>`;
  const body = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0f1b2a"/><stop offset=".65" stop-color="#232f3e"/><stop offset="1" stop-color="#37475a"/></linearGradient></defs><rect width="1200" height="300" fill="url(#g)"/>${grid}<rect y="294" width="1200" height="6" fill="#ec7211"/>`
    + text(60, 78, "BUILDER WORKSHOPS", { size: 20, weight: 700, fill: "#ff9900", anchor: "start" })
    + text(60, 150, title, { size: 52, weight: 700, fill: "#fff", anchor: "start" })
    + text(60, 200, sub, { size: 24, fill: "#d5dbdb", anchor: "start" })
    + text(60, 256, "$ npx -y moretes-builder-workshops menu", { size: 19, fill: "#eaeded", anchor: "start" });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" role="img" aria-label="Builder Workshops: ${esc(title)}" font-family="'Open Sans','Helvetica Neue',Arial,sans-serif">${body}</svg>\n`;
}
for (const lang of ["pt", "en"]) {
  writeFileSync(join(root, `docs/img/banner.${lang}.svg`), banner(lang));
  const t = T[lang];
  for (const [name, fn] of [["routine", routine], ["architecture", arch], ["trust-boundary", flow], ["delivery", pipe]]) {
    for (const dir of ["docs/img", "website/public/img"]) {
      mkdirSync(join(root, dir), { recursive: true });
      writeFileSync(join(root, dir, `${name}.${lang}.svg`), fn(t));
    }
  }
}
console.log("Diagramas gerados.");
