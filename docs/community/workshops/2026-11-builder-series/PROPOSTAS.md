# Propostas para Builder Loft e AWS User Group São Paulo

- **Proponente:** Fernando Azevedo
- **Identificação:** Arquiteto de soluções | AWS Community Builder em AI Engineering
- **Contato profissional:** fernando@moretes.com
- **Site:** https://fernando.moretes.com
- **Idioma:** português, com resumo em inglês disponível.
**Modalidade:** São Paulo presencial ou online; 120 minutos. Palestra alternativa: 40 minutos + 10 de perguntas.

## 1. Da ideia ao agente que trabalha: Amazon Bedrock e AgentCore na prática

**Chamada:** Construa um assistente técnico com ferramentas, evidências e limites claros.

### Resumo para submissão

Um alerta dispara, as informações estão espalhadas e o time precisa decidir por onde começar. Neste workshop, vamos construir a primeira versão de um agente que ajuda na triagem de incidentes de uma aplicação fictícia de pagamentos. O agente consulta um runbook e o estado simulado de componentes, apresenta as evidências encontradas e recomenda próximos passos. A sessão conecta a implementação às decisões de arquitetura: quando usar um modelo, quando usar uma regra, quais ferramentas expor e como avaliar a qualidade da resposta. Com um projeto-base preparado, os participantes modificam uma ferramenta, executam cenários e analisam o comportamento. O fechamento mostra a execução no AgentCore e os cuidados necessários para evoluir o protótipo.

### Público e pré-requisitos

Desenvolvedores, arquitetos e profissionais de cloud com conhecimentos básicos de APIs e Python.

Notebook e familiaridade básica com Python e APIs. A preparação do ambiente será informada antes do evento; quem não tiver acesso poderá acompanhar a demonstração. A parte ao vivo depende de ensaio e validação de acesso, custo e limpeza.

### Objetivos e atividade

- Construir um contrato claro para ferramentas de consulta.
- Relacionar respostas a evidências e explicitar informações ausentes.
- Testar falhas de ferramenta e identificar quando escalar para uma pessoa.
- Explicar o papel do Bedrock, do framework e do AgentCore na solução.

**Atividade:** Assistente de triagem para um sistema fictício de pagamentos, dados sintéticos, ferramentas de consulta e decisão humana sobre qualquer mudança.

### Agenda de 120 minutos

- 10 min - Desafio e critérios de sucesso
- 15 min - Arquitetura, ferramentas e limites
- 35 min - Exercício em duplas a partir do projeto-base
- 25 min - Demonstração guiada no AgentCore e rastreamento
- 20 min - Teste com ferramenta indisponível e contexto insuficiente
- 15 min - Revisão e perguntas

### Versão de palestra de 40 + 10 minutos

5 min de problema; 10 min de arquitetura; 15 min de demonstração preparada; 10 min de avaliação e próximos passos; 10 min de perguntas.

### Materiais

- Projeto-base local implementado; inferência real e deploy a ensaiar antes da sessão prática
- Diagrama e roteiro do laboratório
- Casos de avaliação e checklist de evolução

### English abstract

An alert fires, context is scattered, and the team needs to decide where to start. This hands-on workshop develops a first version of an incident-triage assistant for a fictional payments application. The assistant consults a runbook and synthetic component status, cites the evidence it found, and recommends next steps. Participants work from a prepared starter and discuss tool permissions, missing information, evaluation, and operating the agent with Amazon Bedrock AgentCore. The workshop separates a useful prototype from the validation needed before production use.

## 2. Arquitetura sob pressão: sua aplicação está pronta para o dia de pico?

**Chamada:** Lições da arquitetura bancária para produtos que precisam crescer na AWS.

### Resumo para submissão

A aplicação funciona bem até a demanda aumentar, uma dependência ficar lenta e uma operação reaparecer na fila. O que deve mudar primeiro? Nesta oficina, os participantes assumem o papel de arquitetos de uma plataforma fictícia de pagamentos e tomam decisões em rodadas. Partimos de uma solução simples, introduzimos novas restrições e discutimos como evoluir sem uma reescrita completa. A experiência de Fernando com arquitetura bancária orienta a discussão, enquanto os exemplos e dados são construídos para ensino. Cada equipe justifica suas escolhas de processamento, persistência, comunicação e recuperação, considerando os pilares do AWS Well-Architected.

### Público e pré-requisitos

Desenvolvedores que desejam avançar em arquitetura, arquitetos, tech leads e profissionais de plataforma.

Notebook opcional para a oficina; papel ou ferramenta de desenho são suficientes. As demonstrações locais usam Node.js 22.13+ e uma versão fixada do MCP.

### Objetivos e atividade

- Separar requisitos de negócio de escolhas de serviço
- Discutir consistência, idempotência, isolamento e pressão sobre dependências
- Definir objetivos de disponibilidade, recuperação e desempenho
- Planejar evolução incremental e testes que validem hipóteses

**Atividade:** Cartas de cenário: pico de demanda, dependência lenta, evento duplicado e orçamento reduzido. Cada grupo atualiza seu desenho e registra uma decisão.

### Agenda de 120 minutos

- 15 min - Contexto e requisitos
- 20 min - Desenho da primeira versão
- 30 min - Rodadas de falha e crescimento
- 25 min - Revisão Well-Architected e plano de evolução
- 15 min - Defesa das decisões pelas equipes
- 15 min - Síntese e perguntas

### Versão de palestra de 40 + 10 minutos

5 min de contexto; 10 min da primeira arquitetura; 15 min de desafios e decisões com o público; 10 min de evolução e testes; 10 min de perguntas.

### Materiais

- Diagrama inicial e evoluído
- Modelo de ADR preenchido
- Mapa de riscos, hipóteses e plano de testes

### English abstract

A system works until demand spikes, a dependency slows down, and the same operation arrives twice. Participants become the architects of a fictional payments platform and evolve their design through changing constraints. The session draws on banking architecture experience while using exclusively synthetic examples. Teams justify compute, messaging, data and recovery choices, record an architectural decision, and plan evidence to validate their assumptions using the AWS Well-Architected pillars.

## 3. Seu próximo projeto com IA: do briefing à arquitetura AWS que você consegue defender

**Chamada:** Bedrock e MCP no trabalho diário de quem precisa decidir, documentar e entregar.

### Resumo para submissão

Você recebe um pedido para criar uma solução de IA, mas o problema de negócio ainda não está claro. Como avançar até uma proposta técnica que outro profissional consiga revisar? Vamos percorrer esse trabalho usando IA para organizar requisitos, consultar fontes e comparar alternativas. A cada etapa, os participantes identificam suposições, verificam recomendações e registram o raciocínio. O MCP público de Fernando aparece como ferramenta didática em um fluxo que pode ser reproduzido e criticado. Ao final, o resultado é um pequeno pacote de arquitetura: contexto, opções, decisão, riscos e plano de validação.

### Público e pré-requisitos

Arquitetos de soluções, tech leads, consultores e desenvolvedores que participam de decisões técnicas.

Notebook opcional para a oficina; papel ou ferramenta de desenho são suficientes. As demonstrações locais usam Node.js 22.13+ e uma versão fixada do MCP.

### Objetivos e atividade

- Transformar um briefing em requisitos verificáveis
- Usar documentação como evidência
- Comparar alternativas com restrições explícitas
- Registrar decisões e premissas para revisão humana

**Atividade:** Duas propostas para o mesmo briefing. Os grupos revisam requisitos ausentes, justificativas frágeis, custos não demonstrados e recomendações sem fonte.

### Agenda de 120 minutos

- 15 min - Briefing e perguntas de descoberta
- 20 min - Pesquisa e verificação com documentação e MCP
- 30 min - Comparação de duas arquiteturas
- 25 min - Diagrama, ADR e riscos
- 15 min - Revisão cruzada em duplas
- 15 min - Plano de validação e perguntas

### Versão de palestra de 40 + 10 minutos

5 min de briefing; 10 min de descoberta; 15 min de comparação com MCP e documentação; 10 min de ADR e validação; 10 min de perguntas.

### Materiais

- Roteiro reutilizável de descoberta
- Templates de ADR, revisão e registro de hipóteses
- Exemplo completo acompanhado de fontes

### English abstract

A request to add AI is not yet an architecture. This interactive workshop follows the architect's daily work: clarify the business need, identify requirements, consult documentation, compare alternatives, and record a reviewable decision. Participants use Fernando's open-source architecture MCP as a teaching aid and critique two competing designs. The output is a compact architecture packet with context, alternatives, a proposed decision, risks and a validation plan.


## Mini-bio curta

Fernando Azevedo é arquiteto de soluções e AWS Community Builder em AI Engineering. Compartilha artigos, estudos, podcast e projetos open source sobre arquitetura AWS e agentes de IA.

## Mini-bio completa

Fernando Azevedo é arquiteto de soluções e AWS Community Builder em AI Engineering. Compartilha conhecimento em português e inglês por meio de artigos, estudos de arquitetura, podcast e projetos open source. Suas propostas conectam experiência em arquitetura bancária, engenharia de agentes e decisões práticas para construir e evoluir soluções na AWS.

## Evidências públicas

- https://fernando.moretes.com
- https://fernando.moretes.com/studies
- https://fernando.moretes.com/podcast
- https://fernando.moretes.com/mcp
- https://github.com/fernando-moretes/moretes-aws-architect-mcp
- https://github.com/fernando-moretes/lab-security-remediation

## Logística para o Builder Loft

Proposta comunitária gratuita, com 30–40 participantes como estimativa sujeita à capacidade. Preferência por dias úteis das 19h às 21h ou fim de semana em horário a combinar. Horário comercial pode ser negociado. Datas principal e alternativa ainda não foram reservadas.

Solicitações ao espaço: projetor/tela, conectividade, tomadas e disposição que permita trabalho em duplas. Para uma turma de 40 pessoas, sugerir um apoio técnico, sujeito à disponibilidade do organizador. Não há patrocínio, brindes, catering ou acesso a contas AWS confirmados.

A gratuidade do encontro não implica gratuidade do consumo de serviços AWS. Antes de oferecer a prática em nuvem, combinar quem fornece as contas, limites de uso e procedimento de limpeza. A oficina de arquitetura e os exemplos offline do MCP não exigem conta AWS.

## Campos e pendências de formulário

- Builder Loft: escolher um tema e preencher duas datas acordadas. Revisar o rascunho antigo antes de enviar.
- Sessionize: usar título, resumo, nível intermediário, modalidade acordada e mini-bio acima. Há também campos pessoais de pronome, grupo sub-representado, telefone e foto; usar somente dados confirmados por Fernando.
- As datas planejadas do CFP não são uma reserva no Loft.
- O consentimento para a conta Sessionize não substitui verificar as condições de uma submissão específica.
