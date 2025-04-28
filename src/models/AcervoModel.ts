import { Util } from "@/classes/Util.js";
import { AcervoItem } from "@/classes/AcervoItem.js";
import { dbPool }  from "@/server.js";

export class AcervoModel {
  private static table = "acervo";

  static async insertItem(item: AcervoItem): Promise<void> {
    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item);
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);
    const placeholders = Util.buildPlaceholders(values);

    const query = {
      text: `INSERT INTO ${this.table} (${columns.toString()}) VALUES (${placeholders})`,
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

  static async updateItem(id: number, updatedItem: AcervoItem): Promise<void> {
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
    const query = {
      text: `DELETE FROM ${this.table} WHERE ID = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
