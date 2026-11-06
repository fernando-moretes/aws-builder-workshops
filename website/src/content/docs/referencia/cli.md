---
title: Referência da CLI
description: Todos os comandos e opções de builder-workshops, com exemplos.
---

```text
builder-workshops <comando> [opções]
```

| Comando | O que faz |
|---|---|
| `experiment <pasta>` | Cria os quatro arquivos do experimento. Não sobrescreve sem `--force` |
| `run <A1..A5>` | Roda um caso do lab |
| `cases` | Lista os casos |
| `queue` | Conta de capacidade |
| `workshops` | Lista os workshops |
| `doc <nome>` | Lê um documento: `atividades`, `facilitador`, `modelos`, `demonstracoes`, `propostas`, `avaliacao` |
| `mcp` | Inicia o servidor MCP por stdio |
| `init <cliente>` | Instala MCP e skill: `kiro`, `claude`, `cursor`, `vscode`, `codex`, `all` |
| `doctor` | Confere o ambiente |

## Opções

| Opção | Vale para | O que faz |
|---|---|---|
| `--lang pt\|en` | quase todos | Idioma. Padrão: `pt` |
| `--json` | `run`, `cases`, `queue`, `workshops` | Saída em JSON |
| `--dir <pasta>` | `init` | Pasta de destino. Padrão: a atual |
| `--force` | `init`, `experiment` | Substitui o que já existe |
| `--dry-run` | `init` | Mostra o que faria, sem gravar |
| `--arrivals` | `queue` | Chegadas por segundo (obrigatório) |
| `--service-ms` | `queue` | Serviço médio em ms (obrigatório) |
| `--consumers` | `queue` | Consumidores (obrigatório) |
| `--backlog` | `queue` | Mensagens acumuladas |
| `--concurrency` | `queue` | Concorrência por consumidor |
| `--dependency-limit` | `queue` | Teto da dependência, por segundo |
| `--target` | `queue` | Utilização-alvo em %. Padrão: 70 |

## Códigos de saída

| Código | Significado |
|---|---|
| 0 | Deu certo |
| 1 | `doctor` encontrou um problema |
| 2 | Erro de uso: comando, argumento ou arquivo |

Respeita `NO_COLOR`. Sem terminal, a saída vem sem cores.

## Como biblioteca

```js
import { offlineReport, queueCapacity, checkCitations } from "moretes-builder-workshops";

const report = offlineReport({ case_id: "A2" }, "pt");
const math = queueCapacity({ arrivalsPerSecond: 100, serviceTimeMs: 200, consumers: 30, backlogMessages: 6000 });
```
