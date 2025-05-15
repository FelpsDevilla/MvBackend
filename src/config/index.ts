import "reflect-metadata";
import dotenv from "dotenv";

export const isDev: boolean = process.env.NODE_ENV == undefined;

if (isDev) {
  console.log("Server running in Developer Mode");
  dotenv.config();
}

export const config = {
  port: isDev ? parseInt(process.env.SERVER_PORT || "443") : 443,

  ssl: {
    keyPath: isDev ? "./SSL/mv.key" : "/etc/ssl/mv/mv.key",
    certPath: isDev ? "./SSL/mv.crt" : "/etc/ssl/mv/mv.crt",
  },

  filesPath:{
    archiveImages: "public/data/uploads/archive/images",
    galleryImages: "public/data/uploads/gallery/images",
    libraryImages: "public/data/uploads/library/images",
    libraryBooks: "public/data/uploads/library/books"
  }
};