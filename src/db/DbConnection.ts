import pg from "pg"

export class DbConnection { //alterar Client para Pool, testar carga de conectoes

    readonly client: pg.Client;

    constructor() {
        const { Client } = pg;
        this.client = new Client({
            user: 'postgres',
            password: '300575Mi.',
            host: 'localhost',
            database: 'MvDB',
        });
    };

    async Create(tabela: string, params: string, values: string) {
        await this.client.connect();
        const query = {
            text: `INSERT INTO $1 $2 VALUES $3`,
            values: [tabela, params, values]
        };
        await this.client.query(query);
        await this.client.end();
    };

    async Read(tabela: string, params: string, filters?: string): Promise<any[]> {
        await this.client.connect();

        let query;

        if (filters?.length! > 0) {
            query = `SELECT ${params} FROM ${tabela} WHERE ${filters}`;
        } else {
            query = `SELECT ${params} FROM ${tabela}`;
        }

        const res = await this.client.query(query);
        await this.client.end();
        return res.rows;
    };


    async Update(tabela: string, params: string, filters: string) {
        await this.client.connect();
        const query = {
            text: `UPDATE $1 SET $2  WHERE $3`,
            values: [tabela, params, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };

    async Delete(tabela: string, filters: string){
        await this.client.connect();
        const query = {
            text: `DELETE FROM $1 WHERE $3`,
            values: [tabela, filters]
        }
        await this.client.query(query);
        await this.client.end();
    };
}