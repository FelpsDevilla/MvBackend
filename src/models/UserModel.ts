import { User } from "../classes/User.js";
import dbPool from "../db/Database.js";
import { Util } from "../classes/Util.js";

export class UserModel {
  private static table = "user_table";

  static async insertUser(columns: string, placeholders: string, values: any[]): Promise<void> {
    const query = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };
    await dbPool.query(query);
  }

  static async getAllUsers(): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    return res.rows;
  }

  static async getUserById(id: number): Promise<any[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);
    return res.rows;
  }

  static async updateUser(id: number, setClause: string, values: string[]): Promise<void> {
    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query)
  }

  static async deleteUserById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
