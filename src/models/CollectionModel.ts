import { Collection } from "@/classes/Collection";
import { Util } from "@/classes/Util";
import { dbPool }  from "@/server.js";

export class CollectionModel {
  private static table = "collections";

  static async insertCollection(collection: Collection): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(collection);
    console.log(filtredEntries)
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);
    const placeholders = Util.buildPlaceholders(values);

    const query: {text: string, values: string[]} = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };

    await dbPool.query(query);
  }

  static async getAllCollections(): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    return res.rows;
  }

  static async getCollectionById(id: number): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);
    return res.rows;
  }

  static async updateCollection(id: Number, updateCollection: Collection): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updateCollection);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query: {text: string, values: string[]} = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    
    await dbPool.query(query);
  }

  static async deleteCollectionById(id: number): Promise<void> {

    const query: {text: string, values: number[]} = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }

    await dbPool.query(query);
  }
}
