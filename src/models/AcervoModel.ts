import { AcervoItem } from "@/classes/AcervoItem.js";
import { AppDataSource } from "@/data-source";
import { ForeignKeyConstraintError } from "@/Errors/ForeignKeyConstraintError";
import { NotFoundError } from "@/Errors/NotFoundError";
import { QueryFailedError } from "typeorm";

export async function insertItem(item: AcervoItem): Promise<void> {
  try {
    const itemDB = AppDataSource.getRepository(AcervoItem).create(item);
    await AppDataSource.getRepository(AcervoItem).save(itemDB);
  } catch (error) {
    if ((error instanceof QueryFailedError && error.driverError.constraint == "acervo_author_id_fkey")) {
      throw new ForeignKeyConstraintError(`Author not exist in DataBase`)
    }

    if ((error instanceof QueryFailedError && error.driverError.constraint == "acervo_collection_id_fkey")) {
      throw new ForeignKeyConstraintError(`collection not exist in DataBase`)
    }

  }
}

export async function getAllItens(): Promise<AcervoItem[]> {
  const itens: AcervoItem[] = await AppDataSource.getRepository(AcervoItem).find();
  if (itens.length === 0) {
    throw new NotFoundError("No items found");
  }
  return itens;
}

export async function getItemById(id: number): Promise<AcervoItem> {
  const item: AcervoItem | null = await AppDataSource.getRepository(AcervoItem).findOneBy({ id: id });
  if (!item) {
    throw new NotFoundError("No item found");
  }
  return item;
}

export async function updateItem(id: number, updatedItem: AcervoItem): Promise<void> {
  const itemDB = await AppDataSource.getRepository(AcervoItem).findOneBy({ id: id, });

  if (!itemDB) {
    throw new NotFoundError("No item found");
  }

  AppDataSource.getRepository(AcervoItem).merge(itemDB, updatedItem);
  await AppDataSource.getRepository(AcervoItem).save(itemDB);
}

export async function deleteItemById(id: number): Promise<void> {
  await getItemById(id);
  await AppDataSource.getRepository(AcervoItem).delete(id);
}