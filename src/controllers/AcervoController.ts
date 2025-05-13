import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AcervoItem } from "@/classes/AcervoItem.js";
import { deleteItemById, getAllItens, getItemById, insertItem, updateItem } from "@/models/AcervoModel.js";
import { ForeignKeyConstraintError } from "@/Errors/ForeignKeyConstraintError";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: AcervoItem = plainToInstance(AcervoItem, req.body);
    item.imagePath = req.file?.filename as string;
    await insertItem(item);
    res.status(200).send("Adcionado!");
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).send(error.message);
    }
  }
}

export async function getAllItensRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItens();
    res.status(200).json(items);
  } catch (error) {
    if (error instanceof NotFoundError) {
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
    if (error instanceof NotFoundError) {
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}


export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: AcervoItem = plainToInstance(AcervoItem, req.body as AcervoItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).send("Alterado!");
  } catch (error) {
    if (error instanceof NotFoundError) {
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
    res.status(200).send("Excluido!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
