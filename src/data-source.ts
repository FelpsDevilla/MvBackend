import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { isDev } from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: isDev ? (process.env.DB_IP as string) : "mvdb",
    port: 5432,
    username: isDev ? (process.env.DB_USER as string) : "MvDB",
    password: process.env.DB_USER_PASS as string,
    database: "MvDB",
    synchronize: false,
    logging: true,
    entities: ["src/classes/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  })