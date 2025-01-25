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

    async select(table: string, columns: string, filters?: string[]): Promise<any[]> {
        try {
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
            
        } catch (error) {
            throw new Error("SQL Error" + error)
        }
    };


    async update(table: string, updatedItem: object, filter: string) { //Corrigir Query
        await this.client.connect();

        const columns = Object.keys(updatedItem);
        const values = Object.values(updatedItem);

        const setClause = columns.map((column, i) => `${column} = $${i + 1}`).join(', ')

        const query = {
            text: `UPDATE ${table} SET ${setClause} WHERE $${values.length + 1}`,
            values: [values.toString(), filter]
        }
        await this.client.query(query);
        await this.client.end();
    };

    async delete(table: string, filter: string){
        try{

            await this.client.connect();
            const query = {
                text: `DELETE FROM ${table} WHERE $3`,
                values: [filter]
            }
            await this.client.query(query);
            await this.client.end();
        }catch(error){
            throw new Error("SQL Error: " + error)
        }
    };
};