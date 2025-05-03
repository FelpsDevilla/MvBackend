import { User } from "@/classes/User";
import { Util } from "@/classes/Util";
import { dbPool }  from "@/server.js";
import { plainToInstance } from "class-transformer";

export class UserModel {
  private static table = "users";

  static async insertUser(user: User): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(user);    
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[]= filtredEntries.map(([_, value]) => value);
    const placeholders = Util.buildPlaceholders(values);

    const query: {text: string, values: string[]} = {
      text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };

    await dbPool.query(query);
  }

  static async getAllUsers(): Promise<User[]> {
    const res = await dbPool.query(`SELECT * FROM ${this.table}`);
    const users: User[] = plainToInstance(User, res.rows)
    return users;
  }

  static async getUserById(id: number): Promise<User> {
    const res = await dbPool.query(`SELECT * FROM ${this.table} WHERE ID = ${id}`);
    const user: User = plainToInstance(User, res.rows[0] as User);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  static async getUserBycpf(cpf: number): Promise<User> {

    const query: {text: string, values: Number[]} = {
      text: 'SELECT * FROM users WHERE cpf = $1',
      values: [cpf]
    };

    const res = await dbPool.query(query);
    const user: User = plainToInstance(User, res.rows[0] as User);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    
    return user;
  }

  static async updateUser(id: number, updatedUser: User): Promise<void> {

    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedUser);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query: {text: string, values: string[]} = {
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
