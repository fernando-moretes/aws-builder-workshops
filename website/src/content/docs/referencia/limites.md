---
title: Limites conhecidos
description: O que foi testado e o que não foi, para você saber em que confiar antes de usar.
---

Preferimos dizer aqui a deixar você descobrir no meio de um workshop.

## Verificado

- **Missões:** comandos, saídas e limpeza executados em uma conta real em 06/11/2026, pela AWS CLI, sem nenhum recurso restante.
- **Respostas de IA:** um teste por prompt, com links e citações conferidos.

- Testes da CLI, do motor e do servidor MCP, este último com o cliente oficial.
- Paridade entre `core.mjs` e `core.py`, por saída.
- Testes Python do lab, inclusive o ciclo do SDK Strands com Bedrock simulado.
- Cinco casos com Bedrock real, uma amostra por caso.
- Duas imagens Docker construídas e executadas.

## Ainda não verificado

- **Missões na CloudShell e no console:** os comandos rodaram pela AWS CLI, não dentro da CloudShell, e os cliques no console seguem a documentação.
- **Missões com iniciantes:** nenhuma turma testou ainda. Tempos e dificuldade são estimativas.
- **Valores do nível gratuito:** mudam e dependem do plano da conta.

- **Runtime gerenciado do AgentCore:** não foi implantado nem ensaiado.
- **Dentro do Kiro, Cursor e VS Code:** o formato segue a documentação oficial, sem teste no aplicativo.
- **Reprodução por outras pessoas:** o [modelo de relato](https://github.com/fernando-moretes/aws-builder-workshops/issues/new?template=reproducao.yml) está aberto para isso.
- **Workshops com turma real:** os tempos são estimativas, não medições.

## Limites do conteúdo

- A simulação é determinística: não mostra como um modelo se comporta.
- Passar no caso A4 não prova resistência a prompt injection.
- A conta de fila usa taxas constantes. Não é benchmark nem configuração de produção.
- `check_citations` confere citações, não a veracidade da resposta.
- O limite de 4 chamadas do modo Bedrock não é um teto financeiro global.

## Uso

Não use dados de clientes ou de produção. Dados, incidentes e métricas são todos fictícios. Conteúdo independente, sem programação confirmada em eventos e sem relação oficial com a AWS.
