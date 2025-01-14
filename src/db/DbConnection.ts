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
    
    async insert(table: string, columns: string, values: string[]) {
        await this.client.connect();

        try {
            const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

            const query =  {
            text: `INSERT INTO ${table} ${columns} VALUES (${placeholders})`,
            values: values
            };
    
            await this.client.query(query);
           
        } catch (error) {
            throw new Error("SQL error: " + error);
            
        }finally{

            await this.client.end();
        }

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
            text: `UPDATE ${table} SET $2  WHERE $3`,
            values: [columns, filters]
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