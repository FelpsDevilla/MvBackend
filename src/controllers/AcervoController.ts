import { plainToInstance } from "class-transformer";
import { AcervoItem } from "../classes/AcervoItem.js";
import { Util } from "../classes/Util.js";
import { Request, Response } from "express";
import { AcervoModel } from "../models/AcervoModel.js";

export class AcervoController {
  static async getAllItens(req: Request, res: Response) {
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

  static async insertItem(req: Request, res: Response) {
    try {
      const item: AcervoItem = plainToInstance(AcervoItem, req.body as AcervoItem)

      const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item)      
      const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
      const values: string[]= filtredEntries.map(([_, value]) => value);

      const placeholders = Util.buildPlaceholders(values);

      console.log(columns.toString(), values, placeholders)
      await AcervoModel.insertItem(columns.toString(), placeholders, values);

      res.status(200).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const updatedItem: AcervoItem = plainToInstance(
        AcervoItem,
        req.body
      )[0];
      const id = Number(req.params.id);
      const values = Util.buildUpdateSetClause(updatedItem).values.toString();
      const setClause = Util.buildUpdateSetClause(updatedItem).setClause;
      await AcervoModel.updateItem(id, setClause, values);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AcervoModel.deleteItemById(id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
