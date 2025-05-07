import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/AcervoController.js";
import express, { Router } from "express";
import { acervoUpload } from "@/middlewares/upload/acervoUpload";

export const acervoRouter: Router = express.Router();
const url = "/acervo";

acervoRouter.use(`${url}/images` , express.static("public/data/uploads/acervo"));
acervoRouter.post(url,  acervoUpload.single("image"), insertItemRequest);
acervoRouter.get(url, getAllItensRequest);
acervoRouter.get(`${url}/:id`, auth, getItemByIdRequest);
acervoRouter.put(`${url}/:id`, auth, updateItemRequest);
acervoRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);