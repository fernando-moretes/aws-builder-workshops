"""Grava a saída do core.py em test/golden: é o contrato que o core.mjs precisa repetir."""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "labs" / "triage-agent"))
from core import CASES, offline_report  # noqa: E402

out = ROOT / "test" / "golden"
out.mkdir(parents=True, exist_ok=True)
for case in CASES:
    (out / f"{case}.json").write_text(json.dumps(offline_report({"case_id": case}), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"{len(CASES)} casos gravados em {out}")
