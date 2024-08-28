# iHeros - Teste Fullstack

Este é o projeto desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Fullstack na **ZRP**. O objetivo deste projeto é criar um sistema de gerenciamento e distribuição de heróis, onde é possível alocar heróis para combater ameaças globais, gerenciar o cadastro de heróis e visualizar o histórico de ameaças.

## Tecnologias Utilizadas

### Frontend
- **Framework**: React
- **Gerenciamento de Estado**: Zustand
- **Mapas e Geolocalização**: Leaflet / React-Leaflet
- **Estilização**: Tailwind
- **Comunicação em Tempo Real**: Socket.IO
- **Requisições HTTP**: Axios / React Query

### Backend
- **Linguagem**: Golang
- **Router**: Go-Chi
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Token)
- **Containerização**: Docker

## Estrutura do Projeto

### Frontend

O frontend foi construído utilizando React e está organizado da seguinte maneira:

```
frontend/
├── public/
├── src/
│   ├── components/      # Componentes reutilizáveis da interface
│   ├── hooks/           # Organização de efeitos colaterais em um componente
│   ├── lib/             # Configurações de bibliotecas externas, como react query
│   ├── pages/           # Páginas principais do sistema
│   ├── services/        # Serviços para comunicação com a API
│   ├── test-utils/      # Configuração de testes 
│   ├── zustand-states/  # Configuração do gerenciamento de estado
│   ├── utils/           # Funções utilitárias
│   ├── App.js           # Configuração principal do React
│   └── main.js          # Ponto de entrada da aplicação
└── package.json
```

### Backend

O backend foi construído utilizando Golang e está organizado da seguinte maneira:

```
backend/
├── cmd/
│   └── tools/             # Comandos utilitários
│       └── migrate          
│           └── main.go    # Comando de geração de migrates
├── api/
│   └── api.go             # Manipuladores para as rotas da API
├── store/
│   └── pgstore
│       ├── migrations     # Estruturas de dados e modelos do banco
│       └── queries        # Interação com o banco de dados
├── token/
│   └── auth.go            # Middlewares de autenticação e validação
├── main.go                # Ponto de entrada da aplicação
└── go.mod                 # Dependências do projeto
```

## Como Executar o Projeto

### Requisitos

- Node.js ou Yarn
- Go
- Banco de Dados PostgreSQL
- Docker

### Configuração do Backend (Golang)

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:YuriVini/zrp-dev-challenge.git
   cd back
   ```

2. **Instale as dependências:**
   ```bash
   go mod tidy
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto backend e adicione as configurações necessárias para como conexão com o banco de dados.

4. **Certifique-se de que o Docker está instalado e rodando.**

5. **Suba os serviços:**
   ```bash
   docker-compose start
   docker-compose up --build
   ```

6. **Execute as migrações do banco de dados:**
   ```bash
   go run cmd/tools/migrate/main.go
   # OR
   tern migrate --migrations ./store/pgstore/migrations --config ./store/pgstore/migrations/tern.conf
   ```

7. **Inicie o servidor:**
   ```bash
   go run .
   ```

O servidor estará rodando em `http://localhost:XXXX`.

### Configuração do Frontend (React)

1. **Vá para a pasta do frontend:**
   ```bash
   cd web
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto frontend e adicione as configurações necessárias, como a URL do backend, chave de API do mapa, etc.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn dev
   ```

A aplicação estará acessível em `http://localhost:XXXX`.

## Funcionalidades Implementadas

### Autenticação
- Cadastro e login de usuários administrativos com JWT.
  
### CRUD de Heróis
- Cadastro, edição, remoção e listagem de heróis.

### Alocação de Heróis
- Alocação de heróis com base em proximidade e rank.
- Integração em tempo real para alertas de ameaças.

### Histórico de Ameaças
- Visualização do histórico de ameaças combatidas.

## Testes

- Testes de unitários e integração com ferramentas como Vitest e React Testing Library.

Para executar os testes:
  ```bash
  yarn test
  ```

## Considerações Finais

Este projeto foi desenvolvido para demonstrar habilidades técnicas em desenvolvimento Fullstack, utilizando tecnologias modernas e seguindo boas práticas de desenvolvimento de software. Qualquer feedback ou sugestão é bem-vinda!
