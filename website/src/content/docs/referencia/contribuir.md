---
title: Como contribuir
description: Testar a primeira execução, relatar o que confundiu e propor cenários são as contribuições mais úteis.
---

## A mais útil agora: testar a primeira execução

Você não precisa de conta AWS. Siga a [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1) e diga onde travou. Uma instrução confusa ou uma falha reproduzível vale mais que um elogio.

## Outras formas

- **Novo caso adverso:** descreva a condição, o comportamento esperado e a falha comum.
- **Correção de fonte:** um link quebrado ou uma afirmação desatualizada.
- **Tradução:** português e inglês hoje. Outros idiomas são bem-vindos.
- **Relato de workshop:** o que funcionou e o que atrasou, com permissão de quem participou.

## Mudando código

```sh
git clone https://github.com/fernando-moretes/aws-builder-workshops.git
cd aws-builder-workshops
npm install
npm test
npm run check
```

- Mudou `labs/triage-agent/core.py`? Rode `npm run golden` e mantenha o `core.mjs` igual.
- Mudou a skill? Rode `npm run sync`.
- Diga o que foi e o que não foi executado na AWS.

## O que nunca enviar

Credenciais, informações de contas, dados pessoais, dados de clientes ou conteúdo sob acordo de confidencialidade.
