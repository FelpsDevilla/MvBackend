import { AuthorController } from "../controllers/AuthorsController.js";
import  express, { Router }  from "express";

const authorRouter: Router = express.Router();
const url: string = "/authors";

authorRouter.post(url, AuthorController.insertItem);
authorRouter.get(url, AuthorController.getAllItens)
authorRouter.get(`${url}/:id`, AuthorController.getItemById)
authorRouter.put(`${url}/:id`, AuthorController.updateItem)
authorRouter.delete(`${url}/:id`, AuthorController.deleteItem)

export default authorRouter