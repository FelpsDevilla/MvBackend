import app from "@/app/app.js";
import { createDatabasePool } from "@/db/Database.js";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import 'reflect-metadata';

let Port = 80;
let dbConfig = {
    user: "MvDB",
    password: process.env.DB_USER_PASS,
    host: "mvdb",
    database: "MvDB", 
};


if(process.env.NODE_ENV === undefined){
    dotenv.config();
    Port = Number.parseInt(process.env.SERVER_PORT as string);
    dbConfig = {
        user: process.env.DB_USER as string,
        password: process.env.DB_USER_PASS,
        host: process.env.DB_IP as string,
        database: "MvDB", 
    };
}

const dbPool = createDatabasePool(dbConfig);

const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH as string),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH as string),
  };

https.createServer(httpsOptions, app).listen(Port, () => {
    console.log("Server started at Port " + Port)
});

export { dbPool }