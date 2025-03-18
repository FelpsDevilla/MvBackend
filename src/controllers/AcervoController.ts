import { plainToInstance } from "class-transformer";
import { AcervoItem } from "../classes/AcervoItem.js";
import { Request, Response } from "express";
import { AcervoModel } from "../models/AcervoModel.js";

export class AcervoController {
  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const items = await AcervoModel.getAllItens();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await AcervoModel.getItemById(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item: AcervoItem = plainToInstance(AcervoItem, req.body as AcervoItem)
      await AcervoModel.insertItem(item);
      res.status(200).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: AcervoItem = plainToInstance(AcervoItem, req.body as AcervoItem);
      const id = Number(req.params.id);
      await AcervoModel.updateItem(id, updatedItem);
      res.status(200).send("Item Atualizado!")
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      console.log(id)
      await AcervoModel.deleteItemById(id);
      res.status(200).send("Item deletado!")
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
