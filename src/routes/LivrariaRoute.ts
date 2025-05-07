import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LivrariaController.js";
import  express, { Router }  from "express";

export const livrariaRouter: Router = express.Router();
const url = "/livraria";

livrariaRouter.use(`${url}/book` , express.static("public/data/uploads/livraria/booksPDF"));
livrariaRouter.use(`${url}/images` , express.static("public/data/uploads/livraria/images"));

livrariaRouter.post(url, auth,insertItemRequest);
livrariaRouter.get(url, getAllItensRequest);
livrariaRouter.get(`${url}/:id`, auth, getItemByIdRequest);
livrariaRouter.put(`${url}/:id`, auth, updateItemRequest);
livrariaRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);