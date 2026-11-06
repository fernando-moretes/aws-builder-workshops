# Missão 3: o StatusCode 200

Resposta real, sem edição de conteúdo. Modelo: Claude Sonnet 5.5, em 06/11/2026, sem ferramentas nem busca na web. Outra IA, ou a mesma em outro dia, pode responder diferente.

## Prompt

```text
Chamei uma função Lambda pela AWS CLI e o StatusCode voltou 200.
Isso quer dizer que a minha função rodou sem erro? Cite a documentação.
```

## Resposta

**Não necessariamente.** Um `StatusCode` 200 só diz que a requisição de invocação foi aceita e executada pelo serviço Lambda. Não diz que o código da sua função terminou sem erro.

Não consegui consultar a documentação ao vivo, porque a ferramenta de busca de docs não foi autorizada nesta sessão. As citações abaixo vêm do meu conhecimento da documentação oficial, então confirme nos links.

## O que a documentação diz

**Referência da API `Invoke`** (https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html):

- Em invocação síncrona (`RequestResponse`, o padrão da CLI), o serviço responde HTTP 200 quando consegue executar a função.
- O cabeçalho de resposta `X-Amz-Function-Error` indica erro dentro da função. Segundo a doc, se ele estiver presente, "indicates that an error occurred during function execution", e os detalhes vão no payload da resposta.
- A doc também afirma que o status code da resposta da API não reflete erros da função. Os códigos de erro HTTP ficam reservados para falhas que impedem a execução, como permissão, quota ou configuração.

**Comando `aws lambda invoke` da CLI** (https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html): a saída traz `StatusCode`, `FunctionError`, `ExecutedVersion` e `LogResult`. O `FunctionError` aparece com o valor `Handled` ou `Unhandled` quando a função falhou.

## Como verificar se a função rodou bem

1. **Veja o campo `FunctionError` na saída da CLI.** Se ele existir, houve erro, mesmo com `StatusCode: 200`.
2. **Leia o arquivo de saída** (`out.json` no exemplo abaixo). Em caso de erro, ele contém `errorMessage` e `errorType`, ou a stack trace.
3. **Peça os logs** na própria chamada:
   ```bash
   aws lambda invoke --function-name MINHA_FUNC \
     --log-type Tail --query 'LogResult' --output text out.json | base64 -d
   ```

## Outros casos em que o 200 engana

- **Erros não tratados:** exceções, timeout e estouro de memória retornam 200 com `FunctionError: Unhandled`.
- **Retorno de erro pelo seu código:** se o handler devolve algo como `{"statusCode": 500}`, isso é só dado no payload. O status da invocação continua 200 e não há `FunctionError`.
- **`--invocation-type Event`:** a resposta é 202, que só significa "enfileirado". A função ainda nem rodou. Com `DryRun`, a resposta é 204.

Se você colar a saída do comando e o conteúdo do arquivo de saída, eu confirmo se houve erro.
