import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const isDev: boolean = process.env.NODE_ENV == undefined;

if (isDev) {
  console.log("Running Migrations on Developer Mode");
  dotenv.config();
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: isDev ? (process.env.DB_IP as string) : "mvdb",
    port: 5432,
    username: isDev ? (process.env.DB_USER as string) : "MvDB",
    password: process.env.DB_USER_PASS as string,
    database: "MvDB",
    synchronize: false,
    logging: false,
    entities: ["src/classes/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  })