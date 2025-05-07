import { User } from "@/classes/User";
import { plainToInstance } from "class-transformer";

const table = "users";

export async function insertUser(user: User): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(user);
  const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
  const values: string[] = filtredEntries.map(([_, value]) => value);
  const placeholders = Util.buildPlaceholders(values);

  const query: { text: string, values: string[] } = {
    text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
    values: values,
  };

  await dbPool.query(query);
}

export async function getAllUsers(): Promise<User[]> {
  const res = await dbPool.query(`SELECT * FROM ${table}`);
  const users: User[] = plainToInstance(User, res.rows)
  return users;
}

export async function getUserById(id: number): Promise<User> {
  const res = await dbPool.query(`SELECT * FROM ${table} WHERE ID = ${id}`);
  const user: User = plainToInstance(User, res.rows[0] as User);

  if (!user) {
    //throw new Error("Usuário não encontrado");
  }

  return user;
}

export async function getUserBycpf(cpf: number): Promise<User> {

  const query: { text: string, values: Number[] } = {
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

export async function updateUser(id: number, updatedUser: User): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedUser);
  const setClause: string = Util.buildUpdateSetClause(filtredEntries);
  const values: string[] = Util.objectValuestoDbValues(filtredEntries);

  const query: { text: string, values: string[] } = {
    text: `UPDATE ${table} SET ${setClause} WHERE ID = ${id}`,
    values: values
  };
  await dbPool.query(query);
}

export async function deleteUserById(id: number): Promise<void> {
  const query = {
    text: `DELETE FROM ${table} WHERE id = $1`,
    values: [id]
  }
  await dbPool.query(query);
}
