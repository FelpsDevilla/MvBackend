import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { User } from "@/classes/User.js";
import { deleteUserById, getAllUsers, getUserById, insertUser, updateUser } from "@/models/UserModel.js";
import bcrypt from "bcryptjs";

export async function insertUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const user = plainToInstance(User, req.body as User);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.getPassword(), salt);
    user.setPassword(hash);
    await insertUser(user);

    res.status(201).send("Adcionado ");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar usuário" });
  }
}

export async function getAllUsersRequest(_: Request, res: Response): Promise<void> {
  try {
    const Users = await getAllUsers();

    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
}

export async function getUserByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const User = await getUserById(id);

    res.status(200).json(User);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Id incorreto" });
  }
}


export async function updateUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedUser: User = plainToInstance(User, req.body as User);
    const id = Number(req.params.id);

    await updateUser(id, updatedUser);
    res.status(200).send("Alterado item id " + id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}

export async function deleteUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteUserById(id);
    res.status(200).json({ message: "Usuário removido com sucesso id " + id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover usuário" });
  }
}
