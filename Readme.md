# MvBackend

Backend oficial do **MvProject**.

Este projeto foi desenvolvido em **Node.js** + **TypeScript**, utilizando arquitetura modular, suporte a variáveis de ambiente e preparado para execução via **Docker**.

---

## 📂 Estrutura do Projeto
```
src/
├── app/
│   └── app.ts        # Configuração principal do servidor Express
├── controllers/      # Lógica de controle para lidar com as requisições
├── db/               # Script para criar o DB e Classe que gerencia o DB
├── services/         # Camada de serviços contendo a lógica de negócio
├── models/           # Definição de modelos de dados e entidades
├── routes/           # Definição das rotas da aplicação
├── config/           # Arquivos de configuração geral
└── server.ts         # Ponto de entrada para inicializar o servidor
```
---

## 🚀 Tecnologias Utilizadas

- **Node.js** v22
- **TypeScript** 
- **Express** 
- **tsx**
- **tsconfig-paths**
- **Docker**
- **dotenv**
---

## 🛠️ Scripts Disponíveis

Os seguintes scripts podem ser executados usando `npm run <comando>`:

| Comando       | Descrição                                                                 |
| :------------ | :------------------------------------------------------------------------ |
| `dev`         | Inicia o servidor em modo de desenvolvimento com recarregamento automático usando **tsx** e **nodemon**. |
| `build`       | Compila o código TypeScript para JavaScript e armazena os arquivos em `dist`. |
| `start`       | Executa a aplicação a partir dos arquivos JavaScript compilados em `dist`. |

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

- PORT_APP_SERVER=8000
- DB_USER= <Usuario_do_db>
- DB_USER_PASS= <Senha_do_usario_db>
- DB_NAME= <Nome_do_DB>
- DB_IP= <Ip_do_DB>
- JWT_SECRET= <Crie_um_secret>