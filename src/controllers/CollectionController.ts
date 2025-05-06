import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Collection } from "@/classes/Collection.js";
import { deleteCollectionById, getAllCollections, getCollectionById, insertCollection, updateCollection } from "@/models/CollectionModel.js";

export async function insertCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const collection: Collection = plainToInstance(Collection, req.body as Collection);
    await insertCollection(collection);

    res.status(201).send("Adcionado ");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getAllCollectionsRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllCollections();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
}

export async function getCollectionByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getCollectionById(id);

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Id incorreto" });
  }
}


export async function updateCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedCollection: Collection = plainToInstance(Collection, req.body as Collection);
    const id = Number(req.params.id);

    await updateCollection(id, updatedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function deleteCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteCollectionById(id);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
