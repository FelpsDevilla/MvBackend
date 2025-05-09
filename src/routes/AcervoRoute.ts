import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/AcervoController.js";
import express, { Router } from "express";
import { acervoUploadImages } from "@/middlewares/uploads/AcervoUpload.js";
import { imageVerifyMiddleware } from "@/middlewares/FileTypes/imageVerifyMiddleware";
import { config } from "@/config";

export const acervoRouter: Router = express.Router();
const url = "/acervo";

acervoRouter.use(`${url}/images`, express.static(config.filesPath.acervoImages));

acervoRouter.post(url, auth, acervoUploadImages.single("image"), imageVerifyMiddleware, insertItemRequest);
acervoRouter.get(url, getAllItensRequest);
acervoRouter.get(`${url}/:id`, auth, getItemByIdRequest);
acervoRouter.put(`${url}/:id`, auth, updateItemRequest);
acervoRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);