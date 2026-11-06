# Kit completo em uma imagem: CLI e servidor MCP. Sem rede em runtime e sem root.
FROM node:26-alpine
WORKDIR /app
COPY package.json LICENSE CHANGELOG.md ./
COPY bin ./bin
COPY src ./src
COPY skills ./skills
COPY templates ./templates
COPY missoes ./missoes
COPY docs/community/workshops/2026-11-builder-series/*.md ./docs/community/workshops/2026-11-builder-series/
COPY labs/triage-agent/EVALUATION.md ./labs/triage-agent/EVALUATION.md
USER node
ENTRYPOINT ["node", "/app/bin/cli.mjs"]
CMD ["--help"]
