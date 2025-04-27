import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { LivrariaItem } from "@/classes/LivrariaItem.js";
import { LivrariaModel } from "@/models/LivrariaModel.js";

export class LivrariaController {

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
      await LivrariaModel.insertItem(item);

      res.status(201).send("Adcionado item!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const items = await LivrariaModel.getAllItens();
      
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await LivrariaModel.getItemById(id);

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }


  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
      const id = Number(req.params.id);

      await LivrariaModel.updateItem(id, updatedItem);
      res.status(200).send("Alterado Item id: " + id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await LivrariaModel.deleteItemById(id);
      res.status(200).send("Item deletado!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}