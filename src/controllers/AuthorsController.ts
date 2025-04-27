import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Author } from "@/classes/Author.js";
import { AuthorModel } from "@/models/AuthorModel.js";

export class AuthorController {

  static async insertAuthor(req: Request, res: Response) {
    try {
      const author: Author = plainToInstance(Author, req.body as Author);
      await AuthorModel.insertAuthor(author);

      res.status(201).send("Adcionado Autor!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async getAllAuthors(req: Request, res: Response): Promise<void> {
    try {
      const Authors = await AuthorModel.getAllAuthors();

      res.status(200).json(Authors);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar Autores" });
    }
  }

  static async getAuthorById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const Author = await AuthorModel.getAuthorById(id);

      res.status(200).json(Author);
    } catch (error) {
      res.status(500).json({ error: "Id incorreto" });
    }
  }


  static async updateAuthor(req: Request, res: Response): Promise<void> {
    try {
      const updatedAuthor: Author = plainToInstance(Author, req.body as Author);
      const id = Number(req.params.id);

      await AuthorModel.updateAuthor(id, updatedAuthor);
      res.status(200).send("Alterado Autor id: " + id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteAuthor(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await AuthorModel.deleteAuthorById(id);

      res.status(200).send("Author deletado id" + id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}
