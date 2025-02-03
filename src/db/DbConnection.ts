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
    
    async insert(table: string, newItem: Object) {
        await this.client.connect();

        try {

            const columns = Object.keys(newItem).map(this.camelCaseToSnakeCase)
            const values = Object.values(newItem)
            const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

            const query =  {
            text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
            values: values
            };
            
            console.log(query)

            await this.client.query(query);
           
        } catch (error) {
            throw new Error("SQL Service error: " + error);
            
        }finally{

            await this.client.end();
        }

    }

    async select(table: string, columns: string, filters?: string[]): Promise<any[]> { //Ajustar
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
            return res.rows;
            
        } catch (error) {
            throw new Error("SQL Service Error" + error)
        }finally{
            await this.client.end();
        }
    };


    async update(table: string, updatedItem: Object, id: string) {
        try {
            await this.client.connect();
            const filtredEntries = Object.entries(updatedItem).filter(([_, value]) => value !== undefined);
            const columns = filtredEntries.map(([key]) => this.camelCaseToSnakeCase(key));
            const values = filtredEntries.map(([_, value]) => value);
            const setClause = columns.map((column, i) => `${column} = $${i + 1}`).join(', ');
            values.push(id);
            const query = {
                text: `UPDATE ${table} SET ${setClause} WHERE id = $${values.length}`,
                values: values
            };
            await this.client.query(query);
        } catch (error) {
            throw new Error("SQL Service Error: " + error);
        } finally {
            await this.client.end();
        }
    }

    async delete(table: string, id: string) {
        try {
            await this.client.connect();
            const query = {
                text: `DELETE FROM ${table} WHERE id = $1`,
                values: [id]
            };
            await this.client.query(query);
        } catch (error) {
            throw new Error("SQL Service Error: " + error);
        } finally {
            await this.client.end();
        }
    }

    private camelCaseToSnakeCase(camel: string): string {
        return camel.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
};