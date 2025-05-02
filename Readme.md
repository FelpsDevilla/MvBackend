# MvBackend

Backend oficial do **MvProject**.

Este projeto foi desenvolvido em **Node.js** + **TypeScript**, utilizando arquitetura modular, suporte a variáveis de ambiente e preparado para execução via **Docker**.

### 🚀 Executando em Produção

Para rodar o **MvBackend** em ambiente de produção, utilize a imagem publicada no Docker Hub. Certifique-se de alterar as variáveis de ambiente estejam corretamente definidas.
Utilize esse Docker Compose [Docker Compose](docker-compose.yml)

---

## 📂 Estrutura do Projeto
```
src/
├── app/
│   └── app.ts        # Configuração principal do servidor Express
├── controllers/      # Lógica de controle para lidar com as requisições
├── db/               # Pasta com arquivo que gerencia o DB
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
- **Docker Compose**
- **dotenv**
- **jsonwebtoken**
- **bcryptjs**
---

## 🛠️ Scripts Disponíveis

Os seguintes scripts podem ser executados usando `npm run <comando>`:

| Comando       | Descrição                                                                 |
| :------------ | :------------------------------------------------------------------------ |
| `dev`         | Inicia o servidor em modo de desenvolvimento com recarregamento automático usando **tsx** e **nodemon**. |
| `build`       | Compila o código TypeScript para JavaScript e armazena os arquivos em `dist`. |
| `start`       | Executa a aplicação a partir dos arquivos JavaScript compilados em `dist`. |
| `docker`      | Builda e executa os containers da aplicação e do banco de dados usando **Docker** e **Docker Compose**. |

---
## :technologist: Desenvolvimento

### Desenvolvimento Normal
Após clonar o projeto para a máquina executar ações na seguinte ordem:

1. `npm install`
2. Criar arquivo `.env` conforme orientado em [Variáveis de Ambiente](#gear-variáveis-de-ambiente)
3. Se tudo der certo `npm run dev` deve iniciar a aplicação

> [!NOTE]
> Esses comandos iniciam apenas o servidor de aplicação.
> Para configurar o banco de dados localmente, utilize o script init.sql, que contém todas as instruções necessárias para criação das tabelas e estrutura inicial.
---

### 🐳 Testando a aplicação com Docker

Como alternativa ao ambiente local com Node.js, é possível testar a aplicação utilizando **Docker** e **Docker Compose**, o que garante um ambiente padronizado com o banco de dados configurado automaticamente.

#### Passos:

1. Certifique-se de que o Docker e o Docker Compose estão instalados.
2. Execute o comando:

   ```
   npm run docker
   ```

Isso irá:

- Construir a imagem Docker do backend;
- Subir um container com o banco de dados PostgreSQL;
- Executar a aplicação no ambiente de desenvolvimento (porta 8000, por padrão);

Aplicar automaticamente o script init.sql com a estrutura inicial do banco de dados.

## :gear: Variáveis de Ambiente

### Desenvolvimento 

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
NODE_ENV=dev
DB_USER= <Usuario_do_db>
DB_USER_PASS= <Senha_do_usario_db>
DB_IP= <Ip_do_DB>
JWT_SECRET= <Crie_um_secret>
JWT_SECRET_REFRESH = <Crie_um_secret>
```
> [!WARNING]
> Não versionar arquivo `.env`
