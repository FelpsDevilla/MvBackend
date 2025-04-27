import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { User } from "@/classes/User.js";
import { UserModel } from "@/models/UserModel.js";

export class UserController {

  static async insertUser(req: Request, res: Response): Promise<void> {
    try {
      const user = plainToInstance(User, req.body as User);
      await UserModel.insertUser(user);

      res.status(201).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
  }

  static async getAllItens(req: Request, res: Response): Promise<void> {
    try {
      const Users = await UserModel.getAllUsers();
      
      res.status(200).json(Users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const User = await UserModel.getUserById(id);

      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }


  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser: User = plainToInstance(User, req.body as User);
      const id = Number(req.params.id);

      await UserModel.updateUser(id, updatedUser);
      res.status(200).send("Alterado item id " + id);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await UserModel.deleteUserById(id);
      res.status(200).json({ message: "Usuário removido com sucesso id " + id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover usuário" });
    }
  }
}
