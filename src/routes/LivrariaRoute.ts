import { LivrariaController } from "../controllers/LivrariaController.js";
import  express, { Router }  from "express";

const livrariaRouter: Router = express.Router();
const url: string = "/livraria";

livrariaRouter.post(url, LivrariaController.insertItem);
livrariaRouter.get(url, LivrariaController.getAllItens)
livrariaRouter.get(`${url}/:id`, LivrariaController.getItemById)
livrariaRouter.put(`${url}/:id`, LivrariaController.updateItem)
livrariaRouter.delete(`${url}/:id`, LivrariaController.deleteItem)

export default livrariaRouter