# Segurança / Security

**Relate vulnerabilidades em privado:** use [Report a vulnerability](https://github.com/fernando-moretes/aws-builder-workshops/security/advisories/new) ou escreva para fernando@moretes.com. Não abra issue pública.

**Report vulnerabilities privately** using the link above or by email. Do not open a public issue.

## Escopo / Scope

- CLI e servidor MCP: não devem ler arquivos fora da lista fixa, gravar fora do destino pedido, chamar a rede ou alterar nada. Quebrar qualquer um desses limites é uma vulnerabilidade.
- `labs/triage-agent`: ferramentas só de leitura. O servidor não tem autenticação e deve ficar em localhost, por projeto.
- Fazer um modelo responder errado no modo Bedrock é um resultado de avaliação, bem-vindo como issue pública, não uma vulnerabilidade.

Versões cobertas: a mais recente. / Covered versions: the latest.
