import { User } from "@/classes/User";
import { Util } from "@/classes/Util";
import dbPool from "@/db/Database";

export class UserModel {
  private static table = "user_table";

  static async insertUser(user: User): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(user);    
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[]= filtredEntries.map(([_, value]) => value);
    const placeholders = Util.buildPlaceholders(values);

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

  static async updateUser(id: number, updatedUser: User): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedUser);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query);
  }

  static async deleteUserById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
}
