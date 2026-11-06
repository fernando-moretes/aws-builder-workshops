# Como contribuir / Contributing

**PT:** a contribuição mais útil agora é testar a primeira execução e dizer onde travou: [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1). Não precisa de conta AWS.

**EN:** the most useful contribution right now is testing the first run and telling us where you got stuck: [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1). No AWS account needed.

## Desenvolvimento / Development

```sh
npm install
npm test          # CLI, motor, MCP, paridade com Python
npm run check     # sincronia da skill, links, regras de texto
npm run docs:dev  # site em localhost
```

| Mudou / Changed | Rode / Run |
|---|---|
| `labs/triage-agent/core.py` | `npm run golden`, e mantenha `src/core.mjs` igual |
| `skills/` ou `src/init.mjs` | `npm run sync` |
| Diagramas / Diagrams | `node scripts/build-diagrams.mjs` |

## Regras / Rules

- Dados fictícios. Nunca credenciais, dados de contas, dados pessoais ou de clientes, nem conteúdo sob NDA.
- Diga o que foi e o que não foi executado na AWS.
- Sem travessão no texto visível. Documentação em pt e en.
- Toda ferramenta do kit continua só de leitura.

Ao participar, siga o [Código de Conduta](CODE_OF_CONDUCT.md).
