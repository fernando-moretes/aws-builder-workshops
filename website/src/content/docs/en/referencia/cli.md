---
title: CLI reference
description: All the commands and options of builder-workshops, with examples.
---

```text
builder-workshops <command> [options]
```

| Command | What it does |
|---|---|
| `menu` | Interactive menu to choose where to start |
| `missoes` | Lists the missions |
| `missao <1\|2\|3> [folder]` | Shows the guide, or copies the mission to a folder |
| `custos <file.csv>` | Sums a cost report, so you can check the AI |
| `experiment <folder>` | Creates the four experiment files. Does not overwrite without `--force` |
| `run <A1..A5>` | Runs a lab case |
| `cases` | Lists the cases |
| `queue` | Capacity calculation |
| `workshops` | Lists the workshops |
| `doc <name>` | Reads a document, in Portuguese: `atividades`, `facilitador`, `modelos`, `demonstracoes`, `propostas`, `avaliacao` |
| `mcp` | Starts the MCP server over stdio |
| `init <client>` | Installs MCP and skill: `kiro`, `claude`, `cursor`, `vscode`, `codex`, `all` |
| `doctor` | Checks the environment |

Example:

```sh
npx -y moretes-builder-workshops missao 3 my-mission --lang en
```

## Options

| Option | Applies to | What it does |
|---|---|---|
| `--lang pt\|en` | almost all | Language. Default: `pt` |
| `--json` | `run`, `cases`, `queue`, `workshops` | JSON output |
| `--dir <folder>` | `init` | Destination folder. Default: the current one |
| `--force` | `init`, `experiment` | Replaces what already exists |
| `--dry-run` | `init` | Shows what it would do, without writing |
| `--arrivals` | `queue` | Arrivals per second (required) |
| `--service-ms` | `queue` | Average service time in ms (required) |
| `--consumers` | `queue` | Consumers (required) |
| `--backlog` | `queue` | Accumulated messages |
| `--concurrency` | `queue` | Concurrency per consumer |
| `--dependency-limit` | `queue` | Ceiling of the dependency, per second |
| `--target` | `queue` | Target utilization in %. Default: 70 |

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Succeeded |
| 1 | `doctor` found a problem |
| 2 | Usage error: command, argument or file |

It respects `NO_COLOR`. Without a terminal, the output comes without colors.

## As a library

```js
import { offlineReport, queueCapacity, checkCitations } from "moretes-builder-workshops";

const report = offlineReport({ case_id: "A2" }, "en");
const math = queueCapacity({ arrivalsPerSecond: 100, serviceTimeMs: 200, consumers: 30, backlogMessages: 6000 });
```
