import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { LivrariaItem } from "@/classes/LivrariaItem.js";
import { deleteItemById, getAllItens, getItemById, insertItem, updateItem } from "@/models/LivrariaModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
    await insertItem(item);

    res.status(201).send("Adcionado item!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getAllItensRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItens();

    res.status(200).json(items);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}

export async function getItemByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);

    res.status(200).json(item);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}


export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: LivrariaItem = plainToInstance(LivrariaItem, req.body as LivrariaItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).send("Alterado Item id: " + id);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}

export async function deleteItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteItemById(id);
    res.status(200).send("Item deletado!");
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}
