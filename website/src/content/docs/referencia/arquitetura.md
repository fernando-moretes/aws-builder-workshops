---
title: Arquitetura do projeto
description: Como o kit é montado e entregue, e as decisões por trás do motor único, da paridade com Python e do site estático.
---

![Um motor sem rede atende CLI, servidor MCP e console. O lab Python é a referência.](/aws-builder-workshops/img/architecture.pt.svg)

## Decisões

| Decisão | Por quê | Custo que aceitamos |
|---|---|---|
| Motor único em JavaScript, sem dependências | O mesmo arquivo roda na CLI, no MCP e no navegador | Duas implementações: Python e JS |
| Teste de paridade contra o `core.py` | Garante que as duas não divergem | Mudou um lado, precisa regravar o golden |
| MCP implementado à mão, testado com o SDK oficial | Instalação sem dependências | Acompanhar mudanças do protocolo |
| Só leitura por construção | O agente não recebe capacidade de mudar nada | Não demonstra remediação, que fica em [outro lab](https://github.com/fernando-moretes/lab-security-remediation) |
| Site estático no GitHub Pages | Custo zero e nada para operar | Sem backend: o console é simulação local |

## Estrutura do repositório

```text
bin/cli.mjs              CLI
src/core.mjs             motor do lab (roda também no navegador)
src/mcp.mjs              servidor MCP
src/init.mjs             instalador para os clientes
skills/builder-workshops skill, fonte das cópias em .kiro/ e .agents/
templates/experiment     modelos do primeiro experimento (pt, en)
examples/                exemplo completo, com saídas reais
console/                 console do lab no navegador
labs/triage-agent        lab Python com Strands, Bedrock e AgentCore
docs/community           kit original dos workshops
website/                 este site
test/                    testes, inclusive paridade e MCP
```

## Entrega

![Pull request, CI, merge em main e tag. O merge publica a documentação. A tag publica npm, imagens, release e Hugging Face.](/aws-builder-workshops/img/delivery.pt.svg)

| Workflow | Quando roda | O que faz |
|---|---|---|
| `ci.yml` | Pull request e `main` | Testes em Node 20, 22, 24 e 26, testes Python, sincronia, Docker e site |
| `qualidade.yml` | Pull request | Título, branch e tamanho do PR |
| `seguranca.yml` | `main` e semanal | Segredos vazados e dependências vulneráveis |
| `codeql.yml` | Pull request, `main` e semanal | Análise estática de JavaScript e Python |
| `pages.yml` | `main` | Publica este site |
| `release.yml` | Tag `v*` | Publica npm com OIDC e provenance, imagens no GHCR e o GitHub Release |
| `huggingface.yml` | Tag `v*` ou manual | Atualiza o Space e o dataset |
