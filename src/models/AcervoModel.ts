import { Util } from "../classes/Util.js";
import dbPool from "../db/Database.js";
import { AcervoItem } from "../classes/AcervoItem.js";
import { plainToInstance } from "class-transformer";

export class AcervoModel {
  private static table = "acervo_table";

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

  static async getAllItens(): Promise<AcervoItem[]> {

    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    const itens: AcervoItem[] = Util.transformDbArrayResponseToClassArray<AcervoItem>(res.rows, AcervoItem)

    return itens;
  }

  static async getItemById(id: number): Promise<AcervoItem> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);
    const item: AcervoItem = Util.transformDbArrayResponseToClassArray<AcervoItem>(res.rows, AcervoItem)[0]
    return item;
  }

  static async updateItem(id: number, setClause: string, values: string[]): Promise<void> {
    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query)
  }

  static async deleteItemById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE ID = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
