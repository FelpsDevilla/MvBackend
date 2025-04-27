import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

if(process.env.NODE_ENV != "prod"){
    dotenv.config();
}

const dbPool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_IP,
    database: process.env.DB_NAME
});

export default dbPool
