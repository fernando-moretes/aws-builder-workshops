---
title: Docker
description: Imagens do kit e do servidor do lab, como usar, o que elas fazem e o que não fazem.
---

## Kit: CLI e MCP

Roda sem root e não usa rede.

```sh
docker run --rm ghcr.io/fernando-moretes/builder-workshops run A2
docker run --rm -i ghcr.io/fernando-moretes/builder-workshops mcp
```

Para construir localmente:

```sh
docker build -t builder-workshops .
docker run --rm builder-workshops doctor
```

## Servidor do lab

Servidor Python compatível com AgentCore, em modo simulação por padrão. Instala Strands e o SDK do AgentCore.

```sh
docker run --rm -p 127.0.0.1:8080:8080 ghcr.io/fernando-moretes/triage-lab

curl -sS http://127.0.0.1:8080/invocations \
  -H 'Content-Type: application/json' -d '{"case_id":"A5"}'
```

:::caution[Sem autenticação]
Publique só em `127.0.0.1`, como no exemplo. Não exponha esta porta à internet.
:::

## Tags

`latest` e a versão, como `0.1.0`. Em produção de verdade, fixe a versão ou o digest.
