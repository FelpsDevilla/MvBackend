import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbPool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_IP,
    database:  process.env.DB_NAME
});

export default dbPool;
