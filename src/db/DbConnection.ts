import { text } from "express";
import { Client } from "pg"

export class DbConnection { //alterar Client para Pool, testar carga de conectoes

    readonly client: Client;

    constructor() {
        this.client = new Client({
            user: 'postgres',
            password: '300575Mi.',
            host: 'localhost',
            database: 'MvDB',
        });
    }


    async BuscarItem(parametro: string, tabela: string): Promise<any[]> {
    await this.client.connect();
    const res = await this.client.query(`SELECT ${parametro} FROM ${tabela}`);
    await this.client.end();
    return res.rows;
    }      

    //#region CRUD ACERVO
    
    async AdcionarItemAcervo(item: Acervo_item) {
        await this.client.connect();
        const query = {
            text: `INSERT INTO acervo_itens 
            (url_miniatura, 
            cidade, 
            nome_objeto, 
            data_criacao, 
            legenda, 
            tecnica, 
            material, 
            digitalizado, 
            nativo_digital, 
            numero_registro, 
            estado, 
            autoria, 
            tecnica_digitalizacao, 
            colecao, 
            doador, 
            tamanho_arquivo_mb, 
            contexto_historico)  
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
            values: [
                item.thumbnailUrl,
                item.city,
                item.objectName,
                item.creationDate,
                item.legend,
                item.technique,
                item.material,
                item.digitized,
                item.state,
                item.author,
                item.collection,
                item.donor,
                item.contextHistory
            ]
        };
        await this.client.query(query);
        await this.client.end();
        }   
    
    async UpdateItemAcervo(item: Acervo_item){
        await this.client.connect();
        const query = {}
    }
    // #endregion

    //#region CRUD Biblioteca
    async AdcionarItemLivraria(item: livraria_item) {
    await this.client.connect();
    const query = {};
    await this.client.query(query);
    await this.client.end();
    }
    //#endregion

    //#region CRUD USUARIOS
    async AdcionarUsuario(usuario: Usuario) {
    await this.client.connect();

    const query = { };

    await this.client.query(query);
    await this.client.end();
    }
    //#endregion
}