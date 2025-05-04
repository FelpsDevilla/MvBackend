import { AuthMiddleware } from "@/classes/AuthMiddleware";
import { AcervoController } from "@/controllers/AcervoController.js";
import  express, { Router }  from "express";

const acervoRouter: Router = express.Router();
const url: string = "/acervo";

acervoRouter.post(url, AuthMiddleware.auth, AcervoController.insertItem);
acervoRouter.get(url, AcervoController.getAllItens);
acervoRouter.get(`${url}/:id`, AuthMiddleware.auth, AcervoController.getItemById);
acervoRouter.put(`${url}/:id`, AuthMiddleware.auth, AcervoController.updateItem);
acervoRouter.delete(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, AcervoController.deleteItem);

export default acervoRouter;