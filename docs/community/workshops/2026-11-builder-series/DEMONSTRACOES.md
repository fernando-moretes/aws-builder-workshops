# Demonstrações e reprodução

## Verificado em 3 de novembro de 2026

Cinco chamadas locais do Moretes Architect MCP terminaram com código 0. As entradas e saídas estão em [examples](examples). Foram usados Node.js 22.22.3 e o CLI local que se identifica como versão 0.4.1. O checkout de origem estava em 18287392d007c2a74acb25d32f075a08088efb1c.

O laboratório de recuperação passou nos 22 testes de seu checkout local (package.json 0.4.0; git describe v0.3.0-1-g4370e58). O teste documentado de queda e recuperação usa subprocessos reais. Esse resultado é da implementação local, não de AgentCore, de AWS remota nem de perda física de energia.

## Exercícios MCP offline

Obter o projeto de https://github.com/fernando-moretes/moretes-aws-architect-mcp e seguir o build documentado no README. Para reproduzir o mesmo código, usar o commit acima em um checkout separado; não redefinir um checkout que contenha trabalho local.

Na raiz do MCP, definir a pasta deste material:

```sh
WORKSHOP_DIR=/caminho/para/docs/community/workshops/2026-11-builder-series
node dist/cli.js call requirements_check --input "$WORKSHOP_DIR/examples/inputs/requirements.json" --format json
node dist/cli.js call service_compare --input "$WORKSHOP_DIR/examples/inputs/compute-options.json" --format json
node dist/cli.js call queue_sizing --input "$WORKSHOP_DIR/examples/inputs/queue-20.json" --format json
node dist/cli.js call queue_sizing --input "$WORKSHOP_DIR/examples/inputs/queue-30.json" --format json
node dist/cli.js call decision_record --input "$WORKSHOP_DIR/examples/inputs/decision.json" --format markdown
```

Essas cinco ferramentas são locais e determinísticas. Não chamam modelos nem consultam uma conta AWS. Uma ferramenta diferente, como busca de documentação ao vivo, tem outro comportamento e depende de rede.

Resultados a observar:

- requirements_check explicita perguntas ainda necessárias.
- service_compare apresenta alternativas condicionadas ao contexto, sem vencedor universal.
- queue-20 retorna utilização de 100%, stable false e drenagem null.
- queue-30 retorna utilização de 66,7%, stable true e drenagem idealizada de 120 segundos.
- decision_record mantém o status proposto e as consequências informadas.

O modelo de fila usa hipóteses M/M/c e ignora limites de broker, lotes, retries e falhas. O cálculo de drenagem é uma aproximação com taxas constantes. O número de consumidores sugerido não é uma configuração de produção.

## Módulo opcional de recuperação

Usar https://github.com/fernando-moretes/lab-security-remediation e seu DURABILITY.md. O exercício guarda dados sintéticos em SQLite local. Ele pode enriquecer a discussão de resultados incertos, mas não substitui o laboratório Bedrock/AgentCore.

No repositório do lab:

```sh
node bin/cli.mjs durable init ./workshop-exercise.sqlite
node bin/cli.mjs durable plan ./workshop-exercise.sqlite > workshop-proposal.json
node bin/cli.mjs durable run ./workshop-exercise.sqlite workshop-proposal.json --approve --crash after-target
```

O último comando termina deliberadamente com código 86. Executar depois, individualmente:

```sh
node bin/cli.mjs durable inspect ./workshop-exercise.sqlite
node bin/cli.mjs durable recover ./workshop-exercise.sqlite synthetic-finding-001
node bin/cli.mjs durable run ./workshop-exercise.sqlite workshop-proposal.json --approve
```

A recuperação deve encontrar o recibo e preservar a versão 2; a repetição não deve criar um segundo efeito. A aprovação é simulada, não IAM autenticado. O alvo e o recibo são atômicos no mesmo SQLite; uma API AWS remota geralmente não participa dessa transação.

## Preparação Bedrock e AgentCore

**Estado atual: aplicação específica implementada em [labs/triage-agent](../../../../labs/triage-agent/README.md).** Foram aprovados 24 testes, incluindo o ciclo real do SDK Strands com respostas Bedrock simuladas, limite de quatro chamadas e recusa de componente fora do escopo. Os cinco casos também responderam pelo servidor HTTP local no modo offline e foram executados com Bedrock real em ensaio separado. A [avaliação](../../../../labs/triage-agent/EVALUATION.md) documenta limitações semânticas e resultados. O runtime gerenciado AgentCore ainda não foi implantado.

Usar as fontes oficiais atuais, separando o template/CLI escolhido de exemplos antigos:

- [Runtime com AgentCore CLI](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-get-started-cli.html)
- [Strands Python quickstart](https://strandsagents.com/docs/user-guide/sdk/quickstart/python/)
- [Observabilidade AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html)

### Passos de implementação e ensaio

1. Fixar versões do SDK, CLI, Python e modelo no projeto-base. Registrar o tutorial e a data consultada. Confirmar região e acesso ao modelo.
2. Implementar as duas ferramentas de consulta do caderno com dados sintéticos e esquema restrito; nenhuma ferramenta de mutação.
3. Configurar instrução do agente para citar evidências, reconhecer informação ausente e encaminhar ações fora do escopo.
4. Executar os cinco casos A1–A5 localmente com modelo e registrar saídas. Asserções de contrato e permissões devem ser determinísticas; qualidade da explicação exige avaliação.
5. Preparar implantação isolada com autenticação e permissões mínimas. Verificar os recursos que o template cria; não supor que somente um runtime será provisionado.
6. Configurar telemetria, executar os mesmos casos e relacionar entrada, chamadas de ferramenta e saída ao identificador da execução.
7. Registrar consumo e custo observado; conferir o que permanece após desligar a aplicação. Ensaiar a limpeza e verificar recursos residuais.
8. Ensaiar o roteiro completo de 120 minutos. Registrar duração medida e pontos de dificuldade; ajustar antes de abrir inscrição hands-on.

Antes de qualquer operação na conta de Fernando, o operador deve executar STS com AWS_PROFILE=fernando-moretes e AWS_REGION=us-east-1 e confirmar a conta autorizada nas instruções do repositório. Não operar em contas de clientes. Para publicação deste kit, não é necessário criar recursos.

### Registro de avaliação a preencher após o ensaio

| Caso | Modelo e versão | Resultado observado | Fontes citadas corretamente | Ferramenta respeitou contrato | Latência/consumo | Correção |
|---|---|---|---|---|---|---|
| A1 | | | | | | |
| A2 | | | | | | |
| A3 | | | | | | |
| A4 | | | | | | |
| A5 | | | | | | |

Até o ensaio estar concluído, a proposta pode ser discutida com o organizador como encontro em preparação. Não dizer que o agente foi implantado ou que seus resultados foram validados.
