import { AuthMiddleware } from "@/classes/AuthMiddleware";
import { AcervoController } from "@/controllers/AcervoController.js";
import  express, { Router }  from "express";
import multer from "multer"
import fs from "fs";

const acervoRouter: Router = express.Router();
const storagePath: string = "public/data/uploads/acervo";
const url: string = "/acervo";

const upload: multer.Multer = multer({dest: storagePath});

acervoRouter.post(url, AuthMiddleware.auth, AcervoController.insertItem);
acervoRouter.post(`${url}/image`, AuthMiddleware.auth, upload.single("image"));
acervoRouter.get(url, AcervoController.getAllItens);
acervoRouter.get(`${url}/:id`, AuthMiddleware.auth, AcervoController.getItemById);
acervoRouter.put(`${url}/:id`, AuthMiddleware.auth, AcervoController.updateItem);
acervoRouter.delete(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, AcervoController.deleteItem);

export default acervoRouter;