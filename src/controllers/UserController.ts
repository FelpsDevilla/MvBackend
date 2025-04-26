import { plainToInstance } from "class-transformer";
import { User } from "../classes/User.js";
import { Util } from "../classes/Util.js";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

export class UserController {
  static async getAllItens(req: Request, res: Response) {
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

  static async insertUser(req: Request, res: Response) {
    try {
      const user = plainToInstance(User, req.body as User);
      const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(user)    
      const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
      const values: string[]= filtredEntries.map(([_, value]) => value);
      const placeholders = Util.buildPlaceholders(values);

      await UserModel.insertUser(columns.toString(), placeholders, values);

      res.status(201).send("Adcionado ");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const updatedUser: User = plainToInstance(
        User,
        req.body
      );
      const id = Number(req.params.id);
      const values: string[] = Util.buildUpdateSetClause(updatedUser).values;
      const setClause: string = Util.buildUpdateSetClause(updatedUser).setClause;
      console.log(values, setClause)
      await UserModel.updateUser(id, setClause, values);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await UserModel.deleteUserById(id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
