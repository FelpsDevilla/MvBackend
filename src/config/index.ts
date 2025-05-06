import dotenv from "dotenv";

const isDev: boolean = process.env.NODE_ENV == undefined;

if (isDev) {
  console.log("Server running in Developer Mode");
  dotenv.config();
}

export const config = {
  port: isDev ? parseInt(process.env.SERVER_PORT || "443") : 443,

  db: {
    user: isDev ? (process.env.DB_USER as string) : "MvDB",
    password: process.env.DB_USER_PASS as string,
    host: isDev ? (process.env.DB_IP as string) : "mvdb",
    database: "MvDB",
  },

  ssl: {
    keyPath: isDev ? "./SSL/mv.key" : "/etc/ssl/mv/mv.key",
    certPath: isDev ? "./SSL/mv.crt" : "/etc/ssl/mv/mv.crt",
  },
};