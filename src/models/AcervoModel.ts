import { AcervoItem } from "@/classes/AcervoItem.js";
import { AppDataSource } from "@/db/data-source";

export async function insertItem(item: AcervoItem): Promise<void> {
  const itemDB = AppDataSource.getRepository(AcervoItem).create(item);
  await AppDataSource.getRepository(AcervoItem).save(itemDB);
}

export async function getAllItens(): Promise<AcervoItem[]> {
  const itens: AcervoItem[] = await AppDataSource.getRepository(AcervoItem).find();
  if (itens.length === 0) {
    throw Error("No items found");
  }
  return itens;
}

export async function getItemById(id: number): Promise<AcervoItem> {
  const item: AcervoItem | null = await AppDataSource.getRepository(AcervoItem).findOneBy({ id: id });
  if (!item) {
    throw Error("No item found");
  }
  return item;
}

export async function updateItem(id: number, updatedItem: AcervoItem): Promise<void> {
  const itemDB = await AppDataSource.getRepository(AcervoItem).findOneBy({ id: id, });

  if (!itemDB) {
    throw Error("No item found");
  }

  AppDataSource.getRepository(AcervoItem).merge(itemDB, updatedItem);
  await AppDataSource.getRepository(AcervoItem).save(itemDB);
}

export async function deleteItemById(id: number): Promise<void> {
  await AppDataSource.getRepository(AcervoItem).delete(id);
}