"""Reproducible local workshop runner; defaults to offline simulation."""
import argparse
import json
from core import CASES, offline_report

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--case", choices=CASES, default="A1")
    parser.add_argument("--mode", choices=("offline", "bedrock"), default="offline")
    args = parser.parse_args()
    payload = {"case_id": args.case}
    if args.mode == "bedrock":
        from agent import bedrock_report
        report = bedrock_report(payload)
    else:
        report = offline_report(payload)
    print(json.dumps(report,ensure_ascii=False,indent=2))

if __name__ == "__main__":
    main()
