# English Workspace API

API para gerenciamento de estudos de inglês usando NestJS, TypeORM e PostgreSQL.

## Tecnologias

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Zod (validação de variáveis de ambiente)
- Swagger (documentação da API)

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
# Ambiente
NODE_ENV=development
PORT=8080

# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=english_workspace
DB_SYNC=false
DB_LOGGING=true

# Aplicação
API_PREFIX=api
```

### Banco de Dados

Certifique-se de ter o PostgreSQL instalado e rodando. Crie um banco de dados com o nome configurado em `DB_DATABASE`.

## Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Documentação da API

A documentação da API está disponível em `http://localhost:8080/api/docs` quando a aplicação estiver rodando.

## Estrutura do Projeto

```
src/
├── cards/             # Módulo de cards
├── config/            # Configurações da aplicação
├── decks/             # Módulo de decks
├── app.controller.ts  # Controlador principal
├── app.module.ts      # Módulo principal
└── main.ts            # Ponto de entrada da aplicação
```

## Entidades

### Deck

- id: string (UUID)
- name: string
- cards: Card[]
- createdAt: Date
- updatedAt: Date
- deletedAt: Date (soft delete)

### Card

- id: string (UUID)
- front: string
- back: string
- deckId: string
- deck: Deck
- createdAt: Date
- updatedAt: Date
- deletedAt: Date (soft delete)
