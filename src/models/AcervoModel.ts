import { Util } from "@/classes/Util.js";
import { AcervoItem } from "@/classes/AcervoItem.js";
import { dbPool }  from "@/server/server.js";

  const table = "acervo";

  export async function insertItem(item: AcervoItem): Promise<void> {
    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item);
    const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);
    const placeholders = Util.buildPlaceholders(values);

    const query: {text: string, values: string[]} = {
      text: `INSERT INTO ${table} (${columns.toString()}) VALUES (${placeholders})`,
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

  export async function updateItem(id: number, updatedItem: AcervoItem): Promise<void> {
    const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(updatedItem);
    const setClause: string = Util.buildUpdateSetClause(filtredEntries);
    const values: string[] = Util.objectValuestoDbValues(filtredEntries);

    const query: {text: string, values: string[]} = {
      text: `UPDATE ${table} SET ${setClause} WHERE ID = ${id}`,
      values: values
    };
    await dbPool.query(query);
  }

  export async function deleteItemById(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${table} WHERE ID = $1`,
      values: [id]
    }
    await dbPool.query(query);
  }
