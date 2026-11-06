# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Versões: [SemVer](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado
- Workflows de qualidade do PR, segurança e CodeQL.

### Alterado
- Imagem Docker do kit no Node 26, e CI também testa essa versão. Relatos de teste passam a usar o modelo de reprodução.

## [0.2.1] - 2026-11-06

### Adicionado
- Missões e páginas novas em inglês. `missao --lang en` e `get_mission` com `lang` entregam o guia em inglês.
- Vídeo de introdução, um vídeo por missão e um episódio de áudio, com legendas e transcrição. Em português, diálogo entre Fernando e Lia; em inglês, só a voz do Fernando.

### Corrigido
- Favicon que faltava em todas as páginas do site.
- O release agora anexa também o pacote com nome fixo, usado na página de instalação.

## [0.2.0] - 2026-11-06

### Adicionado
- Três missões para iniciantes, testadas em conta real: conta sem susto, portfólio no ar e Lambda quebrada.
- Menu interativo no site e na CLI, progresso por missão, perguntas frequentes e exemplos com respostas reais de IA.
- Comandos `menu`, `missoes`, `missao` e `custos`, e ferramentas MCP `list_missions`, `get_mission` e `compare_costs`.
- Roteiro de dois encontros de 1h30.

### Mudado
- As missões viraram a entrada principal. O lab de triagem e os workshops longos passaram para Avançado.

### Removido
- Vídeos e áudio anteriores, com personagens em voz sintética.

## [0.1.1] - 2026-11-06

### Corrigido
- Imagens Docker agora saem para `linux/amd64` e `linux/arm64`. Antes, falhavam em Mac com chip Apple.

## [0.1.0] - 2026-11-06

### Adicionado
- Trilha "Primeiro experimento": dúvida real, experimento pequeno, evidência e artigo, com exemplo completo.
- CLI e servidor MCP `moretes-builder-workshops`, sem dependências de runtime e sem rede.
- Motor do lab em JavaScript, com teste de paridade contra o `core.py`.
- Skill `builder-workshops` no formato Agent Skills e `init` para Kiro, Claude Code, Cursor, VS Code e Codex.
- Imagens Docker do kit e do servidor do lab.
- Console do lab no navegador, site de documentação bilíngue, Space e dataset no Hugging Face.
- Dois vídeos e um episódio de áudio, em pt e en, com legendas e transcrição.
- Pipelines de CI, Pages, release e sincronização com o Hugging Face.

### Sem mudança
- Os comandos Python em `labs/triage-agent` continuam iguais. A issue #1 segue valendo.
