import { Collection } from "../classes/Collection.js";
import dbPool from "../db/Database.js";
import { Util } from "../classes/Util.js";

export class CollectionModel {
  private static table = "collections_table";

  static async insertItem(colection: Collection): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(colection);
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);
    const placeholders = Util.buildPlaceholders(values);
    const query = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };
    await dbPool.query(query);
  }

  static async getAllItens(): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    return res.rows;
  }

  static async getItemById(id: number): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);
    return res.rows;
  }

  static async updateItem(id: number, colection: Collection): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(colection);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);
    const setClause = Util.buildUpdateSetClause(filtredEntries);
    
    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query)
  }

  static async deleteItemById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
