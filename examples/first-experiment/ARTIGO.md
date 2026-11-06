# Dobrei os consumidores e o backlog não mudou: faça esta conta antes de escalar

## Por que olhei para isso

Em todo atraso de fila, a primeira sugestão que eu ouvia era aumentar os consumidores. Eu não sabia prever quando isso resolveria, então fiz a conta para três cenários, com dados fictícios e sem conta na nuvem.

## O que testei

Uma fila recebendo 100 mensagens por segundo. Cada mensagem leva 200 ms, então um consumidor processa 5 por segundo. Já há 6.000 mensagens acumuladas. Para repetir:

```sh
npx -y moretes-builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000
```

## O que aconteceu

| Cenário | Capacidade | Utilização | Folga | Drenagem |
|---|---|---|---|---|
| 20 consumidores | 100/s | 100% | 0/s | nunca |
| 21 consumidores | 105/s | 95,2% | 5/s | 1.200 s |
| 30 consumidores | 150/s | 66,7% | 50/s | 120 s |
| 30, provedor limitado a 80/s | 80/s | 125% | -20/s | nunca |

Errei duas vezes. Achava que 20 consumidores deixavam a fila saudável: eles dão conta do que chega, mas não sobra nada para o que já estava parado. E achava que 30 sempre resolveriam: se o provedor aceita só 80 por segundo, o backlog cresce 20 mensagens por segundo, com qualquer número de consumidores.

O que mais me surpreendeu foi o terceiro teste. De 21 para 30 consumidores são 43% a mais, e a drenagem fica 10 vezes mais rápida, porque o tempo depende da folga.

## O que isso não prova

São taxas constantes. A conta ignora lotes, retries, falhas e limites do broker, então não diz quantos consumidores usar em produção. Em um sistema real, eu mediria antes de decidir.

## Quando eu faria diferente

Se a folga é pequena e a dependência aguenta, eu aumentaria os consumidores. Se a dependência é o limite, eu não aumentaria: mais pressão sobre um provedor saturado tende a piorar. Nesse caso, olharia para limite de concorrência e para o que dizer ao cliente enquanto a fila drena.

---

Escrito por mim. Fonte dos números: o registro de evidências deste experimento.
