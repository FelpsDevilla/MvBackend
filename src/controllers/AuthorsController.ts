import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Author } from "@/classes/Author.js";
import { deleteAuthorById, getAllAuthors, getAuthorById, insertAuthor, updateAuthor } from "@/models/AuthorModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertAuthorRequest(req: Request, res: Response) {
  try {
    const author: Author = plainToInstance(Author, req.body as Author);
    await insertAuthor(author);

    res.status(201).send("Adcionado Autor!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getAllAuthorsRequest(_: Request, res: Response): Promise<void> {
  try {
    const Authors = await getAllAuthors();

    res.status(200).json(Authors);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}

export async function getAuthorByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const Author = await getAuthorById(id);

    res.status(200).json(Author);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}

export async function updateAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedAuthor: Author = plainToInstance(Author, req.body as Author);
    const id = Number(req.params.id);

    await updateAuthor(id, updatedAuthor);
    res.status(200).send("Alterado Autor id " + id);
  } catch (error) {
    if(error instanceof NotFoundError){
      res.status(400).send(error.message);
      return
    }
    res.status(500).send("Unknow Error");
  }
}

export async function deleteAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteAuthorById(id);

    res.status(200).send("Author deletado id " + id);
  } catch (error) {
    if(error instanceof NotFoundError){
          res.status(400).send(error.message);
          return
        }
        res.status(500).send("Unknow Error");
  }
}