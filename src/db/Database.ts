import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const dbPool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_IP,
    database: process.env.DB_NAME
});

dbPool.on('connect', () => {
    console.log('✅ Conectado ao PostgreSQL');
});

dbPool.on('error', (err) => {
    console.error('❌ Erro no pool de conexões:', err);
});


export default dbPool;
