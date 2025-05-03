import { AuthMiddleware } from "@/classes/AuthMiddleware.js";
import { LivrariaController } from "@/controllers/LivrariaController.js";
import  express, { Router }  from "express";

const livrariaRouter: Router = express.Router();
const url: string = "/livraria";

livrariaRouter.post(url, AuthMiddleware.auth,LivrariaController.insertItem);
livrariaRouter.get(url, LivrariaController.getAllItens);
livrariaRouter.get(`${url}/:id`, AuthMiddleware.auth,LivrariaController.getItemById);
livrariaRouter.put(`${url}/:id`, AuthMiddleware.auth,LivrariaController.updateItem);
livrariaRouter.delete(`${url}/:id`, AuthMiddleware.auth,LivrariaController.deleteItem);

export default livrariaRouter;