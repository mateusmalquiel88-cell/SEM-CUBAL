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

## Estrutura do repositório

- package.json - scripts e dependências
- src/ - código-fonte (atualmente contém função exemplo add)
- test/ - testes Jest
- docker-compose.yml - presente, atualmente vazio (pendente de configuração)

## Backlog técnico (itens criados automaticamente)

- adicionar-eslint-prettier: Adicionar ESLint e Prettier e scripts de lint.
- adicionar-ci-github-actions: Adicionar GitHub Actions para rodar testes e lint em PRs.
- adicionar-express-server: Adicionar servidor Express com endpoint /health e testes.
- adicionar-tests-e2e: Criar testes de integração/e2e usando supertest.
- configurar-docker: Preencher docker-compose.yml e adicionar Dockerfile.
- reduzir-dev-deps: Auditar e reduzir devDependencies.

(Os IDs e descrições dos itens do backlog estão registrados na tabela de tarefas da sessão.)

## Como contribuir / próximos passos sugeridos

1. Escolher um item do backlog e marcar como em progresso na tabela de tarefas da sessão.
2. Implementar a mudança em uma branch separada e abrir um PR.
3. Adicionar lint e CI para garantir qualidade automática.

## Observações

- Atualmente há uma suíte de testes muito simples (1 teste) que passa. É recomendável adicionar cobertura de testes antes de implementar features de produção.
- Se quiser, posso criar PRs com essas mudanças, adicionar ESLint/Prettier, configurar CI e/ou implementar o servidor Express básico.

