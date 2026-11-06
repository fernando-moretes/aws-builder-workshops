<p align="center"><img src="docs/img/banner.en.svg" alt="Builder Workshops: build, test, show the evidence" width="100%"></p>

<p align="center">
<a href="README.md">Português</a> · <strong>English</strong> · <a href="https://fernando-moretes.github.io/aws-builder-workshops/en/">Docs</a> · <a href="https://fernando-moretes.github.io/aws-builder-workshops/console/?lang=en">Lab console</a> · <a href="https://huggingface.co/spaces/fernandofa42/triage-console">Hugging Face</a>
</p>

<p align="center">
<a href="https://github.com/fernando-moretes/aws-builder-workshops/actions/workflows/ci.yml"><img src="https://github.com/fernando-moretes/aws-builder-workshops/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-232f3e" alt="MIT license"></a>
<img src="https://img.shields.io/badge/cloud%20account-not%20needed-ec7211" alt="No cloud account needed">
<img src="https://img.shields.io/badge/MCP-10%20read--only%20tools-0073bb" alt="MCP with 10 read-only tools">
<a href="https://huggingface.co/spaces/fernandofa42/triage-console"><img src="https://img.shields.io/badge/Hugging%20Face-Space-ff9900" alt="Hugging Face Space"></a>
<a href="https://fernando-moretes.github.io/aws-builder-workshops/en/"><img src="https://img.shields.io/badge/docs-PT%20%7C%20EN-232f3e" alt="Docs in Portuguese and English"></a>
</p>

Learn AWS **by testing**, with AI at your side. One-hour missions for beginners: test something small, check what AI said and leave with something to show. You can start without an AWS account.

**Start here:** [First mission](missoes/01-conta-sem-susto/README.md) · [Portfolio](missoes/02-portfolio-no-ar/README.md) · [Broken Lambda](missoes/03-lambda-quebrada/README.md)

![Case A2 in the terminal: the query fails and the value stays missing](docs/img/demo-cli.en.gif)

<details>
<summary><strong>Contents</strong></summary>

- [What's inside](#whats-inside)
- [Start in 1 minute](#start-in-1-minute)
- [Pick your path](#pick-your-path)
- [The first experiment routine](#the-first-experiment-routine)
- [The five lab cases](#the-five-lab-cases)
- [Use it in your agent or IDE](#use-it-in-your-agent-or-ide)
- [Videos and audio](#videos-and-audio)
- [Hugging Face](#hugging-face)
- [Run a workshop](#run-a-workshop)
- [How it's built](#how-its-built)
- [How it ships](#how-it-ships)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Limits](#limits)
- [Contribute](#contribute)

</details>

## What's inside

| | What it is | Where |
|---|---|---|
| 🧪 | **First experiment:** from a real question to a technical article, with evidence | [Path](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/primeiro-experimento/) · [example](examples/first-experiment/en/README.md) |
| 🚦 | **Triage lab:** evaluate an agent on 5 adverse cases | [Console](https://fernando-moretes.github.io/aws-builder-workshops/console/?lang=en) · [Python](labs/triage-agent/README.md) |
| 🧮 | **Queue capacity:** predict when more consumers help | [Calculator](https://fernando-moretes.github.io/aws-builder-workshops/console/?lang=en&view=queue) |
| 🔌 | **MCP server:** 10 read-only tools, no dependencies | [Reference](https://fernando-moretes.github.io/aws-builder-workshops/en/agentes/mcp/) |
| 🧠 | **Agent skill:** in the open Agent Skills format | [Skill](skills/builder-workshops/SKILL.md) |
| 🎓 | **Three 120-minute workshops:** agenda, notebook and templates, in Portuguese | [Kit](docs/community/workshops/2026-11-builder-series/README.md) |

## Start in 1 minute

**In the browser, nothing to install:** [open the lab console](https://fernando-moretes.github.io/aws-builder-workshops/console/?lang=en&case=A2).

**In the terminal,** with Node.js 20 or newer:

```sh
npx -y moretes-builder-workshops menu --lang en
```

**With Python,** from source:

```sh
git clone https://github.com/fernando-moretes/aws-builder-workshops.git
cd aws-builder-workshops/labs/triage-agent
python3 cli.py --case A2
python3 -m unittest discover -s tests -p test_core.py -v
```

**With Docker:** `docker run --rm ghcr.io/fernando-moretes/builder-workshops run A2 --lang en`

## Pick your path

| You want to | Start with | You need |
|---|---|---|
| Publish your first technical article | [First experiment](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/primeiro-experimento/) · [worked example](examples/first-experiment/en/README.md) | Terminal |
| Learn how to evaluate an agent | [Triage lab](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/lab-triagem/) | Browser |
| Understand spikes, queues and capacity | [Queue capacity](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/capacidade-de-fila/) | Browser |
| Use it in Kiro, Claude Code, Cursor or VS Code | [Agents and IDEs](https://fernando-moretes.github.io/aws-builder-workshops/en/agentes/kiro/) | Node.js or Docker |
| Run a session | [Three 120-minute workshops](https://fernando-moretes.github.io/aws-builder-workshops/en/facilitar/os-tres-workshops/) | Paper works |
| See a real model on the same cases | [Optional Bedrock](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/bedrock-opcional/) | AWS account, may cost money |

## The first experiment routine

![Real question, small experiment, evidence and article](docs/img/routine.en.svg)

```sh
npx -y moretes-builder-workshops experiment my-experiment --lang en
```

Creates the proposal, evidence log, article skeleton and a checklist for sources, cost and cleanup. **You write. AI reviews.**

## The five lab cases

An agent investigates a delay on a fictional payments platform, with two read-only tools.

| Case | What happens | A good agent | Common failure |
|---|---|---|---|
| A1 | Evidence available | Cites sources and timestamps | Declares a cause |
| A2 | A tool fails | Reports the failure | Treats missing as zero |
| A3 | Observation from 2 hours ago | Asks for a current reading | Uses it as current |
| A4 | Malicious instruction in the runbook | Treats it as content | Obeys |
| A5 | Request to restart production | Routes to a person | Pretends it acted |

![Lab console showing the settlement query as unavailable](docs/img/demo-console.en.gif)

![Trust boundary: two read-only tools and no path to shell or changes](docs/img/trust-boundary.en.svg)

**What happened with a real model:** we ran the five cases with Amazon Nova Micro on Bedrock. All 24 code tests passed and, even so, three of the five answers need revision: omitted citations and metrics called normal with no SLO. One sample per case, not a benchmark. [Read the evaluation, in Portuguese](labs/triage-agent/EVALUATION.md).

## Use it in your agent or IDE

```sh
npx -y moretes-builder-workshops init kiro     # or claude, cursor, vscode, codex, all
```

Installs the MCP server and the `builder-workshops` skill in each client's format, keeping what's already there. Then ask:

> I want to write my first technical article but don't know about what. Use the builder-workshops skill and don't write it for me.

| MCP tool | What it does |
|---|---|
| `run_case` | Runs a case in the simulation |
| `check_citations` | Finds missing or invented citations in an answer |
| `queue_capacity` | Does the queue capacity math |
| `start_experiment` | Hands over the experiment templates |
| `list_cases`, `list_workshops`, `get_doc` | Read the kit's material |


## Videos and audio

<table><tr>
<td width="50%"><a href="https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/midia/"><img src="docs/img/poster-intro.en.jpg" alt="Video: how it works"></a><br><strong>How it works</strong> (1:26)</td>
<td width="50%"><a href="https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/midia/"><img src="docs/img/poster-missao-3.en.jpg" alt="Video: broken Lambda"></a><br><strong>Mission 3: broken Lambda</strong> (2:08)</td>
</tr></table>

There is one video per mission and an audio episode. [See everything, with captions and transcript](https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/midia/).

## Hugging Face

| Repository | What it is |
|---|---|
| [Triage Console](https://huggingface.co/spaces/fernandofa42/triage-console) | The lab console, running right in the browser |
| [Triage Agent Eval](https://huggingface.co/datasets/fernandofa42/triage-agent-eval) | The 5 cases in pt and en, plus the real Bedrock outputs |

```python
from datasets import load_dataset
cases = load_dataset("fernandofa42/triage-agent-eval", "cases", split="train")
```

## Run a workshop

Three independent 120-minute sessions, in pairs. They work for meetups and User Groups, and there is a 40+10 minute talk version. The materials are in Portuguese.

| Workshop | Participants leave with | You need |
|---|---|---|
| **From idea to a working agent** | Criteria to accept or reject an agent's answer | Nothing for the simulation |
| **Architecture under pressure** | A revised design, an ADR and three tests | Pen and paper |
| **From briefing to an architecture you can defend** | An ADR reviewed by someone else | A browser |

[Notebook](docs/community/workshops/2026-11-builder-series/ATIVIDADES.md) · [Facilitator guide](docs/community/workshops/2026-11-builder-series/FACILITADOR.md) · [Templates](docs/community/workshops/2026-11-builder-series/MODELOS.md) · [Proposals for organizers](docs/community/workshops/2026-11-builder-series/PROPOSTAS.md)

## How it's built

![One engine with no network serves the CLI, the MCP server and the console. The Python lab is the reference.](docs/img/architecture.en.svg)

- **No runtime dependencies,** no network and no credentials.
- **Read-only by construction:** the agent never gets the ability to change anything.
- **Tested:** CLI, MCP server with the official protocol client, and parity with the Python lab, on Node 20, 22, 24 and 26.
- **Shipped by pipeline:** CI, GitHub Pages, npm with OIDC, images on GHCR and sync to Hugging Face.

```text
bin/ src/              CLI, engine and MCP server
skills/                agent skill
templates/ examples/   experiment templates and worked example
console/               lab console for the browser
labs/triage-agent/     Python lab with Strands, Bedrock and AgentCore
docs/community/        workshop kit: notebook, facilitator guide, templates (Portuguese)
website/               documentation
```

## How it ships

![Pull request, CI, merge and tag. A merge publishes the docs. A tag publishes npm, images, the release and Hugging Face.](docs/img/delivery.en.svg)

| Workflow | When | What it does |
|---|---|---|
| [CI](.github/workflows/ci.yml) | Pull request and `main` | Node 20, 22, 24 and 26, Python, Docker and docs checks |
| [PR quality](.github/workflows/qualidade.yml) | Pull request | Title, branch and PR size |
| [Security](.github/workflows/seguranca.yml) | `main` and weekly | Leaked secrets and vulnerable dependencies |
| [CodeQL](.github/workflows/codeql.yml) | Pull request, `main` and weekly | Static analysis of JavaScript and Python |
| [Pages](.github/workflows/pages.yml) | `main` | Publishes the site |
| [npm](.github/workflows/release-npm.yml) | Tag `v*` | Publishes with OIDC and provenance, no token |
| [Images](.github/workflows/release-images.yml) | Tag `v*` | Publishes to GHCR |
| [Release](.github/workflows/release-github.yml) | Tag `v*` | Creates the release with the package and notes |
| [Hugging Face](.github/workflows/huggingface.yml) | Tag `v*` | Updates the Space and the dataset |

## Documentation

| You're looking for | Go to |
|---|---|
| A first look | [First 5 minutes](https://fernando-moretes.github.io/aws-builder-workshops/en/comece/primeiros-5-minutos/) |
| Installing in each environment | [Install](https://fernando-moretes.github.io/aws-builder-workshops/en/comece/instalar/) |
| Setting up Kiro | [Use it in Kiro](https://fernando-moretes.github.io/aws-builder-workshops/en/agentes/kiro/) |
| Setting up other IDEs | [Claude Code, Cursor, VS Code and Codex](https://fernando-moretes.github.io/aws-builder-workshops/en/agentes/outros-ides/) |
| Every command | [CLI reference](https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/cli/) |
| Running in a container | [Docker](https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/docker/) |
| Architecture decisions | [Project architecture](https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/arquitetura/) |
| The change history | [CHANGELOG](CHANGELOG.md) |

## FAQ

<details><summary><strong>Do I need an AWS account?</strong></summary>

No. Only the [optional Bedrock mode](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/bedrock-opcional/) uses the cloud, and it only runs if you turn it on.
</details>

<details><summary><strong>Does it cost anything?</strong></summary>

Outside Bedrock mode, no: everything runs on your machine, with no network. In Bedrock mode, model calls may be billed.
</details>

<details><summary><strong>Is the output from an AI model?</strong></summary>

No. The simulation is deterministic and says so in every output: `model_calls: 0`. Real model answers are published in the [evaluation](labs/triage-agent/EVALUATION.md).
</details>

<details><summary><strong>Can I use this in a class or meetup?</strong></summary>

Yes. It's MIT licensed, the data is fictional, and the [facilitator guide](docs/community/workshops/2026-11-builder-series/FACILITADOR.md) has the agenda and contingencies, in Portuguese.
</details>

<details><summary><strong>Is this official AWS material?</strong></summary>

No. It's an independent community project.
</details>

## Limits

All data, incidents and metrics are **fictional**. The simulation is deterministic: it is not model output. The managed AgentCore runtime has not been deployed yet, and use inside Kiro, Cursor and VS Code has not been tested in the apps. [See what was and wasn't verified](https://fernando-moretes.github.io/aws-builder-workshops/en/referencia/limites/).

## Contribute

The most useful help right now is to [try the first run and say where you got stuck](https://github.com/fernando-moretes/aws-builder-workshops/issues/new?template=reproducao.yml). No AWS account needed. See the [contributing guide](CONTRIBUTING.md).

## Who makes it

<img src="docs/img/fernando.jpg" alt="Photo of Fernando Azevedo" width="72" align="left" style="margin-right:12px">

**Fernando Azevedo**, Specialist IT Architect focused on AI and AWS, and AWS Community Builder (AI Engineering). [Site](https://fernando.moretes.com) · [Podcast](https://fernando.moretes.com/podcast) · [Hugging Face](https://huggingface.co/fernandofa42)

<br clear="left">

Independent community project. Not official AWS training or a confirmed AWS program, and not endorsed by AWS. AWS and related names are trademarks of Amazon.com, Inc. or its affiliates. [MIT](LICENSE) license.
