# Instruções para agentes

Kit de workshops: CLI e MCP em Node sem dependências de runtime, lab Python e site Astro/Starlight em `website/`.

```sh
npm test && npm run check   # antes de concluir qualquer mudança
npm run docs:build          # se mudou o site
```

- `src/core.mjs` espelha `labs/triage-agent/core.py`. Mudou um, mude o outro e rode `npm run golden`.
- `skills/` é a fonte. As cópias em `.kiro/` e `.agents/` vêm de `npm run sync`. Não edite as cópias.
- `src/core.mjs` e `src/catalog.mjs` não têm imports porque também rodam no navegador.
- Toda ferramenta é só de leitura. Não adicione ferramenta que mude algo.
- Os comandos Python do `README` do lab não podem quebrar: há gente testando pela issue #1.
- Sem travessão em texto visível. Documentação em pt e en. Só dados fictícios.
- Modo Bedrock só com pedido explícito: pode gerar cobrança. Nunca apresente saída da simulação como resposta de modelo.
