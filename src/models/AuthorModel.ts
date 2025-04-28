import { Author } from "@/classes/Author.js";
import { Util } from "@/classes/Util.js";
import { dbPool }  from "@/server.js";

export class AuthorModel {
  private static table = "authors";

  static async insertAuthor(author: Author): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(author);
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = filtredEntries.map(([_, value]) => value);
    const placeholders = Util.buildPlaceholders(values);

    const query = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };

    await dbPool.query(query);
  }

  static async getAllAuthors(): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    return res.rows;
  }

  static async getAuthorById(id: number): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);

    return res.rows;
  }

  static async updateAuthor(id: number, updatedAuthor: Author): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedAuthor);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };

    await dbPool.query(query);
  }

  static async deleteAuthorById(id: number): Promise<void> {

    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }

    await dbPool.query(query);
  }
}
