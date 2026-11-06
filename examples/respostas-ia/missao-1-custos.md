# Missão 1: leitura do relatório de custos

Resposta real, sem edição de conteúdo. Modelo: Claude Sonnet 5.5, em 06/11/2026, sem ferramentas nem busca na web. Outra IA, ou a mesma em outro dia, pode responder diferente.

## Prompt

```text
Você é meu tutor de AWS. Estou aprendendo e nunca usei a AWS no trabalho.
Abaixo está um relatório de custos de dois meses, com dados fictícios.

1. Diga o total de cada mês e a diferença.
2. Liste os serviços que mais mudaram, com os valores.
3. Explique cada um com uma comparação simples.
4. Termine com 3 perguntas para eu investigar. Não me dê a conclusão pronta.

servico,setembro_usd,outubro_usd
AWS Lambda,0.00,0.00
Amazon S3,0.12,0.14
Amazon CloudWatch,0.30,0.32
AWS Amplify,0.00,0.00
Amazon EC2 - Compute,0.00,8.47
Amazon VPC (NAT Gateway),0.00,16.20
Amazon Route 53,0.50,0.50
Tax,0.00,0.00
```

## Resposta

# Análise de custos: setembro vs. outubro

## 1. Totais e diferença

| Mês | Total |
|---|---|
| Setembro | **US$ 0,92** |
| Outubro | **US$ 25,63** |
| Diferença | **+US$ 24,71** (cerca de 28 vezes maior) |

## 2. Serviços que mais mudaram

| Serviço | Setembro | Outubro | Variação |
|---|---|---|---|
| Amazon VPC (NAT Gateway) | 0,00 | 16,20 | **+16,20** |
| Amazon EC2 - Compute | 0,00 | 8,47 | **+8,47** |
| Amazon CloudWatch | 0,30 | 0,32 | +0,02 |
| Amazon S3 | 0,12 | 0,14 | +0,02 |

Esses dois primeiros serviços respondem por **US$ 24,67 dos US$ 24,71** de aumento (99,8%). Os demais (Lambda, Amplify, Route 53 e Tax) não mudaram.

## 3. Explicação com comparações simples

- **NAT Gateway (+16,20):** é como a portaria de um condomínio que deixa os moradores (seus recursos em rede privada) saírem para a rua (internet) sem expor o endereço deles. Você paga uma taxa por hora de portaria aberta, mais um valor por volume que passa por ela. Não importa se passou pouca gente: a portaria aberta custa.
- **EC2 Compute (+8,47):** é um computador alugado na nuvem, cobrado como aluguel de carro por hora. Em setembro você não tinha nenhum. Em outubro passou a ter pelo menos um, e o relógio corre enquanto ele estiver ligado, mesmo sem uso.
- **CloudWatch e S3 (+0,02 cada):** são o caderno de anotações (logs e métricas) e o armário de arquivos. Cresceram quase nada, é o desgaste normal de quem guarda mais coisas.
- **Lambda, Amplify, Route 53, Tax (sem mudança):** Lambda e Amplify provavelmente ficaram dentro da camada gratuita ou sem uso. O Route 53 é uma taxa fixa mensal pelo domínio/zona DNS, como uma assinatura. Ficou igual, como esperado.

## 4. Perguntas para você investigar

1. Quem ou o que criou a instância EC2 em outubro, e ela ainda precisa estar ligada? Veja no console do EC2 a data de lançamento e as tags.
2. Por que existe um NAT Gateway na sua VPC, e quais recursos dependem dele para acessar a internet? Veja também se ele foi criado junto com a EC2 ou por outro motivo.
3. Os valores de outubro refletem o mês inteiro ou só parte dele? Compare as datas de criação dos recursos com o Cost Explorer em visão diária e pense no que isso significaria para o custo de novembro.

Se quiser, me diga o que encontrar e a gente discute juntos.
