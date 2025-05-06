import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Author } from "@/classes/Author.js";
import { deleteAuthorById, getAllAuthors, getAuthorById, insertAuthor, updateAuthor } from "@/models/AuthorModel.js";

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
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar Autores" });
  }
}

export async function getAuthorByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const Author = await getAuthorById(id);

    res.status(200).json(Author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Id incorreto" });
  }
}

export async function updateAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedAuthor: Author = plainToInstance(Author, req.body as Author);
    const id = Number(req.params.id);

    await updateAuthor(id, updatedAuthor);
    res.status(200).send("Alterado Autor id: " + id);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function deleteAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteAuthorById(id);

    res.status(200).send("Author deletado id" + id);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}