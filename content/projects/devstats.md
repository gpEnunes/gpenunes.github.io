---
title: DevStats
url: https://devstats.enunes.net
accent: "#6366f1"
favicon: /devstats-favicon.svg
order: 1
type: Developer Dashboard
typePt: Dashboard de Developer
tags:
  - Laravel 13
  - Nuxt 4
  - TypeScript
  - Redis
  - WebSocket
  - MySQL
  - PHP 8.3
  - Docker
  - GitHub Actions
  - Vercel
  - Railway
description: "Personal dashboard that aggregates GitHub, Linear and Toggl activity on a single screen. Eliminates daily standup overhead by automatically generating a draft with open PRs, in-progress issues and logged hours — all in real time via WebSocket."
descriptionPt: "Dashboard pessoal que agrega actividade de GitHub, Linear e Toggl num único ecrã. Elimina o overhead do standup diário gerando automaticamente um rascunho com PRs abertos, issues em progresso e horas registadas — tudo em tempo real via WebSocket."
highlights:
  - "Event-driven with Redis queues for async ingestion from all three providers"
  - "WebSocket (Laravel Reverb) for real-time updates without polling"
  - "OAuth 2.0 with GitHub, Linear and Toggl — complete authorisation flow"
  - "Automatic standup: generates a daily draft with active cycle context"
  - "Multi-stage Docker build (Alpine) running php-fpm, nginx and workers via supervisord"
  - "GitHub Actions CI/CD: production deploys only fire after lint, tests and Docker build pass"
highlightsPt:
  - "Event-driven com Redis queues para ingestão assíncrona dos três providers"
  - "WebSocket (Laravel Reverb) para actualizações em tempo real sem polling"
  - "OAuth 2.0 com GitHub, Linear e Toggl — fluxo completo de autorização"
  - "Standup automático: gera rascunho diário com contexto de ciclo activo"
  - "Build Docker multi-stage (Alpine) com php-fpm, nginx e workers via supervisord"
  - "GitHub Actions CI/CD: deploys em produção só disparam após lint, testes e build Docker passarem"
---
