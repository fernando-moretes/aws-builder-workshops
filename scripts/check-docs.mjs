// Regras de texto e links. Falha o CI: links internos quebrados, travessão e menções que não podem ir a público.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); if (["node_modules", ".astro", "dist", ".git", "public"].includes(n)) return []; return statSync(p).isDirectory() ? walk(p) : [p]; });
const roots = ["README.md", "README.en.md", "CONTRIBUTING.md", "SECURITY.md", "AGENTS.md", "CHANGELOG.md", "examples", "skills", "templates", "website/src/content", "docs/media", "console/README.md", "hf"].map((p) => join(root, p)).filter(existsSync);
const files = roots.flatMap((p) => (statSync(p).isDirectory() ? walk(p) : [p])).filter((f) => /\.(md|mdx)$/.test(f));
const problems = [];
// Contexto privado de planejamento e de comunidade fica fora de um repo público.
const PRIVATE = /\b(Pulse|Eduardo Lara|KiKo|Flavio Pimenta)\b/i;
for (const file of files) {
  const rel = relative(root, file);
  const body = readFileSync(file, "utf8");
  if (body.includes("—")) problems.push(`${rel}: travessão`);
  if (PRIVATE.test(body)) problems.push(`${rel}: menção privada`);
  const prose = body.replace(/```[\s\S]*?```/g, "");
  for (const [, target] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const clean = target.split("#")[0].split("?")[0];
    if (clean.startsWith("/aws-builder-workshops/")) {
      const path = clean.replace("/aws-builder-workshops/", "");
      if (/^(img|media)\//.test(path)) { if (!existsSync(join(root, "website/public", path))) problems.push(`${rel}: ${target}`); continue; }
      if (path.startsWith("console")) continue;
      const doc = path.replace(/\/$/, "");
      if (![".md", ".mdx"].some((e) => existsSync(join(root, "website/src/content/docs", doc + e))) && !existsSync(join(root, "website/src/content/docs", doc, "index.mdx"))) problems.push(`${rel}: ${target}`);
    } else if (clean && !existsSync(join(dirname(file), clean))) problems.push(`${rel}: ${target}`);
  }
}
if (problems.length) { console.error(`Problemas na documentação:\n  ${problems.join("\n  ")}`); process.exit(1); }
console.log(`Documentação ok: ${files.length} arquivos.`);
