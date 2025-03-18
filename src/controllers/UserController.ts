import { plainToInstance } from "class-transformer";
import { User } from "../classes/User.js";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

export class UserController {
  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const items = await UserModel.getAllItens();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await UserModel.getItemById(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }

  static async insertItem(req: Request, res: Response): Promise<void> {
    try {
      const item = plainToInstance(User, req.body);
      await UserModel.insertItem(item);
      res.status(201).json({ message: "Usuário adicionado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
  }

  static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updatedItem = plainToInstance(User, req.body);
      await UserModel.updateItem(id, updatedItem);
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await UserModel.deleteItemById(id);
      res.status(200).json({ message: "Usuário removido com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover usuário" });
    }
  }
}
