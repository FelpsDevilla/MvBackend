import { plainToInstance } from "class-transformer";
import { Author } from "../classes/Author.js";
import { Util } from "../classes/Util.js";
import { Request, Response } from "express";
import { AuthorModel } from "../models/AuthorModel.js";

export class AuthorController {
  static async getAllItens(req: Request, res: Response) {
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

  static async insertItem(req: Request, res: Response) {
    try {
      // const item = plainToInstance(Author, req.body);
      // const columns = Util.objectKeysToDbColumns(item);
      // const values = Object.values(item);
      // const placeholders = Util.buildPlaceholders(values);
      // await AuthorModel.insertItem(columns.toString(), placeholders, values);

      // res.status(200).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const updatedItem: Author = plainToInstance(
        Author,
        req.body
      );
      const id = Number(req.params.id);
      const values = Util.buildUpdateSetClause(updatedItem).values.toString();
      const setClause = Util.buildUpdateSetClause(updatedItem).setClause;
      await AuthorModel.updateItem(id, setClause, values);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AuthorModel.deleteItemById(id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
