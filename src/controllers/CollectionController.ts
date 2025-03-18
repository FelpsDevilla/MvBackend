import { plainToInstance } from "class-transformer";
import { Collection } from "../classes/Collection.js";
import { Request, Response } from "express";
import { CollectionModel } from "../models/CollectionModel.js";

export class CollectionController {
  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const items = await CollectionModel.getAllItens();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await CollectionModel.getItemById(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item: Collection = plainToInstance(Collection, req.body as Collection);
      await CollectionModel.insertItem(item);
      res.status(200).send("Adicionado");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: Collection = plainToInstance(Collection, req.body as Collection);
      const id = Number(req.params.id);
      await CollectionModel.updateItem(id, updatedItem);
      res.status(200).send("Item Atualizado!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      console.log(id);
      await CollectionModel.deleteItemById(id);
      res.status(200).send("Item deletado!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
