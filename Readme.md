# MvBackend

Backend oficial do **MvProject**.

Este projeto foi desenvolvido em **Node.js** + **TypeScript**, utilizando arquitetura modular, suporte a variáveis de ambiente e preparado para execução via **Docker**.

## 🚀 Executando em Produção

Para rodar o **MvBackend** com **PostgreSQL** em ambiente de produção, siga os passos abaixo:

1. Copiar este [Docker Compose](docker-compose.yml)
2. Gere um certficado e uma chave SSL nomeando-os como `mv.crt` e `mv.key`
3. Alterar o valor de `hostSSLPath` no **docker-compose.yml** para o diretório exato onde os arquivos do certificado estarão armazenados no host. Esse diretório será montado no container em `/etc/ssl/mvdb` com permissão de leitura e deve conter os arquivos gerados no passo anterior.
4. Execute o Docker Compose. Se tudo estiver correto, o ambiente backend estará funcionando..

> [!WARNING]
> Certifique-se de alterar as variáveis de ambiente no Docker Compose.

## :toolbox: Tecnologias Utilizadas

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
- **typeORM**

---

## :technologist: Desenvolvimento

### Desenvolvimento Normal

Após clonar o repositório, siga os passos abaixo:

1. `npm install`
2. Crie um arquivo `.env` utilizando como base [.env.example](.env.example)
3. Criar Pasta `SSL` na raiz do projeto e adicionar um certificado e uma chave SSL nomeando-os como `mv.crt` e `mv.key`
4. Execute `npm run createDB` para criar as tabelas do banco
5. Execute `npm run dev` para iniciar a aplicação

> [!NOTE]
> Esses comandos iniciam apenas o servidor de aplicação.
> Para configurar o banco de dados localmente, crie o banco antes com nome MvDB.

> [!WARNING]
> Não versionar pasta `SSL` e `.env`
>
> O servidor inicia apenas em modo HTTPS. Sem a pasta SSL com o certificado e a chave, a aplicação não será iniciada.

---

### 🐳 Testando a aplicação com Docker

Como alternativa ao ambiente local com Node.js, é possível testar a aplicação utilizando **Docker** e **Docker Compose**, o que garante um ambiente padronizado com o banco de dados configurado automaticamente.

#### Passos:

1. certifiique-se de que o Docker e o Docker Compose estão instalados.
2. Criar Pasta `SSL` na raiz do projeto e adicionar um certificado e uma chave SSL nomeando-os como `mv.crt` e `mv.key`
3. Execute o comando:

   ```
   npm run docker
   ```

Isso irá:

- Construir a imagem Docker do backend.
- Subir um container com o banco de dados PostgreSQL.
- Rodar a migration para criar tabelas e usuario admin.
- Executar a aplicação no ambiente de desenvolvimento (porta 8000, por padrão).

> [!TIP]
> Recomendo usar o gerador de certificados do [Rako Tolls](https://pt.rakko.tools/tools/46/#google_vignette)

## 🛠️ Scripts Disponíveis

Os seguintes scripts podem ser executados usando `npm run <comando>`:

| Comando               | Descrição                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `dev`                 | Inicia o servidor em modo de desenvolvimento com recarregamento automático usando **tsx** e **nodemon**. |
| `build`               | Compila o código TypeScript para JavaScript e resolve os caminhos, gerando os arquivos em `dist`.        |
| `start`               | Roda as migrations e executa a aplicação a partir dos arquivos JavaScript compilados em `dist`.          |
| `docker`              | Builda e executa os containers da aplicação e do banco de dados usando **Docker Compose**.               |
| `typeorm`             | Executa o CLI do TypeORM com suporte a ES Modules.                                                       |
| `migrations:generate` | Gera uma nova migration baseada nas alterações detectadas nas entidades.                                 |
| `createDB`            | Gera uma migration inicial chamada `createDB` e a executa em seguida.                                    |
| `migrations:run`      | Executa todas as migrations pendentes.                                                                   |
| `migrations:revert`   | Reverte a última migration executada.                                                                    |
| `lint`                | Executa o **ESLint** para análise de código.                                                             |
| `lint:fix`            | Executa o **ESLint** e corrige automaticamente os problemas encontrados.                                 |
