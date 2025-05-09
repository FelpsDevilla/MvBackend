import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LivrariaController.js";
import express, { Router } from "express";
import { imageVerifyMiddleware } from "@/middlewares/uploads/imageVerifyMiddleware";
import { pdfVerifyMiddleware } from "@/middlewares/uploads/pdfVerifyMiddleware";
import { LivrariaUploadBook, LivrariaUploadImage } from "@/middlewares/uploads/livrariaUpload";

export const livrariaRouter: Router = express.Router();
const url = "/livraria";

livrariaRouter.use(`${url}/book`, pdfVerifyMiddleware, express.static("public/data/uploads/livraria/booksPDF"));
livrariaRouter.use(`${url}/images`, imageVerifyMiddleware, express.static("public/data/uploads/livraria/images"));

livrariaRouter.post(
    url, auth,
    LivrariaUploadImage.single("image"), imageVerifyMiddleware,
    LivrariaUploadBook.single("book"), pdfVerifyMiddleware,
    insertItemRequest
);

livrariaRouter.get(url, getAllItensRequest);
livrariaRouter.get(`${url}/:id`, auth, getItemByIdRequest);
livrariaRouter.put(`${url}/:id`, auth, updateItemRequest);
livrariaRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);