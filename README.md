# 🐰 NewJeans API 🐰

## Sumário
- [Descrição](#descrição)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação da API](#documentação-da-api)
  - [Autenticação](#autenticação)
  - [Usuários](#usuários)
  - [Álbuns](#álbuns)
  - [Músicas](#músicas)
  - [Playlists](#playlists)
  - [Membros](#membros)
  - [Administração](#administração)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Scripts Úteis](#scripts-úteis)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Contribuição](#contribuição)
- [Contato](#-contato)
- [RedesSociais](#redes-sociais)

## Descrição
A API NewJeans permite a gestão de usuários, álbuns, músicas, playlists e membros de um grupo. Esta API foi projetada para ser robusta, flexível e fácil de integrar com outros serviços.

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte maneira:

```
newjeans-api/
├── config/
│   └── db.js              # Configuração da conexão com o MongoDB
├── controllers/
│   ├── authController.js  # Lógica de autenticação
│   ├── userController.js  # Lógica de gerenciamento de usuários
│   ├── albumController.js # Lógica de gerenciamento de álbuns
│   ├── musicController.js # Lógica de gerenciamento de músicas
│   ├── playlistController.js # Lógica de gerenciamento de playlists
│   ├── memberController.js # Lógica de gerenciamento de membros
│   ├── installController.js # Lógica pra instalar o programa
│   └── adminController.js # Lógica específica para administradores
├── models/
│   ├── userModel.js       # Esquema de usuário
│   ├── albumModel.js      # Esquema de álbum
│   ├── musicModel.js      # Esquema de música
│   ├── playlistModel.js   # Esquema de playlist
│   └── memberModel.js     # Esquema de membro
├── routes/
│   ├── authRoutes.js      # Rotas de autenticação
│   ├── userRoutes.js      # Rotas de usuários
│   ├── albumRoutes.js     # Rotas de álbuns
│   ├── musicRoutes.js     # Rotas de músicas
│   ├── playlistRoutes.js  # Rotas de playlists
│   ├── memberRoutes.js    # Rotas de membros
│   ├── adminRoutes.js     # Rotas de administração
│   ├── installRoutes.js   # Rota de instalação
│   └── swaggerRoute.js    # Rota de documentação Swagger
├── utils/
│   ├── FirstUser.js # Script para criar o primeiro usuário
│   └── FirstAdmin.js # Script para criar o primeiro administrador
├── .env                   # Variáveis de ambiente
├── package.json
├── package-lock.json
├── index.js
├── swagger_doc.json
└── README.md
```

## Documentação da API

A API está documentada usando o padrão OpenAPI 3.0. Abaixo estão alguns exemplos de endpoints:

## Instalação

- **GET /install** : Instala o Banco de Dados na API

### Autenticação
- **POST /auth/register**: Registrar um novo usuário.
- **POST /auth/login**: Realizar login de usuário.

### Usuários
- **GET /user/me**: Obter o perfil do usuário autenticado.
- **PUT /user/{id}**: Atualizar perfil do usuário.
- **DELETE /user/{id}**: Deletar um usuário.

### Álbuns
- **POST /album**: Adicionar um novo álbum.
- **GET /album**: Listar todos os álbuns.
- **GET /album/{id}**: Obter um álbum específico.
- **PUT /album/{id}**: Atualizar um álbum.
- **DELETE /album/{id}**: Deletar um álbum.

### Músicas
- **POST /music**: Adicionar uma nova música.
- **GET /music**: Listar todas as músicas.
- **GET /music/{id}**: Obter uma música específica.
- **PUT /music/{id}**: Atualizar uma música.
- **DELETE /music/{id}**: Deletar uma música.

### Playlists
- **POST /playlist**: Criar uma nova playlist.
- **GET /playlist**: Obter playlists do usuário autenticado.
- **PUT /playlist/{id}**: Atualizar uma playlist.
- **DELETE /playlist/{id}**: Deletar uma playlist.

### Membros
- **POST /member**: Adicionar um novo membro.
- **GET /member**: Listar todos os membros.
- **GET /member/{id}**: Obter um membro específico.
- **PUT /member/{id}**: Atualizar um membro.

### Administração
- **GET /admin**: Obter todos os usuários.
- **POST /admin**: Criar um novo administrador.

## Tecnologias Usadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: Biblioteca para modelagem de dados no MongoDB.
- **Swagger**: Ferramenta para documentação da API.
- **JWT (JSON Web Tokens)**: Autenticação e gerenciamento de sessões.
- **BCRYPT** : Ferramenta para Hash das senhas

## Scripts Úteis
- **createFirstUser.js**: Cria o primeiro usuário da aplicação.
- **createFirstAdmin.js**: Cria o primeiro administrador da aplicação.

## Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```

MONGO_URI=(Link do Mongo)
PORT=2000
JWT_SECRET= O Segredo
TESTE=(Usado para teste )
EMAIL_ADMIN= (EMAIL DO ADM)
SENHA_ADMIN= (SENHA DO ADM)
EMAIL_USER= (EMAIL DO USUARIO)
SENHA_USER= (SENHA DO USUARIO)
```

## Instalação
Para instalar as dependências e iniciar a API, siga os passos abaixo:

```bash
npm install
npm start
```
# 💬 Contato

Entre em contato em caso de dúvidas e sugestões para melhoria do projeto NewJeans.

### Redes Sociais

- [Instagram](https://www.instagram.com/gabrielvcrf/)
- [E-mail](mailto:gabrielmvcontato@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/gabrielvictorct/)
