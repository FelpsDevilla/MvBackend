import { CollectionController } from "../controllers/CollectionController.js";
import  express, { Router }  from "express";

const collectionRouter: Router = express.Router();
const url: string = "/collection";

collectionRouter.post(url, CollectionController.insertCollection);
collectionRouter.get(url, CollectionController.getAllCollections)
collectionRouter.get(`${url}/:id`, CollectionController.getCollectionById)
collectionRouter.put(`${url}/:id`, CollectionController.updateCollection)
collectionRouter.delete(`${url}/:id`, CollectionController.deleteCollection)

export default collectionRouter