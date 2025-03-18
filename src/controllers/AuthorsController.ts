import { plainToInstance } from "class-transformer";
import { Author } from "../classes/Author.js";
import { Request, Response } from "express";
import { AuthorModel } from "../models/AuthorModel.js";

export class AuthorController {
  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const items = await AuthorModel.getAllItens();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await AuthorModel.getItemById(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item: Author = plainToInstance(Author, req.body as Author);
      await AuthorModel.insertItem(item);
      res.status(200).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: Author = plainToInstance(Author, req.body as Author);
      const id = Number(req.params.id);
      await AuthorModel.updateItem(id, updatedItem);
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
      await AuthorModel.deleteItemById(id);
      res.status(200).send("Item deletado!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
