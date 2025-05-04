import { AuthMiddleware } from "@/classes/AuthMiddleware.js";
import { CollectionController } from "@/controllers/CollectionController.js";
import  express, { Router }  from "express";

const collectionRouter: Router = express.Router();
const url: string = "/collection";

collectionRouter.post(url, AuthMiddleware.auth, CollectionController.insertCollection);;
collectionRouter.get(url, CollectionController.getAllCollections);
collectionRouter.get(`${url}/:id`, AuthMiddleware.auth, CollectionController.getCollectionById);
collectionRouter.put(`${url}/:id`, AuthMiddleware.auth, CollectionController.updateCollection);
collectionRouter.delete(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins,CollectionController.deleteCollection);

export default collectionRouter;