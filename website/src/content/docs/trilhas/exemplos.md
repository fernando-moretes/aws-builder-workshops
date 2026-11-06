---
title: Exemplos com respostas reais
description: Os prompts das missões rodados em uma IA de verdade, com a conferência feita depois, e como cada um vira uma proposta de artigo.
---

Rodamos os prompts das missões em uma IA de verdade (Claude Sonnet 5.5, em 06/11/2026, sem busca na web) e conferimos depois. **Uma resposta por prompt: não é benchmark.** Outra IA, ou a mesma em outro dia, pode responder diferente.

A lição foi outra do que esperávamos: a IA foi bem. Conferir continua sendo o que transforma a resposta em evidência.

## Missão 1: o relatório de custos

[Resposta completa](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-1-custos.md)

| O que conferimos | Resultado |
|---|---|
| Totais: 0,92 e 25,63 USD | Corretos, batem com o comando `custos` |
| Maior aumento: NAT Gateway, +16,20 | Identificado corretamente |
| Terminou com perguntas, sem a conclusão pronta | Sim, como o prompt pediu |
| Afirmações além do arquivo | "Lambda e Amplify provavelmente ficaram na camada gratuita": é palpite, e ela disse "provavelmente" |

**Vira esta proposta**

- **Tema:** o que mais pesa em uma conta pequena da AWS não foi o que eu imaginava.
- **Público:** quem acabou de criar a conta.
- **Problema:** achar que o custo está sempre no servidor.
- **Objetivo:** ler um relatório e achar o maior aumento em 1 hora.
- **Evidências:** a hipótese, a resposta da IA, a saída de `custos` e o alerta criado.

## Missão 2: as opções para publicar um site

[Resposta completa](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-2-site.md)

| O que conferimos | Resultado |
|---|---|
| Alertou que o site no S3 exige Block Public Access desligado | Sim, e a documentação confirma |
| Disse que o site no S3 só tem HTTP | Sim, e a documentação confirma |
| 7 links citados | Todos abriram. Ela avisou que não os tinha aberto |
| Recomendação | S3 com CloudFront, citando o Amplify como alternativa mais simples |

Repare que a IA e a missão escolheram caminhos diferentes, e os dois são defensáveis. O CloudFront dá mais controle. O Amplify tem menos peças para quem está começando. **Comparar e decidir é trabalho seu**, e essa decisão é um ótimo parágrafo para o artigo.

**Vira esta proposta**

- **Tema:** publiquei meu portfólio sem deixar um bucket público.
- **Público:** quem nunca publicou nada na nuvem.
- **Problema:** escolher entre opções sem saber o que cada uma abre.
- **Objetivo:** comparar duas opções e publicar uma em 1 hora.
- **Evidências:** a comparação, as fontes abertas, o site com HTTPS e a limpeza.

## Missão 3: a tutoria sobre o erro

[Resposta completa](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-3-tutor.md)

| O que conferimos | Resultado |
|---|---|
| Apontou a linha certa | Sim |
| Segurou a correção, como pedido | Sim: fez uma pergunta e esperou |

## Missão 3: o StatusCode 200

[Resposta completa](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-3-statuscode.md)

| O que conferimos | Resultado |
|---|---|
| Disse que 200 não garante que a função rodou sem erro | Correto, e bateu com o nosso teste real |
| Citação de `FunctionError` | Confere com a [API Invoke](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html) |
| 202 para `Event` e 204 para `DryRun` | Conferem com a mesma página |

**Vira esta proposta**

- **Tema:** minha Lambda respondeu 200 e estava quebrada.
- **Público:** quem está aprendendo a ler logs.
- **Problema:** confiar só no código de status.
- **Objetivo:** achar um erro pelo log, sem pedir a resposta pronta.
- **Evidências:** a hipótese, a saída real, o log e a documentação.

## Um exemplo completo

Quer ver do começo ao fim, com hipóteses que caíram e o artigo pronto? Veja o [exemplo da fila](/aws-builder-workshops/trilhas/exemplo-completo/).
