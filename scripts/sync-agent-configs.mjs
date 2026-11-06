// Mantém as cópias da skill e as configurações de IDE deste repo iguais à fonte.
// node scripts/sync-agent-configs.mjs [--check]
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { STEERING } from "../src/init.mjs";

const root = new URL("..", import.meta.url).pathname;
const check = process.argv.includes("--check");
const SKILL = join(root, "skills/builder-workshops");
const COPIES = [".kiro/skills/builder-workshops", ".agents/skills/builder-workshops"];
const LOCAL = { command: "node", args: ["bin/cli.mjs", "mcp"] };
const WORKSPACE = { type: "stdio", command: "node", args: ["${workspaceFolder}/bin/cli.mjs", "mcp"] };
const FILES = {
  ".mcp.json": { mcpServers: { "builder-workshops": { type: "stdio", ...LOCAL } } },
  ".kiro/settings/mcp.json": { mcpServers: { "builder-workshops": LOCAL } },
  ".cursor/mcp.json": { mcpServers: { "builder-workshops": WORKSPACE } },
  ".vscode/mcp.json": { servers: { "builder-workshops": WORKSPACE } },
};
const list = (dir, base = dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? list(p, base) : [p.slice(base.length + 1)]; }).sort();
const problems = [];
const expectFile = (rel, content) => {
  const abs = join(root, rel);
  if (check) { if (!existsSync(abs) || readFileSync(abs, "utf8") !== content) problems.push(rel); return; }
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
};
for (const [rel, cfg] of Object.entries(FILES)) expectFile(rel, `${JSON.stringify(cfg, null, 2)}\n`);
expectFile(".kiro/steering/builder-workshops.md", STEERING);
for (const copy of COPIES) {
  const abs = join(root, copy);
  if (check) {
    const same = existsSync(abs) && JSON.stringify(list(abs)) === JSON.stringify(list(SKILL)) && list(SKILL).every((f) => readFileSync(join(abs, f), "utf8") === readFileSync(join(SKILL, f), "utf8"));
    if (!same) problems.push(copy);
  } else {
    rmSync(abs, { recursive: true, force: true });
    cpSync(SKILL, abs, { recursive: true });
  }
}
// Regras da especificação Agent Skills: nome igual à pasta, descrição até 1024 caracteres.
const front = readFileSync(join(SKILL, "SKILL.md"), "utf8").match(/^---\n([\s\S]*?)\n---/)[1];
const name = front.match(/^name: (.+)$/m)[1];
const description = front.match(/^description: (.+)$/m)[1];
if (name !== "builder-workshops" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) problems.push("SKILL.md: name");
if (description.length > 1024) problems.push(`SKILL.md: description tem ${description.length} caracteres`);
if (problems.length) { console.error(`Fora de sincronia:\n  ${problems.join("\n  ")}\nRode: npm run sync`); process.exit(1); }
console.log(check ? "Configs de agentes em dia." : "Configs de agentes atualizadas.");
