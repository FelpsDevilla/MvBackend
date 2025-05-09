import { AcervoItem } from "@/classes/AcervoItem";
import { Author } from "@/classes/Author";
import { Collection } from "@/classes/Collection";
import { LivrariaItem } from "@/classes/LivrariaItem";
import { User } from "@/classes/User";
import dotenv from "dotenv";
import 'reflect-metadata';

const isDev: boolean = process.env.NODE_ENV == undefined;

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
    entities: [AcervoItem, Author, Collection, User, LivrariaItem, "src/classes/*.js"],
    subscribers: [],
    migrations: [],
  },

  ssl: {
    keyPath: isDev ? "./SSL/mv.key" : "/etc/ssl/mv/mv.key",
    certPath: isDev ? "./SSL/mv.crt" : "/etc/ssl/mv/mv.crt",
  },

  filesPath:{
    acervoImages: "public/data/uploads/acervo/images",
    galleryImages: "public/data/uploads/gallery/images",
    LivrariaImages: "public/data/uploads/livraria/images",
    LivrariaBooks: "public/data/uploads/livraria/books"
  }
};