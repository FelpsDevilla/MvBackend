import { AuthorController } from "../controllers/AuthorsController.js";
import  express, { Router }  from "express";

const authorRouter: Router = express.Router();
const url: string = "/authors";

authorRouter.post(url, AuthorController.insertAuthor);
authorRouter.get(url, AuthorController.getAllAuthors)
authorRouter.get(`${url}/:id`, AuthorController.getAuthorById)
authorRouter.put(`${url}/:id`, AuthorController.updateAuthor)
authorRouter.delete(`${url}/:id`, AuthorController.deleteAuthor)

export default authorRouter