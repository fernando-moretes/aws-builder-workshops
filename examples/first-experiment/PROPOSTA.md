# Proposta do experimento

- **Dúvida real:** quando uma fila acumula mensagens, aumentar consumidores resolve?
- **Público:** quem está no primeiro emprego com sistemas assíncronos e ouve "é só escalar" em todo incidente.
- **Problema:** essa pessoa não sabe prever quando mais consumidores ajudam e quando não mudam nada.
- **Objetivo:** em duas horas, calcular três cenários e explicar a diferença.
- **Hipótese:** com 20 consumidores a fila já está saudável, porque 20 × 5 mensagens/s dá conta das 100 mensagens/s que chegam. Com 30, drena mais rápido, e nada mais muda.
- **Como vou testar:** conta de capacidade local, com dados fictícios: 100 mensagens/s, 200 ms de serviço, 6.000 no backlog.
- **O que conta como evidência:** utilização, folga e tempo de drenagem de cada cenário.
- **Custo previsto:** zero. Roda no terminal, sem conta na nuvem.
