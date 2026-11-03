# AWS Builder Workshops — Fernando Azevedo

Materiais abertos para aprender arquitetura AWS e engenharia de agentes com evidências, decisões revisáveis e dados sintéticos.

## Três temas

1. **Da ideia ao agente que trabalha:** Bedrock e AgentCore na prática.
2. **Arquitetura sob pressão:** sistemas que enfrentam pico, lentidão e mensagens duplicadas.
3. **Do briefing à arquitetura que você consegue defender:** requisitos, fontes, alternativas e ADR com IA e MCP.

Comece pelo [kit do facilitador e participantes](docs/community/workshops/2026-11-builder-series/README.md) ou pelo [laboratório de triagem](labs/triage-agent/README.md). O [PDF de apresentação](docs/community/workshops/2026-11-builder-series/assets/propostas-workshops-aws-fernando-azevedo.pdf) reúne os temas e as condições de organização.

## Experimente sem AWS

Requer Python 3.10+; testes completos validados em 3.12.

```sh
git clone https://github.com/fernando-moretes/aws-builder-workshops.git
cd aws-builder-workshops/labs/triage-agent
python3 cli.py --case A1
python3 cli.py --case A2
python3 -m unittest discover -s tests -p test_core.py -v
```

O modo padrão é simulação local, sem credenciais nem consumo AWS. Para instalar os SDKs e executar os 24 testes completos, siga o README do laboratório. A inferência real é opt-in e pode gerar cobrança.

## Evidências e limites

[Cinco casos com Bedrock real e avaliação](labs/triage-agent/EVALUATION.md) mostram resultados e falhas de interpretação/citação. Testes de código aprovados não significam qualidade do modelo aprovada. O AgentCore Runtime gerenciado ainda precisa de ensaio; a aplicação possui um servidor local compatível com seu protocolo.

Não há ferramentas de mutação de infraestrutura. Não use dados de clientes ou produção. O caso de pagamentos, as métricas e os incidentes são fictícios.

## Contribua

Relatos de reprodução, correções de fontes, novos cenários e melhorias por issue ou pull request são bem-vindos. Informe versão do Python, passos, resultado esperado e observado. Não envie credenciais, informações de contas ou dados pessoais. Mudanças no laboratório devem manter os testes e explicar o que foi ou não executado na AWS.

Conteúdo independente de Fernando Azevedo; não é treinamento oficial nem programação confirmada da AWS. [Site](https://fernando.moretes.com) · [Estudos](https://fernando.moretes.com/studies) · [Podcast](https://fernando.moretes.com/podcast).

Licença MIT. Marcas de terceiros pertencem aos respectivos titulares.
