import pg from "pg";

export class DbConnection {

    constructor(
        private client: pg.Client = new pg.Client ({ 
            user: process.env.DB_USER,
            password: process.env.DB_USER_PASS,
            host: process.env.DB_IP,
            database:  process.env.DB_NAME
         })
    ){}
    
    async insert(table: string, columns: string, values: string[]) { //Corrigir Query
        await this.client.connect();
        const query =  `INSERT INTO ${table} ${columns} VALUES ${values.toString()}`;
        await this.client.query(query);
        await this.client.end();
    }

    async select(table: string, columns: string, filters?: string[]): Promise<any[]> { //OK
        await this.client.connect();

        let query;

        if (filters?.length! > 0) {
            query = {
                text: `SELECT ${columns} FROM ${table} WHERE ${filters?.toString()}`
            }
        } else {
            query = {
                text: `SELECT ${columns} FROM ${table}`,
            }
        }

        const res = await this.client.query(query);
        await this.client.end();
        return res.rows;
    };


    async update(table: string, columns: string, filters: string) { //Corrigir Query
        await this.client.connect();
        const query = {
            text: `UPDATE $1 SET $2  WHERE $3`,
            values: [table, columns, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };

    async delete(table: string, filters: string){ //Corrigir Query
        await this.client.connect();
        const query = {
            text: `DELETE FROM $1 WHERE $3`,
            values: [table, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };
};