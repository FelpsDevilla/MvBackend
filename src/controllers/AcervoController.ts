import { plainToInstance } from "class-transformer";
import { acervo_item } from "classes/acervo_item";
import { uteis } from "classes/uteis";
import { Request, Response } from "express";
import { AcervoModel } from "models/AcervoModel";

export class AcervoController {

  static async getAllItens(req: Request, res: Response) {
    try {
      const items = await AcervoModel.getAllItens();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" })
    }
  }

  static async getItemByID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const item = await AcervoModel.getItemById(id);
      if (!item) return res.status(404).json({ error: "Item não encontrado" });

      return res.json(item)
    } catch (error) {
      res.status(500).json({ error: "Id Invalido" })
    }
  }

  static async insertItem(req: Request, res: Response) {
    try {
      const item = plainToInstance(acervo_item, req.body)[0];
      const columns = uteis.objectKeysToDbColumns(item);
      const values = Object.values(item)
      const placeholders = uteis.buildPlaceholders(values)
      await AcervoModel.insertItem(columns.toString(), placeholders, values)

      res.status(200).send("Adcionado ");
    } catch (error) {
      console.error(error)
      res.status(500).send("Error")
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const updatedItem: acervo_item = plainToInstance(acervo_item, req.body)[0];
      const id = Number(req.params.id)
      const values = (uteis.buildUpdateSetClause(updatedItem)).values.toString()
      const setClause = (uteis.buildUpdateSetClause(updatedItem)).setClause
      await AcervoModel.updateItem(id, setClause, values)
    } catch (error) {
      console.error(error)
      res.status(500).send("Error")
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await AcervoModel.deleteItemById(id)
    } catch (error) {
      console.error(error)
      res.status(500).send("Error")
    }
  }

}