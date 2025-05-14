import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { LibraryItem } from "@/classes/LibraryItem.js";
import { deleteItemById, getAllItems, getItemById, insertItem, updateItem } from "@/models/LibraryModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: LibraryItem = plainToInstance(LibraryItem, req.body as LibraryItem);
    console.log(req.files);
    // item.imagePath = req.file?.filename as string;
    // item.bookPath = req.file?.fieldname as string;
    await insertItem(item);

    res.status(201).json({ message: "Library item created successfully." });
  } catch (error) {
    console.error("Insert Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllItemsRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Get All Library Items Error:", error);
    res.status(500).json({ message: "Failed to fetch library items." });
  }
}

export async function getItemByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);
    res.status(200).json(item);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get Library Item By ID Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: LibraryItem = plainToInstance(LibraryItem, req.body as LibraryItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).json({ message: `Library item with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Update Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteItemById(id);
    res.status(200).json({ message: `Library item with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}