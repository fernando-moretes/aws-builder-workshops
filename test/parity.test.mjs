import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { CASES, offlineReport } from "../src/core.mjs";

for (const id of CASES) {
  test(`${id}: core.mjs repete a saída gravada do core.py`, () => {
    const golden = JSON.parse(readFileSync(new URL(`golden/${id}.json`, import.meta.url), "utf8"));
    assert.deepEqual(offlineReport({ case_id: id }), golden);
  });
}

test("o golden está em dia com o core.py atual", { skip: !hasPython() }, () => {
  const code = 'import json,sys;sys.path.insert(0,"labs/triage-agent");from core import CASES,offline_report;print(json.dumps({c:offline_report({"case_id":c}) for c in CASES}))';
  const live = JSON.parse(execFileSync("python3", ["-B", "-c", code], { cwd: new URL("..", import.meta.url), encoding: "utf8" }));
  for (const id of CASES) assert.deepEqual(offlineReport({ case_id: id }), live[id]);
});

function hasPython() {
  try {
    execFileSync("python3", ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
