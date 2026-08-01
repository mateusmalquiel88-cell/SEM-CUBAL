# agents-continuar-projeto

Esqueleto inicial e backlog para o projeto "agents-continuar-projeto".

Este repositório contém um scaffold Node.js mínimo com testes em Jest. O objetivo desta etapa é organizar trabalho, adicionar qualidade e evoluir o projeto conforme prioridades.

## Rápido começo

Pré-requisitos:
- Node.js 18+ (ou compatível)
- npm

Instalar dependências:

  npm install

Executar testes:

  npm test

Executar (exemplo):

  npm start

Rodar em Docker:

  docker-compose up --build

Abra `http://localhost:3000` após o container subir.

## Estrutura do repositório

- package.json - scripts e dependências
- src/ - código-fonte (contém função exemplo add, servidor Express e camada SQLite)
- src/db.js - inicialização da base de dados SQLite, seed de exemplos e queries do dashboard
- public/ - dashboard estático em HTML/CSS/JS
- test/ - testes Jest e integração usando supertest
- docker-compose.yml - configurado para build e expor a aplicação Node.js
- Dockerfile - imagem Node.js para execução em container

## Backlog técnico (itens criados automaticamente)

- adicionar-eslint-prettier: Adicionar ESLint e Prettier e scripts de lint.
- adicionar-ci-github-actions: Adicionar GitHub Actions para rodar testes e lint em PRs.
- adicionar-express-server: Adicionar servidor Express com endpoint /health e testes.
- adicionar-tests-e2e: Criar testes de integração/e2e usando supertest.
- configurar-docker: Preencher docker-compose.yml e adicionar Dockerfile.
- reduzir-dev-deps: Auditar e reduzir devDependencies.

(Os IDs e descrições dos itens do backlog estão registrados na tabela de tarefas da sessão.)

## Dashboard e base de dados

O projeto agora inclui uma base de dados SQLite com tabelas reais para users, projects e tasks, juntamente com um dashboard em HTML/CSS/JS.

Endpoints disponíveis:
- GET /dashboard — página do dashboard
- GET /api/dashboard — resumo com métricas e estado das tarefas
- GET /api/tasks — lista das tarefas existentes

Exemplo de execução local:

  npm start

Depois abra:
- http://localhost:3000/dashboard
- http://localhost:3000/api/dashboard

## Como contribuir / próximos passos sugeridos

1. Escolher um item do backlog e marcar como em progresso na tabela de tarefas da sessão.
2. Implementar a mudança em uma branch separada e abrir um PR.
3. Adicionar lint e CI para garantir qualidade automática.

## Observações

- Atualmente há uma suíte de testes muito simples (1 teste) que passa. É recomendável adicionar cobertura de testes antes de implementar features de produção.
- Se quiser, posso criar PRs com essas mudanças, adicionar ESLint/Prettier, configurar CI e/ou implementar o servidor Express básico.

