---
title: Perguntas frequentes
description: Custo, conta AWS, uso de IA, autoria e o que fazer quando algo dá errado.
---

## Sobre começar

### Nunca usei a AWS. Consigo fazer?

Consegue: as missões foram feitas para isso, e os passos 1 a 3 de cada uma funcionam sem conta. Crie a conta só quando quiser ir além.

### Por qual missão eu começo?

Use o [menu interativo](/aws-builder-workshops/comece/escolha/). Se ainda estiver na dúvida, comece pela [Conta sem susto](/aws-builder-workshops/missoes/1-conta-sem-susto/): o alerta de gastos é útil antes de qualquer outra coisa.

### Preciso saber programar?

Nas missões 1 e 2, não: é só copiar comandos e editar um texto. A missão 3 usa uma função de 3 linhas em Python, e entender o erro é o objetivo.

### Qual IA eu uso?

A que você já tem. Os prompts funcionam em qualquer assistente. No Kiro e em outros IDEs, dá para [conectar o kit](/aws-builder-workshops/agentes/kiro/) para a IA guiar você.

## Sobre custo

### Vou gastar dinheiro?

Os passos sem conta são de graça. Na conta, Budgets comuns não têm custo, a CloudShell não tem custo adicional, e o Lambda e o Amplify têm nível gratuito para esse tamanho de teste. Confira na sua conta, porque os valores e os planos mudam. Cada missão traz as fontes, com a data da consulta.

### O alerta de gastos bloqueia a cobrança?

Não. Ele avisa, mas não desliga nada. Se chegar um e-mail, olhe a conta na hora.

### Esqueci de apagar. E agora?

Rode os comandos da seção **Limpeza** da missão. Eles podem ser executados a qualquer momento. Depois olhe o console de Billing para conferir.

### Fui cobrado sem querer. O que eu faço?

Apague o recurso primeiro e abra um caso no [AWS Support](https://console.aws.amazon.com/support/), explicando o que aconteceu. Não dá para garantir o resultado, mas é o caminho oficial.

## Sobre IA e autoria

### Por que a IA não escreve o artigo?

Porque o valor está no que você testou e viu, e um modelo não fez esse teste. Além disso, você responde pelo texto: precisa saber explicar cada afirmação.

### Então posso usar IA em quê?

Para tirar dúvidas, entender erros, comparar opções e revisar clareza e organização. Se ajudou, diga em quê no artigo.

### E se a IA acertar tudo?

Ótimo, e conferir continua valendo. Nos [exemplos reais](/aws-builder-workshops/trilhas/exemplos/), a IA acertou bastante. Você só sabe disso porque conferiu.

### Os preços que a IA diz estão certos?

Podem estar desatualizados. Peça a fonte, abra o link e confira a data. Trate número sem fonte como hipótese.

## Sobre segurança

### Posso colar dados da minha conta na IA?

Não cole chaves, senhas, IDs de conta, dados pessoais ou de clientes. Use dados fictícios, como os das missões, ou remova o que for sensível.

### A IA pediu minha chave de acesso. O que eu faço?

Não entregue. Nenhuma missão precisa disso: você roda os comandos na sua própria sessão da CloudShell.

### Devo usar o usuário root?

Evite no dia a dia. Crie um usuário próprio e ative MFA seguindo a [documentação do IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## Quando algo dá errado

### Um comando deu erro. E agora?

É parte da missão. Cole o erro na IA com o prompt de tutoria da missão 3, leia e anote no registro de evidências.

### Aparece "AccessDenied".

A identidade que você está usando não tem essa permissão. Confira com `aws sts get-caller-identity` e peça à IA para explicar qual permissão falta, sem ampliar acessos às cegas.

### Meu site no Amplify deu "Access Denied".

Quase sempre, você compactou a pasta em vez do conteúdo dela. Gere o `.zip` com o `index.html` na raiz.

### Encontrei um erro neste material.

[Abra um relato](https://github.com/fernando-moretes/aws-builder-workshops/issues/new?template=reproducao.yml). É a contribuição mais útil neste momento.
