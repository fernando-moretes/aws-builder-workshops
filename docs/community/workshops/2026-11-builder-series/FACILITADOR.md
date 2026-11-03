# Guia do facilitador

## Preparação comum

Uma semana antes, confirmar tema, formato, capacidade, duração e acessibilidade com o organizador. Enviar os pré-requisitos, informar o que exige conta AWS e oferecer alternativa para acompanhar a demonstração. Testar áudio, zoom do terminal, conexão e cópia offline do material. Conduzir um ensaio cronometrado; não registrar uma estimativa como duração medida.

Abrir cada encontro com três perguntas: “Que decisão você precisa tomar no trabalho?”, “O que você já tentou?” e “O que faria esta sessão valer seu tempo?”. Fazer levantamento informal, sem coletar dados pessoais desnecessários.

Apresentação sugerida: “Sou Fernando Azevedo, arquiteto de soluções e AWS Community Builder em AI Engineering. Hoje vamos trabalhar sobre um cenário fictício e sair com algo que outra pessoa possa revisar: uma decisão, suas evidências e um próximo teste.”

Formar duplas com papéis alternados de construtor e revisor. Dúvidas que exigem investigação entram em uma lista de retorno, com responsável e fonte, sem respostas inventadas.

## Encontro 1 - Da ideia ao agente que trabalha

### 0–10 minutos: problema e critérios

Apresentar o incidente INC-001 do caderno. Pedir que cada dupla separe observação de hipótese. O critério de sucesso é uma recomendação útil com evidências, limites e próximo passo; acertar a causa por palpite não basta.

Pergunta de abertura: “Se o agente disser que o banco está lento, qual dado você exigiria antes de acreditar?”

### 10–25 minutos: responsabilidades

Mostrar o diagrama. Explicar Bedrock como acesso ao modelo, Strands como implementação do comportamento e ferramentas, e AgentCore Runtime como ambiente de execução. A aplicação configura ferramentas, instruções, identidade e telemetria. A existência desses serviços não valida sozinha a solução.

Manter somente consultas no escopo. Ferramenta não aceita shell, SQL arbitrário, endpoint fornecido pelo usuário nem credenciais. Retornar resultado estruturado com horário, origem e erro explícito.

### 25–60 minutos: exercício

Usar o projeto-base após implementação e ensaio. As duplas modificam a descrição de uma ferramenta e verificam quais informações uma resposta precisa citar. Enquanto o agente não estiver validado, usar a análise manual dos fixtures e apresentar a atividade como exercício de desenho, sem dizer que houve inferência.

Pontos de verificação: o identificador de componente é válido; dado ausente é diferente de zero; observação atrasada é sinalizada; recomendação não executa mudança.

### 60–85 minutos: execução e rastreamento

No ambiente ensaiado, mostrar a mesma entrada, as chamadas de ferramenta e a saída. Comparar um caso saudável com um caso de falha. Registrar versão do modelo, configuração, região, latência e consumo reais. Não preencher números antes da execução.

### 85–105 minutos: cenários adversos

Aplicar casos A2–A5 do caderno. Pedir que os grupos identifiquem qual evidência faltou e como o agente deve se comportar. Texto presente no runbook é conteúdo consultado, não autorização para executar instruções fora do contrato.

### 105–120 minutos: revisão

Cada dupla compartilha uma resposta que aceitaria e outra que rejeitaria. Fechar com o que falta para produção: controles de acesso testados, avaliação com dados adequados, operação, custos, limites de integrações e recuperação.

**Contingência:** se o modelo ou o runtime falhar, analisar fixtures e saídas previamente registradas como gravação/resultado de ensaio. Nunca apresentar saída preparada como chamada ao vivo.

## Encontro 2 - Arquitetura sob pressão

### 0–15 minutos: esclarecer o negócio

Distribuir o briefing B. Destacar que “pagamento recebido” e “pagamento concluído” são estados diferentes. Pedir aos grupos que escolham o significado da confirmação para o cliente e registrem o que permanece em aberto.

### 15–35 minutos: primeira versão

Desenhar a arquitetura mais simples que atenda às premissas. É aceitável defender Lambda ou ECS, banco relacional ou outra escolha, desde que requisitos e custos operacionais apareçam na justificativa. Não entregar a resposta antes da discussão.

### 35–65 minutos: cartas

Dar uma carta a cada dez minutos: pico, dependência lenta, evento duplicado. Cada grupo atualiza a arquitetura e registra um risco. Se houver tempo, trocar a terceira carta pela restrição de orçamento.

Usar o exercício de fila: 100 mensagens/s × 0,2 s = 20 unidades de trabalho concorrente. Com 20 posições simultâneas, a utilização teórica é 100%; não há capacidade excedente para drenar backlog enquanto essas taxas se mantêm. Aumentar trabalhadores pode pressionar ainda mais a dependência. O grupo deve propor um limite, uma métrica e um teste.

### 65–90 minutos: revisão

Passar pelos seis pilares do Well-Architected. Para cada observação importante, perguntar: “Qual evidência permitiria considerar isso atendido?”. Um diagrama multi-AZ não comprova recuperação testada.

### 90–105 minutos: defesa

Cada grupo recebe dois minutos para explicar uma decisão e sua condição de revisão. O público faz uma pergunta sobre falha ou custo. Votar apenas no argumento mais claro, não em “arquitetura vencedora universal”.

### 105–120 minutos: síntese

Comparar caminhos de evolução. Mostrar que uma hipótese derrubada por um teste também é resultado útil. Registrar próximos testes de carga, duplicidade, timeout e recuperação.

**Contingência:** toda a atividade funciona em papel. Saídas do MCP são apoio de cálculo e estrutura, não avaliação automática da qualidade da equipe.

## Encontro 3 - Do briefing à decisão

### 0–15 minutos: descoberta

Usar o briefing C. Pedir cinco perguntas antes de citar serviços. Anotar escopo, dono, dados, orçamento, disponibilidade e o significado de sucesso.

### 15–35 minutos: pesquisa

Executar requirements_check localmente e comparar as lacunas com as perguntas da turma. Consultar documentação oficial para duas afirmações técnicas. Registrar URL, data e o que ela suporta.

### 35–65 minutos: comparar alternativas

Distribuir as duas alternativas do caderno. Pedir três vantagens condicionais e três riscos para cada uma. Usar service_compare como ponto de partida e questionar recomendações genéricas. Não tratar fontes listadas na saída offline como documentação recém-consultada.

### 65–90 minutos: produzir um ADR

Preencher contexto, opções, decisão proposta, consequências e gatilhos de revisão. Chamar decision_record com uma decisão escrita pela equipe; a ferramenta formata o raciocínio, não aprova a arquitetura.

### 90–105 minutos: revisão cruzada

Trocar documentos. Marcar uma afirmação sem fonte, um requisito não atendido e um teste ausente. Aplicar a rubrica sem constranger participantes.

### 105–120 minutos: próximos passos

Cada grupo escolhe o teste mais barato capaz de refutar sua principal hipótese. Registrar responsável e evidência esperada. Encerrar com os links públicos e convite para compartilhar uma reprodução ou dúvida técnica concreta.

## Roteiro de apresentação por encontro

Preparar oito telas, com uma ideia principal em cada uma: problema; sucesso; contexto; arquitetura/opções; exercício; falha; revisão; próximos passos. Este é um roteiro de conteúdo, não um arquivo de slides já diagramado.

## Encerramento e continuidade

Mensagem sugerida: “Obrigado por construir junto. O material ficará disponível para revisão e adaptação. Se testar no trabalho ou em um estudo pessoal, conte qual hipótese mudou e qual evidência você encontrou.”

Após o evento, publicar apenas resultados reais e com autorização quando envolver pessoas. Contar participantes únicos e exercícios concluídos separadamente. Responder dúvidas pendentes com fontes, incorporar correções e registrar contribuições ao projeto.
