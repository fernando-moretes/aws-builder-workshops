---
title: Exemplo completo
description: Um experimento real do começo ao fim, com a dúvida, os comandos, as saídas, as hipóteses que caíram e o artigo final.
---

Um experimento feito seguindo a trilha, com saídas reais e sem edição. Os dados são fictícios e as taxas são constantes: não é benchmark. Os arquivos estão em [`examples/first-experiment`](https://github.com/fernando-moretes/aws-builder-workshops/tree/main/examples/first-experiment).

## 1. A proposta, escrita antes do teste

- **Dúvida real:** quando uma fila acumula mensagens, aumentar consumidores resolve?
- **Público:** quem está no primeiro emprego com sistemas assíncronos e ouve "é só escalar" em todo incidente.
- **Problema:** essa pessoa não sabe prever quando mais consumidores ajudam e quando não mudam nada.
- **Objetivo:** em duas horas, calcular três cenários e explicar a diferença.
- **Hipótese:** com 20 consumidores a fila já está saudável, porque 20 × 5 mensagens/s dá conta das 100 mensagens/s que chegam. Com 30, drena mais rápido, e nada mais muda.
- **Como vou testar:** conta de capacidade local, com dados fictícios: 100 mensagens/s, 200 ms de serviço, 6.000 no backlog.
- **O que conta como evidência:** utilização, folga e tempo de drenagem de cada cenário.
- **Custo previsto:** zero. Roda no terminal, sem conta na nuvem.

## 2. A evidência

Saídas reais de `builder-workshops queue`, sem edição.

### Teste 1: 20 consumidores

Esperava: fila saudável, backlog drenando devagar.

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000
Capacidade efetiva: 100/s
Utilização: 100%
Folga: 0/s
Estável: não
Drenagem do backlog: nunca, com essas taxas

Taxas constantes. Não é benchmark nem configuração de produção.
```

**Observado: minha hipótese caiu.** Dá conta do que chega, mas sobra zero. O backlog de 6.000 nunca diminui.

### Teste 2: 30 consumidores

Esperava: drena.

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 30 --backlog 6000
Capacidade efetiva: 150/s
Utilização: 66.7%
Folga: 50/s
Estável: sim
Drenagem do backlog: 120 s

Taxas constantes. Não é benchmark nem configuração de produção.
```

**Observado:** como esperado. Folga de 50/s, drenagem de 120 s.

### Teste 3: um único consumidor a mais

Pergunta que surgiu depois do teste 1: quanto de folga muda o resultado?

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 21 --backlog 6000
Capacidade efetiva: 105/s
Utilização: 95.2%
Folga: 5/s
Estável: sim
Drenagem do backlog: 1200 s

Taxas constantes. Não é benchmark nem configuração de produção.
```

**Observado:** com 21, a drenagem leva 1.200 s. De 21 para 30 consumidores, 43% a mais, a drenagem fica 10 vezes mais rápida. Eu não esperava isso: o tempo depende da folga, não do total de consumidores.

### Teste 4: o provedor aceita só 80/s

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 30 --backlog 6000 --dependency-limit 80
Capacidade efetiva: 80/s (limitada pela dependência)
Utilização: 125%
Folga: -20/s
Estável: não
Drenagem do backlog: nunca, com essas taxas

Taxas constantes. Não é benchmark nem configuração de produção.
```

**Observado:** a segunda hipótese também caiu. Com esse teto, 30 consumidores não salvam nada, e o backlog cresce 20 mensagens por segundo.

### Ambiente

- Node.js v24.15.0, moretes-builder-workshops 0.1.0, testes de 06/11/2026.
- Sem serviço na nuvem e sem modelo de IA.

### O que mudou na minha cabeça

- "Dar conta" do que chega não é o mesmo que ter folga para drenar.
- O gargalo pode estar fora dos consumidores.

### O que este teste não prova

Usa taxas constantes e ignora lotes, retries, falhas e limites do broker. Não diz quantos consumidores usar em produção. Diz só que vale olhar a folga e a dependência antes de escalar.

## 3. O artigo

:::note[Dobrei os consumidores e o backlog não mudou: faça esta conta antes de escalar]
O texto abaixo é o artigo final.
:::

### Por que olhei para isso

Em todo atraso de fila, a primeira sugestão que eu ouvia era aumentar os consumidores. Eu não sabia prever quando isso resolveria, então fiz a conta para três cenários, com dados fictícios e sem conta na nuvem.

### O que testei

Uma fila recebendo 100 mensagens por segundo. Cada mensagem leva 200 ms, então um consumidor processa 5 por segundo. Já há 6.000 mensagens acumuladas. Para repetir:

```sh
npx -y moretes-builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000
```

### O que aconteceu

| Cenário | Capacidade | Utilização | Folga | Drenagem |
|---|---|---|---|---|
| 20 consumidores | 100/s | 100% | 0/s | nunca |
| 21 consumidores | 105/s | 95,2% | 5/s | 1.200 s |
| 30 consumidores | 150/s | 66,7% | 50/s | 120 s |
| 30, provedor limitado a 80/s | 80/s | 125% | -20/s | nunca |

Errei duas vezes. Achava que 20 consumidores deixavam a fila saudável: eles dão conta do que chega, mas não sobra nada para o que já estava parado. E achava que 30 sempre resolveriam: se o provedor aceita só 80 por segundo, o backlog cresce 20 mensagens por segundo, com qualquer número de consumidores.

O que mais me surpreendeu foi o terceiro teste. De 21 para 30 consumidores são 43% a mais, e a drenagem fica 10 vezes mais rápida, porque o tempo depende da folga.

### O que isso não prova

São taxas constantes. A conta ignora lotes, retries, falhas e limites do broker, então não diz quantos consumidores usar em produção. Em um sistema real, eu mediria antes de decidir.

### Quando eu faria diferente

Se a folga é pequena e a dependência aguenta, eu aumentaria os consumidores. Se a dependência é o limite, eu não aumentaria: mais pressão sobre um provedor saturado tende a piorar. Nesse caso, olharia para limite de concorrência e para o que dizer ao cliente enquanto a fila drena.

---

Escrito por mim. Fonte dos números: o registro de evidências deste experimento.

