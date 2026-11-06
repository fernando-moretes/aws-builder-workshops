---
title: Known limits
description: What was tested and what was not, so you know what to trust before using it.
---

We prefer to say it here rather than let you find out in the middle of a workshop.

## Verified

- **Missions:** commands, outputs and cleanup ran in a real account on 06/11/2026, through the AWS CLI, with no resource left over.
- **AI answers:** one test per prompt, with links and citations checked.

- Tests of the CLI, the engine and the MCP server, the latter with the official client.
- Parity between `core.mjs` and `core.py`, output by output.
- Python tests of the lab, including the Strands SDK cycle with a simulated Bedrock.
- Five cases with real Bedrock, one sample per case.
- Two Docker images built and run.

## Not yet verified

- **Missions in CloudShell and in the console:** the commands ran through the AWS CLI, not inside CloudShell, and the console clicks follow the documentation.
- **Missions with beginners:** no group has tested them yet. Times and difficulty are estimates.
- **Free tier values:** they change and depend on the account plan.

- **AgentCore managed runtime:** it was not deployed or rehearsed.
- **Inside Kiro, Cursor and VS Code:** the format follows the official documentation, with no test in the app.
- **Reproduction by other people:** [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1) is open for that.
- **Workshops with a real group:** the times are estimates, not measurements.

## Content limits

- The simulation is deterministic: it does not show how a model behaves.
- Passing case A4 does not prove resistance to prompt injection.
- The queue calculation uses constant rates. It is not a benchmark or a production configuration.
- `check_citations` checks citations, not the truthfulness of the answer.
- The limit of 4 calls in Bedrock mode is not a global spending cap.

## Use

Do not use customer or production data. Data, incidents and metrics are all made up. Independent content, with no confirmed schedule at events and no official relationship with AWS.
