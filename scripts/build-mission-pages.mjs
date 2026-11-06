// As missões têm uma fonte só: missoes/*/README*.md. Aqui elas viram páginas do site, com a barra de progresso.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { MISSIONS } from "../src/catalog.mjs";

const root = new URL("..", import.meta.url).pathname;
const docs = join(root, "website/src/content/docs");
for (const [lang, file, base, importPath] of [["pt", "README.md", docs, "../../../components/MissionProgress.astro"], ["en", "README.en.md", join(docs, "en"), "../../../../components/MissionProgress.astro"]]) {
  const out = join(base, "missoes");
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const m of MISSIONS) {
    const src = join(root, m.dir, file);
    if (!existsSync(src)) continue;
    const body = readFileSync(src, "utf8").replace(/^# .*\n/, "");
    const title = `${m.n}. ${m.title[lang]}`;
    writeFileSync(join(out, `${m.n}-${m.id}.mdx`), `---\ntitle: "${title}"\ndescription: "${m.question[lang]} ${m.takeaway[lang]}"\n---\n\nimport MissionProgress from "${importPath}";\n\n<MissionProgress mission="${m.id}" />\n${body}\n`);
  }
}
console.log("Páginas de missão geradas.");
