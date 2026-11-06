// Monta o console estático: a mesma pasta serve o site (website/public/console) e o Space.
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const targets = process.argv.slice(2);
for (const rel of targets.length ? targets : ["website/public/console"]) {
  const out = join(root, rel);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const f of ["index.html", "app.js", "console.css"]) cpSync(join(root, "console", f), join(out, f));
  cpSync(join(root, "src/core.mjs"), join(out, "core.mjs"));
  cpSync(join(root, "src/catalog.mjs"), join(out, "catalog.mjs"));
  console.log(`console -> ${rel}`);
}
