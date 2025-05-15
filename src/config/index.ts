import "reflect-metadata";
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const isDev: boolean = process.env.NODE_ENV == undefined;

if (isDev) {
  console.log("Server running in Developer Mode");
  dotenv.config();
}

export const config = {
  port: isDev ? parseInt(process.env.SERVER_PORT || "443") : 443,

  db: {
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
  },

  ssl: {
    keyPath: isDev ? "./SSL/mv.key" : "/etc/ssl/mv/mv.key",
    certPath: isDev ? "./SSL/mv.crt" : "/etc/ssl/mv/mv.crt",
  },

  filesPath: {
    archiveImages: "public/data/uploads/archive/images",
    galleryImages: "public/data/uploads/gallery/images",
    libraryImages: "public/data/uploads/library/images",
    libraryBooks: "public/data/uploads/library/books"
  }
};