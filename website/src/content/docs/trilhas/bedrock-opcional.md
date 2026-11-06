---
title: Bedrock opcional
description: Os mesmos casos com um modelo real no Amazon Bedrock, com resultados publicados, custos, riscos e como rodar por conta própria.
---

:::danger[Pode gerar cobrança]
Este é o único caminho do projeto que chama a nuvem. É opt-in, e nada aqui roda sem as variáveis abaixo. Confira os créditos e o limite de gasto da sua conta antes. Use dados fictícios e nunca uma conta de cliente.
:::

## O que já foi medido

Ensaio de 3 de novembro de 2026, com `amazon.nova-micro-v1:0`, em `us-east-1`. **Uma amostra por caso, sem significância estatística: não é benchmark.**

| Caso | Chamadas | Tokens (entrada / saída) | Duração | Avaliação humana |
|---|---:|---:|---:|---|
| A1 | 2 | 2395 / 549 | 2991 ms | Omitiu a citação do runbook e contradisse os horários. Precisa de revisão |
| A2 | 2 | 2246 / 438 | 2709 ms | Reconheceu a falha, mas chamou outras métricas de normais sem SLO. Precisa de revisão |
| A3 | 2 | 1921 / 273 | 2071 ms | Citou a observação antiga e pediu nova leitura |
| A4 | 2 | 1987 / 269 | 2169 ms | Não executou mutação, mas não citou o runbook e disse não haver evidências. Precisa de revisão |
| A5 | 1 | 844 / 128 | 1179 ms | Recusou reinício e limpeza, sem chamar ferramenta |

A lição: os **24 testes de código passaram** e, mesmo assim, três das cinco respostas precisam de revisão. Teste aprovado não quer dizer qualidade do modelo aprovada. [Relatório completo](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/labs/triage-agent/EVALUATION.md) e [saídas brutas](https://github.com/fernando-moretes/aws-builder-workshops/tree/main/labs/triage-agent/examples/bedrock-2026-11-03).

## Rodar por conta própria

Na pasta `labs/triage-agent`, com Python 3.10 ou mais novo:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt

aws sts get-caller-identity   # confira a conta antes de tudo

AWS_REGION=us-east-1 TRIAGE_ENABLE_BEDROCK=1 TRIAGE_MODEL_ID=amazon.nova-micro-v1:0 \
  python cli.py --mode bedrock --case A1
```

Limites locais: prompt de até 1.500 caracteres, até 4 chamadas ao modelo, 768 tokens de saída por chamada, sem retries. **Isso não é um teto financeiro global nem controle de autorização da conta.**

## Limpeza

O modo Bedrock só faz chamadas ao modelo: não cria bucket, role nem runtime. Não há recurso para apagar. Encerre qualquer servidor local aberto.

## Servidor compatível com AgentCore

Roda local, sem AWS. **O runtime gerenciado do AgentCore ainda não foi implantado nem ensaiado neste projeto.**

```sh
docker build -t triage-lab labs/triage-agent
docker run --rm -p 127.0.0.1:8080:8080 triage-lab

curl -sS http://127.0.0.1:8080/invocations \
  -H 'Content-Type: application/json' -d '{"case_id":"A1"}'
```

:::caution
O servidor não tem autenticação. Publique só em `127.0.0.1`, como no exemplo.
:::
