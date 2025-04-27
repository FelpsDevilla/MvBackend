import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Collection } from "@/classes/Collection.js";
import { CollectionModel } from "@/models/CollectionModel.js";

export class CollectionController {

  static async insertCollection(req: Request, res: Response): Promise<void> {
    try {
      const collection: Collection = plainToInstance(Collection, req.body as Collection);
      await CollectionModel.insertCollection(collection);

      res.status(201).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

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


  static async updateCollection(req: Request, res: Response): Promise<void> {
    try {
      const updatedCollection: Collection = plainToInstance(Collection, req.body as Collection);
      const id = Number(req.params.id);
 
      await CollectionModel.updateCollection(id, updatedCollection);
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
