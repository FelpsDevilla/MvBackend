import { Author } from "@/classes/Author.js";
import { Util } from "@/classes/Util.js";
import { dbPool } from "@/server/server.js";

const table = "authors";

export async function insertAuthor(author: Author): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(author);
  const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
  const values: string[] = filtredEntries.map(([_, value]) => value);
  const placeholders = Util.buildPlaceholders(values);

  const query: { text: string, values: string[] } = {
    text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
    values: values,
  };

  await dbPool.query(query);
}

export async function getAllAuthors(): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table}`);
  return res.rows;
}

export async function getAuthorById(id: number): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table} WHERE ID = ${id}`);

  return res.rows;
}

export async function updateAuthor(id: number, updatedAuthor: Author): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedAuthor);
  const setClause: string = Util.buildUpdateSetClause(filtredEntries);
  const values: string[] = Util.objectValuestoDbValues(filtredEntries);

  const query = {
    text: `UPDATE ${table} SET ${setClause} WHERE ID = ${id}`,
    values: values
  };

  await dbPool.query(query);
}

export async function deleteAuthorById(id: number): Promise<void> {

  const query: { text: string, values: number[] } = {
    text: `DELETE FROM ${table} WHERE id = $1`,
    values: [id]
  }

  await dbPool.query(query);
}
