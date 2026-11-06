# Missão 2: portfólio no ar

**A dúvida:** "Como eu coloco um site na internet pela AWS sem deixar nada aberto por engano?"

| | |
|---|---|
| **Tempo** | Cerca de 1 hora |
| **Custo** | Normalmente zero nesse tamanho, dentro do nível gratuito. Confira na sua conta |
| **Sem conta AWS?** | Faz os passos 1 a 3 e testa o site no seu computador |
| **Você leva** | Um site com HTTPS e uma regra para desconfiar de atalhos da IA |

## 1. Escreva sua hipótese

Anote: **qual é o jeito mais simples e seguro de publicar um site estático na AWS?** Escreva o que você acha antes de perguntar.

## 2. Compare a IA com a documentação

Cole no seu assistente de IA:

```text
Você é meu tutor de AWS. Quero publicar um site de uma página, sem servidor.

1. Me dê duas opções na AWS, com vantagens e riscos.
2. Alguma delas exige deixar algo público? O que exatamente?
3. Qual tem HTTPS sem configuração extra?
4. Cite o link da documentação oficial que sustenta cada resposta.
```

Agora **abra os links** e procure o seguinte:

- A opção com site no S3 aparece? A [documentação do S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) diz que esse caminho exige desligar o Block Public Access, recomenda mantê-lo ligado e informa que o site só tem HTTP. A IA avisou sobre isso?
- Os links que ela citou existem e dizem o que ela afirmou?
- Ela mencionou o Amplify? Se não, pergunte. Compare o número de peças de cada opção.

Anote o que bateu e o que não bateu. Mesmo quando a IA acerta, ter conferido é a sua evidência. [Veja uma resposta real](https://fernando-moretes.github.io/aws-builder-workshops/trilhas/exemplos/).

## 3. Personalize e teste no seu computador

Baixe o [index.html](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/02-portfolio-no-ar/site/index.html), troque o texto pelo seu e abra no computador:

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000. Peça à IA para revisar a clareza do texto, sem escrever por você. Não coloque telefone, endereço nem dados que você não quer públicos.

## 4. Publique com Amplify

Pule se ainda não tem conta.

1. Coloque o `index.html` em um arquivo `.zip`. **Compacte o arquivo, e não a pasta:** a documentação avisa que zipar a pasta de cima causa erro de "Access Denied".
2. Abra o [console do Amplify](https://console.aws.amazon.com/amplify/) e escolha **Create new app**.
3. Escolha **Deploy without Git** e depois **Next**.
4. Dê um nome ao app, use `main` como branch e escolha **Drag and drop**.
5. Solte o `.zip` e clique em **Save and deploy**.
6. Abra o endereço `https://main.xxxxx.amplifyapp.com`.

No teste abaixo, a publicação levou cerca de 48 segundos, e o site respondeu com HTTPS sem nenhuma configuração extra.

## Limpeza

Se o site era só um teste, apague: no console do Amplify, abra o app e use **App settings**, **General settings**, **Delete app**. Depois, abra o endereço de novo e confirme que saiu do ar.

## Agora vire isso em conteúdo

| Campo | Exemplo do que anotar |
|---|---|
| **Tema** | Publiquei meu portfólio na AWS sem abrir nada por engano |
| **Público** | Quem quer um site e nunca publicou nada na nuvem |
| **Problema** | Tutoriais que mandam deixar tudo público |
| **Objetivo** | Comparar duas opções e publicar uma em 1 hora |
| **Evidências** | O que a IA sugeriu, o que a documentação diz, seu site com HTTPS e a limpeza |

Continue em [Do teste ao artigo](https://fernando-moretes.github.io/aws-builder-workshops/trilhas/primeiro-experimento/).

## O que foi testado

Em 06/11/2026, a publicação rodou em uma conta real com este `index.html`, pela AWS CLI, com o mesmo tipo de envio em `.zip`: resposta 200 em HTTPS, e o app foi apagado em seguida. **Os cliques no console seguem a documentação, sem teste passo a passo.** Os valores do nível gratuito mudam e podem variar conforme o plano da conta.

Fontes, consultadas em 06/11/2026: [implantação manual no Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html), [preço do Amplify](https://aws.amazon.com/amplify/pricing/), [site estático no S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) e [nível gratuito](https://aws.amazon.com/free/).
