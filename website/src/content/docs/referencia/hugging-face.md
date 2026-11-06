---
title: Hugging Face
description: O console do lab como Space e os casos de avaliação como dataset, publicados no Hugging Face.
---

| Repositório | O que é |
|---|---|
| [Space: Triage Console](https://huggingface.co/spaces/fernandofa42/triage-console) | O mesmo console deste site, roda no navegador |
| [Dataset: Triage Agent Eval](https://huggingface.co/datasets/fernandofa42/triage-agent-eval) | Os 5 casos, o comportamento esperado e as saídas reais do Bedrock |

## Usar o dataset

```python
from datasets import load_dataset

cases = load_dataset("fernandofa42/triage-agent-eval", "cases", split="train")
runs = load_dataset("fernandofa42/triage-agent-eval", "bedrock_runs", split="train")
```

Use para testar o seu modelo nos mesmos casos: gere a resposta a partir de `prompt` e `evidence`, e compare com `expected`. As saídas do Bedrock são **uma amostra por caso**, não um benchmark.

## Como é publicado

O workflow `huggingface.yml` sincroniza a partir deste repositório, com o segredo `HF_TOKEN`. Sem o segredo, a etapa é pulada com um aviso.
