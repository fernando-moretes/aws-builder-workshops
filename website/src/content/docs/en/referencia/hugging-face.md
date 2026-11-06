---
title: Hugging Face
description: The lab console as a Space and the evaluation cases as a dataset, published on Hugging Face.
---

| Repository | What it is |
|---|---|
| [Space: Triage Console](https://huggingface.co/spaces/fernandofa42/triage-console) | The same console as this site, runs in the browser |
| [Dataset: Triage Agent Eval](https://huggingface.co/datasets/fernandofa42/triage-agent-eval) | The 5 cases, the expected behavior and the real Bedrock outputs |

## Use the dataset

```python
from datasets import load_dataset

cases = load_dataset("fernandofa42/triage-agent-eval", "cases", split="train")
runs = load_dataset("fernandofa42/triage-agent-eval", "bedrock_runs", split="train")
```

Use it to test your own model on the same cases: generate the answer from `prompt` and `evidence`, and compare it with `expected`. The Bedrock outputs are **one sample per case**, not a benchmark.

## How it's published

The `huggingface.yml` workflow syncs from this repository, with the `HF_TOKEN` secret. Without the secret, the step is skipped with a warning.
