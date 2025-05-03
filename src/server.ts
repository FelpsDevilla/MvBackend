import app from "@/app/app.js";
import { createDatabasePool } from "@/db/Database.js";
import dotenv from "dotenv";
import 'reflect-metadata';

let dbConfig = {
    user: "MvDB",
    password: process.env.DB_USER_PASS,
    host: "mvdb",
    database: "MvDB", 
};

let Port = 80;

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

app.listen(Port, () => {
    console.log("server started at Port " + Port)
})

export { dbPool }