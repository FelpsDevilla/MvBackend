import { LivrariaItem } from "@/classes/LivrariaItem.js";

const table = "livraria";

export async function insertItem(item: LivrariaItem): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item);
  const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
  const values: string[] = filtredEntries.map(([_, value]) => value);
  const placeholders = Util.buildPlaceholders(values);

  const query: { text: string, values: string[] } = {
    text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
    values: values,
  };

  await dbPool.query(query);
}

export async function getAllItens(): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table}`);
  return res.rows;
}

export async function getItemById(id: number): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table} WHERE ID = ${id}`);
  return res.rows;
}

export async function updateItem(id: number, updatedItem: LivrariaItem): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedItem);
  const setClause: string = Util.buildUpdateSetClause(filtredEntries);
  const values: string[] = Util.objectValuestoDbValues(filtredEntries);

  const query = {
    text: `UPDATE ${table} SET ${setClause} WHERE ID = ${id}`,
    values: values
  };

  await dbPool.query(query);
}

export async function deleteItemById(id: number): Promise<void> {
  const query: { text: string, values: number[] } = {
    text: `DELETE FROM ${table} WHERE id = $1`,
    values: [id]
  }
  await dbPool.query(query);
}
