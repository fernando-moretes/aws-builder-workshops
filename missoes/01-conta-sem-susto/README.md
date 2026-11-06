# Missão 1: conta sem susto

**A dúvida:** "Se eu criar uma conta na AWS, vou levar um susto na fatura?"

| | |
|---|---|
| **Tempo** | Cerca de 1 hora |
| **Custo** | Zero. Budgets comuns são gratuitos |
| **Sem conta AWS?** | Faz os passos 1 a 3 inteiros |
| **Você leva** | Um alerta de gastos e o hábito de conferir o que a IA diz |

## 1. Escreva sua hipótese

Antes de abrir qualquer ferramenta, abra um arquivo e anote: **o que você acha que gera mais custo em uma conta pequena?** Pode errar. É o erro que vira um bom artigo.

## 2. Peça ajuda à IA para ler uma conta

Baixe o arquivo [custos-exemplo.csv](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/01-conta-sem-susto/custos-exemplo.csv), com dados fictícios. Em seguida, cole no seu assistente de IA:

```text
Você é meu tutor de AWS. Estou aprendendo e nunca usei a AWS no trabalho.
Abaixo está um relatório de custos de dois meses, com dados fictícios.

1. Diga o total de cada mês e a diferença.
2. Liste os serviços que mais mudaram, com os valores.
3. Explique cada um com uma comparação simples.
4. Termine com 3 perguntas para eu investigar. Não me dê a conclusão pronta.

[cole aqui o conteúdo do CSV]
```

## 3. Pegue a IA errando

Confira a conta sem usar a IA:

```sh
npx -y moretes-builder-workshops custos custos-exemplo.csv
```

```text
Total: 0.92 USD -> 25.63 USD (+24.71 USD)

Maiores mudanças
  Amazon VPC (NAT Gateway)  0.00 -> 16.20  (+16.20)
  Amazon EC2 - Compute      0.00 -> 8.47  (+8.47)
  Amazon S3                 0.12 -> 0.14  (+0.02)
  Amazon CloudWatch         0.30 -> 0.32  (+0.02)
```

Agora compare e anote:

- Os totais da IA batem?
- Ela percebeu que o maior aumento é o NAT Gateway, e não o servidor EC2?
- Ela afirmou algum preço ou uma causa que não estava no arquivo? Se afirmou, peça a fonte e abra o link.

A IA pode acertar tudo. Conferir continua valendo, porque é assim que você sabe que acertou. [Veja uma resposta real](https://fernando-moretes.github.io/aws-builder-workshops/trilhas/exemplos/).

## 4. Crie seu alerta na AWS

Pule se ainda não tem conta. Na [CloudShell](https://console.aws.amazon.com/cloudshell/), o terminal que já vem pronto no navegador, baixe os dois arquivos da missão e troque o e-mail em `alertas.exemplo.json`:

```sh
curl -sO https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/01-conta-sem-susto/orcamento.json
curl -sO https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/01-conta-sem-susto/alertas.exemplo.json
sed -i 's/SEU-EMAIL@exemplo.com/voce@exemplo.com/' alertas.exemplo.json

CONTA=$(aws sts get-caller-identity --query Account --output text)
aws budgets create-budget --account-id "$CONTA" \
  --budget file://orcamento.json \
  --notifications-with-subscribers file://alertas.exemplo.json
```

Confira se ficou certo:

```sh
aws budgets describe-notifications-for-budget --account-id "$CONTA" \
  --budget-name conta-sem-susto \
  --query 'Notifications[].[NotificationType,Threshold]' --output text
```

```text
ACTUAL      80.0
FORECASTED  100.0
```

Isso avisa quando o gasto real passa de 80% de US$ 5 e quando a previsão passa de US$ 5.

Prefere clicar? No [console de Budgets](https://console.aws.amazon.com/cost-management/home#/budgets), use **Create budget** e o modelo **Zero spend budget**.

> **O alerta avisa, mas não bloqueia.** Ele não desliga nada sozinho. Se chegar um e-mail, é com você.

## Limpeza

Recomendo manter este alerta: ele é gratuito e protege a conta. Para apagar:

```sh
aws budgets delete-budget --account-id "$CONTA" --budget-name conta-sem-susto
```

## Agora vire isso em conteúdo

| Campo | Exemplo do que anotar |
|---|---|
| **Tema** | Como evitar susto na conta da AWS |
| **Público** | Quem acabou de criar a conta |
| **Problema** | Não saber o que gera custo |
| **Objetivo** | Criar um alerta e ler um relatório em 1 hora |
| **Evidências** | Sua hipótese, a resposta da IA, a saída de `custos` e o que não bateu |

Continue em [Do teste ao artigo](https://fernando-moretes.github.io/aws-builder-workshops/trilhas/primeiro-experimento/).

## O que foi testado

Em 06/11/2026, os comandos das etapas 4 e de limpeza rodaram em uma conta real, com a AWS CLI. O teste usou um limite alto, para não disparar e-mails, e apagou o orçamento em seguida. A criação pelo console não foi testada.

Fontes, consultadas em 06/11/2026: [preço do AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/), [modelos de orçamento](https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html) e [CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html).
