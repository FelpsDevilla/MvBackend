import { plainToInstance } from "class-transformer";
import { Author } from "../classes/Author.js";
import { Util } from "../classes/Util.js";
import { Request, Response } from "express";
import { AuthorModel } from "../models/AuthorModel.js";

export class AuthorController {
  static async getAllAuthors(req: Request, res: Response) {
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

  static async insertAuthor(req: Request, res: Response) {
    try {
      const author: Author = plainToInstance(Author, req.body as Author);
      const filtredEntries: [string, any][] = Util.getNonUndefinedEntries(author)
      const columns: string[] = Util.objectKeysToDbColumns(filtredEntries);
      const values: string[] = filtredEntries.map(([_, value]) => value);
      const placeholders = Util.buildPlaceholders(values);

      await AuthorModel.insertAuthor(columns.toString(), placeholders, values);
      res.status(201).send("Adcionado Autor!");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async updateAuthor(req: Request, res: Response) {
    try {
      const updatedItem: Author = plainToInstance(Author, req.body as Author);
      const id = Number(req.params.id);
      const values: string[] = Util.buildUpdateSetClause(updatedItem).values;
      const setClause: string = Util.buildUpdateSetClause(updatedItem).setClause;

      await AuthorModel.updateAuthor(id, setClause, values);
      res.status(200).send("Alterado Autor id: " + id);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  static async deleteAuthor(req: Request, res: Response) {
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
