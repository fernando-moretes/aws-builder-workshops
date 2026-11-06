# Missão 2: opções para publicar um site

Resposta real, sem edição de conteúdo. Modelo: Claude Sonnet 5.5, em 06/11/2026, sem ferramentas nem busca na web. Outra IA, ou a mesma em outro dia, pode responder diferente.

## Prompt

```text
Você é meu tutor de AWS. Quero publicar um site de uma página, sem servidor.

1. Me dê duas opções na AWS, com vantagens e riscos.
2. Alguma delas exige deixar algo público? O que exatamente?
3. Qual tem HTTPS sem configuração extra?
4. Cite o link da documentação oficial que sustenta cada resposta.
```

## Resposta

Não consegui consultar a documentação ao vivo (a ferramenta de consulta não foi autorizada). Respondo com o que sei, e **os links abaixo são das páginas oficiais conhecidas, mas não os abri agora**. Confira cada um antes de seguir.

## 1. Duas opções

**Opção A: S3 com "static website hosting" (sozinho)**
- Vantagens: a mais simples, com um único serviço e quase nenhum custo.
- Riscos: o endpoint do site só funciona em **HTTP**, sem HTTPS. Exige bucket público, e uma política mal escrita expõe mais do que o necessário.

**Opção B: S3 privado + CloudFront (com OAC)**
- Vantagens: HTTPS, cache global, bucket fechado ao público e proteção extra com WAF, se você quiser.
- Riscos: tem mais peças (distribuição, OAC, política do bucket). Alterações demoram a propagar por causa do cache (é preciso invalidar). Os custos são pequenos, mas variam com o tráfego.

(Alternativa fora das duas: **AWS Amplify Hosting**, que dá HTTPS por padrão e é ainda mais simples, mas tem menos controle.)

## 2. Alguma exige algo público?

**Sim, a A.** Para o endpoint de website funcionar, é preciso:
- desativar o "Block Public Access" do bucket (pelo menos para política de bucket);
- adicionar uma bucket policy permitindo `s3:GetObject` para `Principal: "*"` nos objetos do bucket.

Isso torna **todos os objetos** daquele bucket legíveis por qualquer pessoa. Não coloque nada sensível lá.

**A B não exige.** O bucket continua privado. Só o CloudFront acessa, via Origin Access Control, com uma policy que permite o serviço `cloudfront.amazonaws.com` com condição `AWS:SourceArn` da sua distribuição. O que fica público é apenas a URL da distribuição, que é o objetivo.

## 3. Qual tem HTTPS sem configuração extra?

**A B (CloudFront).** O domínio padrão `xxxx.cloudfront.net` já vem com certificado da AWS, então você tem HTTPS sem fazer nada. Só precisará de um certificado (ACM, gratuito) se quiser **domínio próprio**. A A não oferece HTTPS no endpoint do S3.

## 4. Documentação oficial

- Hospedagem de site estático no S3 (endpoint HTTP, requisitos): https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- Tornar o site público (Block Public Access e bucket policy): https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html
- Endpoints de website (só HTTP): https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html
- CloudFront com S3 e OAC (bucket privado): https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
- HTTPS e certificado padrão `*.cloudfront.net`: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html
- Tutorial oficial de site estático seguro com CloudFront: https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html
- Amplify Hosting (alternativa): https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html

**Recomendação:** use a **B**. Custa quase o mesmo, não deixa o bucket público e já entrega HTTPS. Se quiser, posso montar o passo a passo (console ou CLI) para ela.
