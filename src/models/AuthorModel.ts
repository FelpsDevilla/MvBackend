import { Author } from "../classes/Author.js";
import dbPool from "../db/Database.js";
import { Util } from "../classes/Util.js";

export class AuthorModel {
  private static table = "authors_table";

  static async insertAuthor(columns: string, placeholders: string, values: any[]): Promise<void> {
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

  static async updateAuthor(id: number, setClause: string, values: string[]): Promise<void> {
    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query)
  }

  static async deleteAuthorById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
