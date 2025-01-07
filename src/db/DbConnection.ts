import { Pool } from "pg";

export class DbConnection {

    constructor(
        private pool: Pool = new Pool ({ 
            user: process.env.DB_USER,
            password: process.env.DB_USER_PASS,
            host: process.env.DB_IP,
            port: Number(process.env.DB_PORT),
            database:  process.env.DB_NAME
         })
    ){}
    
    async Create(tabela: string, params: string, values: string) {
        const client = await this.pool.connect();
        const query = {
            text: `INSERT INTO $1 $2 VALUES $3`,
            values: [tabela, params, values]
        };
        await client.query(query);
        client.release();
    };

    async Read(tabela: string, params: string, filters?: string): Promise<any[]> {
        const client = await this.pool.connect();

        let query;

        if (filters?.length! > 0) {
            query = `SELECT ${params} FROM ${tabela} WHERE ${filters}`;
        } else {
            query = `SELECT ${params} FROM ${tabela}`;
        }

        const res = await client.query(query);
        client.release();
        return res.rows;
    };


    async Update(tabela: string, params: string, filters: string) {
        const client = await this.pool.connect();
        const query = {
            text: `UPDATE $1 SET $2  WHERE $3`,
            values: [tabela, params, filters]
        }
        await client.query(query);
        client.release();
    };

    async Delete(tabela: string, filters: string){
        const client = await this.pool.connect();
        const query = {
            text: `DELETE FROM $1 WHERE $3`,
            values: [tabela, filters]
        }
        await client.query(query);
        await this.pool.end();
    };
}