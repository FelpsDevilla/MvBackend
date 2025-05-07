import { Collection } from "@/classes/Collection";

const table = "collections";

export async function insertCollection(collection: Collection): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(collection);
  console.log(filtredEntries)
  const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
  const values: string[] = Util.objectValuestoDbValues(filtredEntries);
  const placeholders = Util.buildPlaceholders(values);

  const query: { text: string, values: string[] } = {
    text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
    values: values,
  };

  await dbPool.query(query);
}

export async function getAllCollections(): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table}`);
  return res.rows;
}

export async function getCollectionById(id: number): Promise<any[]> {
  const res = await dbPool.query(`SELECT * FROM ${table} WHERE ID = ${id}`);
  return res.rows;
}

export async function updateCollection(id: Number, updateCollection: Collection): Promise<void> {

  const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updateCollection);
  const setClause: string = Util.buildUpdateSetClause(filtredEntries);
  const values: string[] = Util.objectValuestoDbValues(filtredEntries);

  const query: { text: string, values: string[] } = {
    text: `UPDATE ${table} SET ${setClause} WHERE ID = ${id}`,
    values: values
  };

  await dbPool.query(query);
}

export async function deleteCollectionById(id: number): Promise<void> {

  const query: { text: string, values: number[] } = {
    text: `DELETE FROM ${table} WHERE id = $1`,
    values: [id]
  }

  await dbPool.query(query);
}
