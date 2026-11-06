# Registro de evidências

Saídas reais de `builder-workshops queue`, sem edição.

## Teste 1: 20 consumidores

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

## Teste 2: 30 consumidores

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

## Teste 3: um único consumidor a mais

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

## Teste 4: o provedor aceita só 80/s

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

## Ambiente

- Node.js v24.15.0, moretes-builder-workshops 0.1.0, testes de 06/11/2026.
- Sem serviço na nuvem e sem modelo de IA.

## O que mudou na minha cabeça

- "Dar conta" do que chega não é o mesmo que ter folga para drenar.
- O gargalo pode estar fora dos consumidores.

## O que este teste não prova

Usa taxas constantes e ignora lotes, retries, falhas e limites do broker. Não diz quantos consumidores usar em produção. Diz só que vale olhar a folga e a dependência antes de escalar.
