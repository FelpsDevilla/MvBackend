import { AcervoController } from "../controllers/AcervoController.js";
import  express, { Router }  from "express";

const acervoRouter: Router = express.Router();
const url: string = "/acervo";

acervoRouter.post(url, AcervoController.insertItem);
acervoRouter.get(url, AcervoController.getAllItens)
acervoRouter.get(`${url}/:id`, AcervoController.getItemById)
acervoRouter.put(`${url}/:id`, AcervoController.updateItem)
acervoRouter.delete(`${url}/:id`, AcervoController.deleteItem)

export default acervoRouter