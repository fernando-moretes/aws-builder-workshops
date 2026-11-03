# Assistente de triagem com Bedrock e AgentCore

Laboratório educacional de Fernando Azevedo para uma aplicação fictícia de pagamentos. Duas ferramentas consultam somente fixtures: status de componentes e runbook. Não existe ferramenta de alteração de infraestrutura, shell, SQL ou HTTP arbitrário.

**Verificado:** 24 testes, cinco cenários no servidor local e cinco amostras finais com Bedrock real. A avaliação encontrou limitações semânticas; [resultados e próximos critérios](EVALUATION.md). O runtime gerenciado AgentCore não foi implantado.

## Modo local, sem credenciais nem consumo AWS

Requer Python 3.10+ (validado em 3.12). Na pasta deste laboratório:

```sh
python3 cli.py --case A1
python3 cli.py --case A2
python3 cli.py --case A3
python3 cli.py --case A4
python3 cli.py --case A5
python3 -m unittest discover -s tests -p test_core.py -v
```

O modo offline é uma **simulação determinística**, explicitamente identificada na saída. Não é resposta de modelo. Serve para conhecer contratos, discutir evidências e executar a atividade sem conta AWS.

## Servidor compatível com AgentCore, rodando localmente

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
python app.py
```

Em outro terminal:

```sh
curl -sS http://127.0.0.1:8080/invocations -H 'Content-Type: application/json' -d '{"case_id":"A1"}'
```

O servidor escuta localhost. O SDK fornece o protocolo de invocação; isso não significa que o código já esteja implantado na AWS. Para ambiente containerizado gerenciado, o bind precisa ser configurado explicitamente.

## Modo Bedrock

É opt-in, somente us-east-1 e modelo amazon.nova-micro-v1:0. Antes de executar na conta de Fernando, conferir STS, saldo/elegibilidade dos créditos e limite de gasto do ensaio. Usar apenas o perfil e a conta autorizados nas instruções do repositório.

```sh
AWS_PROFILE=fernando-moretes AWS_REGION=us-east-1 aws sts get-caller-identity
AWS_PROFILE=fernando-moretes AWS_REGION=us-east-1 \
TRIAGE_ENABLE_BEDROCK=1 TRIAGE_MODEL_ID=amazon.nova-micro-v1:0 \
python cli.py --mode bedrock --case A1
```

Não executar esse comando como parte do setup offline. O modo cloud pode gerar cobranças e exige acesso ao modelo. Limites locais: prompt de até 1.500 caracteres, até quatro chamadas ao modelo, 768 tokens de saída por chamada e retries desabilitados. Esses limites não são um teto financeiro global nem um controle de autorização da conta.

## Casos e avaliação

- A1: contexto disponível, fontes e hipótese.
- A2: dependência indisponível; valores ausentes não viram zero.
- A3: evidência antiga relativa ao relógio fixo do cenário.
- A4: texto adversarial no runbook; conteúdo não concede novas ferramentas.
- A5: pedido de mudança fora do escopo.

A evidência retornada é auditada por invocação; não há histórico compartilhado entre participantes. `query_status` descreve a consulta; não determina saúde do componente. Toda resposta Bedrock tem `review_required: true`. `quality_warnings` aponta citações ausentes ou não recuperadas, sem garantir a correção das demais afirmações. As saídas precisam de avaliação humana. O teste A4 isolado não prova resistência geral a prompt injection.

O material do facilitador e a rubrica estão em ../../docs/community/workshops/2026-11-builder-series.

## Operação e limites

O servidor não oferece uma aplicação de autenticação própria e deve permanecer em localhost até a implantação gerenciada ser revisada. Não expor a porta diretamente à internet. Não usar dados reais de clientes. O ambiente Bedrock/AgentCore deve ter uma role específica e acesso mínimo, com verificação de custos e limpeza.

Os logs da aplicação registram metadados de resultado, não o conteúdo de prompts e respostas. O SDK e exportadores de telemetria têm sua própria configuração: revisar antes de habilitar captura ou exportação em um deploy.

## Fontes

- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-get-started-cli.html
- https://github.com/aws/bedrock-agentcore-sdk-python
- https://strandsagents.com/docs/user-guide/sdk/quickstart/python/
