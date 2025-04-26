import { plainToInstance } from "class-transformer";
import { Collection } from "../classes/Collection.js";
import { Request, Response } from "express";
import { CollectionModel } from "../models/CollectionModel.js";

export class CollectionController {
  static async getAllCollections(req: Request, res: Response): Promise<void> {
    try {
      const items = await CollectionModel.getAllCollections();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getCollectionById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await CollectionModel.getCollectionById(id);

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }

  static async insertCollection(req: Request, res: Response): Promise<void> {
    try {
      const collection: Collection = plainToInstance(Collection, req.body as Collection)
      const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(collection)
      const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
      const values: string[] = filtredEntries.map(([_, value]) => value);
      const placeholders = Util.buildPlaceholders(values);

      await CollectionModel.insertCollection(columns.toString(), placeholders, values);
      res.status(201).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateCollection(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: Collection = plainToInstance(Collection, req.body as Collection);
      const id = Number(req.params.id);
      const values: string[] = Util.buildUpdateSetClause(updatedItem).values;
      const setClause: string = Util.buildUpdateSetClause(updatedItem).setClause;
      await CollectionModel.updateCollection(id, setClause, values);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteCollection(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await CollectionModel.deleteCollectionById(id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
