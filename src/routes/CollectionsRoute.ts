import { CollectionController } from "../controllers/CollectionController.js";
import  express, { Router }  from "express";

const collectionRouter: Router = express.Router();
const url: string = "/collection";

collectionRouter.post(url, CollectionController.insertItem);
collectionRouter.get(url, CollectionController.getAllItens)
collectionRouter.get(`${url}/:id`, CollectionController.getItemById)
collectionRouter.put(`${url}/:id`, CollectionController.updateItem)
collectionRouter.delete(`${url}/:id`, CollectionController.deleteItem)

export default collectionRouter