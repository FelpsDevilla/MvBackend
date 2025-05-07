import { LivrariaItem } from "@/classes/LivrariaItem.js";
import { AppDataSource } from "@/db/data-source";

export async function insertItem(item: LivrariaItem): Promise<void> {
  const itemDb = AppDataSource.getRepository(LivrariaItem).create(item);
  await AppDataSource.getRepository(LivrariaItem).save(itemDb);
};


export async function getAllItens(): Promise<LivrariaItem[]> {
    const books: LivrariaItem[] = await AppDataSource.getRepository(LivrariaItem).find();
    if (books.length === 0) {
      throw Error("No items found");
    }
    return books;
}

export async function getItemById(id: number): Promise<LivrariaItem> {
    const book: LivrariaItem | null = await AppDataSource.getRepository(LivrariaItem).findOneBy({ id: id });
      if (!book) {
        throw Error("No book found");
      }
      return book;
}

export async function updateItem(id: number, updatedItem: LivrariaItem): Promise<void> {
  const bookDb = await AppDataSource.getRepository(LivrariaItem).findOneBy({ id: id, });

  if (!bookDb) {
    throw Error("No book found");
  }

  AppDataSource.getRepository(LivrariaItem).merge(bookDb, updatedItem);
  await AppDataSource.getRepository(LivrariaItem).save(bookDb);
}

export async function deleteItemById(id: number): Promise<void> {
  await AppDataSource.getRepository(LivrariaItem).delete(id);
}