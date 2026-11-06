---
title: Known limits
description: What was tested and what wasn't, so you know what to trust before using it.
---

We'd rather say it here than have you find out in the middle of a workshop.

## Verified

- Tests for the CLI, the engine and the MCP server, the latter with the official client.
- Parity between `core.mjs` and `core.py`, output by output.
- Python tests for the lab, including the Strands SDK cycle with a simulated Bedrock.
- Five cases with real Bedrock, one sample per case.
- Two Docker images built and run.

## Not yet verified

- **AgentCore managed runtime:** not deployed or rehearsed.
- **Inside Kiro, Cursor and VS Code:** the format follows the official documentation, with no test in the app.
- **Reproduction by other people:** [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1) is open for that.
- **Workshops with a real audience:** the timings are estimates, not measurements.

## Content limits

- The simulation is deterministic: it doesn't show how a model behaves.
- Passing case A4 doesn't prove resistance to prompt injection.
- The queue math uses constant rates. It's not a benchmark or a production setting.
- `check_citations` checks citations, not the truthfulness of the answer.
- The 4-call limit in Bedrock mode is not a global spending ceiling.

## Use

Don't use customer or production data. Data, incidents and metrics are all fictional. Independent content, with no confirmed place on any event agenda and no official relationship with AWS.
