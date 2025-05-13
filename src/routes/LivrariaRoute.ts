import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LivrariaController.js";
import express, { Router } from "express";
import { imageVerifyMiddleware } from "@/middlewares/FileTypes/imageVerifyMiddleware";
import { pdfVerifyMiddleware } from "@/middlewares/FileTypes/pdfVerifyMiddleware";
import { livrariaUploadBook, livrariaUploadImage } from "@/middlewares/uploads/livrariaUpload";
import { config } from "@/config";

export const livrariaRouter: Router = express.Router();
const url = "/livraria";

livrariaRouter.use(`${url}/book`, pdfVerifyMiddleware, express.static(config.filesPath.LivrariaBooks));
livrariaRouter.use(`${url}/images`, imageVerifyMiddleware, express.static(config.filesPath.LivrariaImages));

livrariaRouter.post(
    url, auth,
    livrariaUploadImage.single("image"), imageVerifyMiddleware,
    // livrariaUploadBook.single("book"), pdfVerifyMiddleware,
    insertItemRequest
);

livrariaRouter.get(url, getAllItensRequest);
livrariaRouter.get(`${url}/:id`, auth, getItemByIdRequest);
livrariaRouter.put(`${url}/:id`, auth, updateItemRequest);
livrariaRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);