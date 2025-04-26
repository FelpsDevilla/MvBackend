import { plainToInstance } from "class-transformer";
import { LivrariaItem } from "../classes/LivrariaItem.js";
import { Request, Response } from "express";
import { LivrariaModel } from "../models/LivrariaModel.js";

export class LivrariaController {
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

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem)
      const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(item)
      const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
      const values: string[] = filtredEntries.map(([_, value]) => value);
      const placeholders = Util.buildPlaceholders(values);

      await LivrariaModel.insertItem(columns.toString(), placeholders, values);
      res.status(201).send("Adcionado item!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
      const updatedItem: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
      const id = Number(req.params.id);
      const values: string[] = Util.buildUpdateSetClause(updatedItem).values;
      const setClause: string = Util.buildUpdateSetClause(updatedItem).setClause;

      await LivrariaModel.updateItem(id, setClause, values);
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