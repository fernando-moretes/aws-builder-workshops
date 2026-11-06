---
title: Docker
description: The kit and lab server images, how to use them, and what they do and don't do.
---

## Kit: CLI and MCP

Runs without root and doesn't use the network.

```sh
docker run --rm ghcr.io/fernando-moretes/builder-workshops run A2 --lang en
docker run --rm -i ghcr.io/fernando-moretes/builder-workshops mcp
```

To build locally:

```sh
docker build -t builder-workshops .
docker run --rm builder-workshops doctor --lang en
```

## Lab server

A Python server compatible with AgentCore, in simulation mode by default. Installs Strands and the AgentCore SDK.

```sh
docker run --rm -p 127.0.0.1:8080:8080 ghcr.io/fernando-moretes/triage-lab

curl -sS http://127.0.0.1:8080/invocations \
  -H 'Content-Type: application/json' -d '{"case_id":"A5"}'
```

:::caution[No authentication]
Publish only on `127.0.0.1`, as in the example. Don't expose this port to the internet.
:::

## Tags

`latest` and the version, like `0.1.0`. In real production, pin the version or the digest.
