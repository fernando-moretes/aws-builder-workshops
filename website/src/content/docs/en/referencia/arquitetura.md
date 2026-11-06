---
title: Project architecture
description: How the kit is built and delivered, and the decisions behind the single engine, Python parity and the static site.
---

![A network-free engine serves the CLI, the MCP server and the console. The Python lab is the reference.](/aws-builder-workshops/img/architecture.en.svg)

## Decisions

| Decision | Why | Cost we accept |
|---|---|---|
| A single JavaScript engine, no dependencies | The same file runs in the CLI, the MCP and the browser | Two implementations: Python and JS |
| Parity test against `core.py` | Makes sure the two don't diverge | Change one side and you have to regenerate the golden file |
| MCP implemented by hand, tested with the official SDK | Install with no dependencies | Keeping up with protocol changes |
| Read-only by construction | The agent is never given the capability to change anything | Doesn't demonstrate remediation, which lives in [another lab](https://github.com/fernando-moretes/lab-security-remediation) |
| Static site on GitHub Pages | Zero cost and nothing to operate | No backend: the console is a local simulation |

## Repository structure

```text
bin/cli.mjs              CLI
src/core.mjs             lab engine (also runs in the browser)
src/mcp.mjs              MCP server
src/init.mjs             installer for the clients
skills/builder-workshops skill, source of the copies in .kiro/ and .agents/
templates/experiment     first-experiment templates (pt, en)
examples/                complete example, with real outputs
console/                 lab console in the browser
labs/triage-agent        Python lab with Strands, Bedrock and AgentCore
docs/community           original workshop kit
website/                 this site
test/                    tests, including parity and MCP
```

## Delivery

![Pull request, CI, merge to main and tag. The merge publishes the documentation. The tag publishes npm, images, the release and Hugging Face.](/aws-builder-workshops/img/delivery.en.svg)

| Workflow | When it runs | What it does |
|---|---|---|
| `ci.yml` | Pull request and `main` | Tests on Node 20, 22, 24 and 26, Python tests, sync, Docker and site |
| `qualidade.yml` | Pull request | Title, branch and PR size |
| `seguranca.yml` | `main` and weekly | Leaked secrets and vulnerable dependencies |
| `codeql.yml` | Pull request, `main` and weekly | Static analysis of JavaScript and Python |
| `pages.yml` | `main` | Publishes this site |
| `release.yml` | Tag `v*` | Publishes npm with OIDC and provenance, images to GHCR and the GitHub Release |
| `huggingface.yml` | Tag `v*` or manual | Updates the Space and the dataset |
