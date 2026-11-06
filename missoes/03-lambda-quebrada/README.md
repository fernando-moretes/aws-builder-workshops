# Missão 3: Lambda quebrada

**A dúvida:** "O que esse erro quer dizer, e como eu descubro sozinho?"

Você vai quebrar uma função de propósito, ler o erro e usar a IA para aprender a investigar, e não só para receber a resposta pronta.

| | |
|---|---|
| **Tempo** | Cerca de 1 hora |
| **Custo** | Normalmente zero: o nível gratuito do Lambda inclui 1 milhão de requisições por mês |
| **Sem conta AWS?** | Faz os passos 1 a 3 no seu computador, só com Python |
| **Você leva** | Um jeito de ler logs que serve em qualquer sistema |

## 1. Escreva sua hipótese

Olhe a função, em [lambda_function.py](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/03-lambda-quebrada/lambda_function.py):

```python
def lambda_handler(event, context):
    nome = event["nome"]
    return {"statusCode": 200, "body": json.dumps({"mensagem": f"Oi, {nome}!"})}
```

Anote: **o que acontece se ela receber um evento vazio, `{}`?** E qual código de status você espera ver?

## 2. Quebre no seu computador

Baixe os arquivos `lambda_function.py` e [rodar_local.py](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/03-lambda-quebrada/rodar_local.py) e rode:

```sh
python3 rodar_local.py '{}'
```

```text
KeyError: 'nome'
```

Agora com um evento certo:

```sh
python3 rodar_local.py '{"nome": "Ana"}'
```

## 3. Use a IA como tutora, não como oráculo

```text
Você é meu tutor. Estou aprendendo a ler erros e NÃO quero a correção pronta.

Este é meu código: [cole a função]
Este é o erro: [cole o erro]

1. Me diga em qual linha olhar e o que essa linha espera receber.
2. Me faça uma pergunta que me ajude a achar a causa sozinho.
3. Só depois que eu responder, compare a minha resposta com a sua.
```

Quando entender a causa, corrija você mesmo. Por exemplo: o que a função deveria fazer quando `nome` não vem?

## 4. Quebre na AWS

Pule se ainda não tem conta. Na [CloudShell](https://console.aws.amazon.com/cloudshell/), região `us-east-1`:

```sh
B=https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/03-lambda-quebrada
curl -sO $B/lambda_function.py
curl -sO $B/politica-confianca.json
zip f.zip lambda_function.py

CONTA=$(aws sts get-caller-identity --query Account --output text)
aws iam create-role --role-name missao3-role \
  --assume-role-policy-document file://politica-confianca.json
aws iam attach-role-policy --role-name missao3-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
sleep 15

aws lambda create-function --function-name missao3 --runtime python3.13 \
  --handler lambda_function.lambda_handler \
  --role arn:aws:iam::$CONTA:role/missao3-role --zip-file fileb://f.zip
aws lambda wait function-active-v2 --function-name missao3
```

Chame a função com um evento vazio:

```sh
aws lambda invoke --function-name missao3 --cli-binary-format raw-in-base64-out \
  --payload '{}' resposta.json
cat resposta.json
```

Esta foi a resposta real no nosso teste:

```json
{ "StatusCode": 200, "FunctionError": "Unhandled" }
```

```json
{"errorMessage": "'nome'", "errorType": "KeyError"}
```

**Olhe o detalhe: o status é 200, e mesmo assim a função falhou.** O 200 diz que a chamada ao serviço Lambda funcionou. O erro da sua função está em `FunctionError`. Quem olha só o status acha que deu tudo certo.

## 5. Leia o log, e pegue a IA errando

Espere uns 15 segundos e leia os logs:

```sh
aws logs tail /aws/lambda/missao3 --since 10m --format short
```

```text
[ERROR] KeyError: 'nome'
  File "/var/task/lambda_function.py", line 5, in lambda_handler
    nome = event["nome"]
REPORT ... Duration: 52.74 ms  Memory Size: 128 MB  Max Memory Used: 32 MB
```

Pergunte à sua IA, **sem mostrar esta página**:

```text
Chamei uma função Lambda pela AWS CLI e o StatusCode voltou 200.
Isso quer dizer que a minha função rodou sem erro? Cite a documentação.
```

Ela percebeu a diferença? O link que ela citou confirma? Abra e anote. A [documentação da API Invoke](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html) diz, com todas as letras: "The status code in the API response doesn't reflect function errors".

## Limpeza

Rode tudo e confira que nada sobrou:

```sh
aws lambda delete-function --function-name missao3
aws iam detach-role-policy --role-name missao3-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name missao3-role
aws logs delete-log-group --log-group-name /aws/lambda/missao3
aws lambda list-functions --query "Functions[?FunctionName=='missao3'].FunctionName"
```

A última linha precisa mostrar `[]`.

## Agora vire isso em conteúdo

| Campo | Exemplo do que anotar |
|---|---|
| **Tema** | Minha Lambda respondeu 200 e estava quebrada |
| **Público** | Quem está aprendendo a ler logs |
| **Problema** | Confiar só no código de status |
| **Objetivo** | Encontrar um erro pelo log, sem pedir a resposta pronta |
| **Evidências** | Sua hipótese, a saída real, o log e o que a IA acertou ou errou |

Continue em [Do teste ao artigo](https://fernando-moretes.github.io/aws-builder-workshops/trilhas/primeiro-experimento/).

## O que foi testado

Em 06/11/2026, a função, as saídas acima e a limpeza rodaram em uma conta real com a AWS CLI, em `us-east-1` e Python 3.13. Os nomes usados no teste foram diferentes, com prefixo próprio, e nada sobrou na conta. Os comandos não foram executados dentro da CloudShell.

Fontes, consultadas em 06/11/2026: [API Invoke](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html), [preço do Lambda](https://aws.amazon.com/lambda/pricing/) e [CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html).
