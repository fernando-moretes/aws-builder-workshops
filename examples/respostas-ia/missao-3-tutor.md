# Missão 3: tutoria sobre o erro

Resposta real, sem edição de conteúdo. Modelo: Claude Sonnet 5.5, em 06/11/2026, sem ferramentas nem busca na web. Outra IA, ou a mesma em outro dia, pode responder diferente.

## Prompt

```text
Você é meu tutor. Estou aprendendo a ler erros e NÃO quero a correção pronta.

Este é meu código:
import json


def lambda_handler(event, context):
    nome = event["nome"]
    return {"statusCode": 200, "body": json.dumps({"mensagem": f"Oi, {nome}!"})}

Este é o erro:
KeyError: 'nome'

1. Me diga em qual linha olhar e o que essa linha espera receber.
2. Me faça uma pergunta que me ajude a achar a causa sozinho.
3. Só depois que eu responder, compare a minha resposta com a sua.
```

## Resposta

## 1. Onde olhar

Olhe para esta linha:

```python
nome = event["nome"]
```

Ela espera receber um `event` que seja um dicionário (em Lambda, é o JSON que chega para a função). Esse dicionário precisa ter uma chave chamada exatamente `"nome"`. A linha tenta pegar o valor dessa chave e guardá-lo na variável `nome`.

O `KeyError: 'nome'` diz que o Python procurou a chave `'nome'` dentro do `event` e não encontrou.

## 2. Sua pergunta

**Qual é o conteúdo exato do `event` que chegou na função quando o erro aconteceu, e como você descobriria isso?**

Pense em como você chamou a função (teste no console, API, outro serviço) e no que foi enviado. Compare com a chave que a linha acima procura.

Responda com suas palavras, mesmo que seja só uma hipótese. Depois eu comparo com a minha leitura do erro.
