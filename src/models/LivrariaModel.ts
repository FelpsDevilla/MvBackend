import { LivrariaItem } from "@/classes/LivrariaItem.js";
import { Util } from "@/classes/Util.js";
import { dbPool }  from "@/server.js";

export class LivrariaModel {
  private static table = "livraria";

  static async insertItem(item: LivrariaItem): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item);
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = filtredEntries.map(([_, value]) => value);
    const placeholders = Util.buildPlaceholders(values);

    const query: {text: string, values: string[]} = {
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

  static async updateItem(id: number, updatedItem: LivrariaItem): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedItem);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };

    await dbPool.query(query);
  }

  static async deleteItemById(id: number): Promise<void> {
    const query: {text: string, values: number[]} = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
