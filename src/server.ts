import app from "@/app/app.js";
import { createDatabasePool } from "@/db/Database.js";
import dotenv from "dotenv";
import { resolve } from 'path';
import 'reflect-metadata';

if(process.env.NODE_ENV != "prod"){
    dotenv.config({ path: resolve("./", `.env.development.local`)});
}

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_IP,
    database: process.env.DB_NAME, 
  };

const jwtSecret: string = process.env.JWT_SECRET as string;

const PORT = process.env.PORT_APP_SERVER;
const dbPool = createDatabasePool(dbConfig);

app.listen(PORT, () => {
    console.log("server started at " + PORT)
})

export { dbPool }