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
    
    async Create(table: string, params: string, values: string[]) { //Corrigir Query
        await this.client.connect();
        const query =  `INSERT INTO ${table} ${params} VALUES ${values.toString()}`;
        await this.client.query(query);
        await this.client.end();
    }

    async Read(table: string, params: string, filter?: string, value?: string): Promise<any[]> { //OK
        await this.client.connect();

        let query;

        if (filter?.length! > 0) {
            query = {
                text: `SELECT ${params} FROM ${table} WHERE ${filter} = $1`,
                values: [value],
            }
        } else {
            query = {
                text: `SELECT ${params} FROM ${table}`,
            }
        }

        const res = await this.client.query(query);
        await this.client.end();
        return res.rows;
    };


    async Update(table: string, params: string, filters: string) { //Corrigir Query
        await this.client.connect();
        const query = {
            text: `UPDATE $1 SET $2  WHERE $3`,
            values: [table, params, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };

    async Delete(table: string, filters: string){ //Corrigir Query
        await this.client.connect();
        const query = {
            text: `DELETE FROM $1 WHERE $3`,
            values: [table, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };
};