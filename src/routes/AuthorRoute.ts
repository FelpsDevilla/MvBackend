import { AuthMiddleware } from "@/classes/AuthMiddleware.js";
import { AuthorController } from "@/controllers/AuthorsController.js";
import  express, { Router }  from "express";

const authorRouter: Router = express.Router();
const url: string = "/authors";

authorRouter.post(url, AuthMiddleware.auth, AuthorController.insertAuthor);
authorRouter.get(url, AuthMiddleware.auth, AuthorController.getAllAuthors);
authorRouter.get(`${url}/:id`, AuthMiddleware.auth, AuthorController.getAuthorById);
authorRouter.put(`${url}/:id`, AuthMiddleware.auth, AuthorController.updateAuthor);
authorRouter.delete(`${url}/:id`, AuthMiddleware.auth, AuthorController.deleteAuthor);

export default authorRouter;