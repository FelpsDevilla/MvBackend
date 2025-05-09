import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItensRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LivrariaController.js";
import express, { Router } from "express";
import { imageVerifyMiddleware } from "@/middlewares/FileTypes/imageVerifyMiddleware";
import { config } from "@/config";
import { galleryUploadImages } from "@/middlewares/uploads/GalleryUpload";

export const GalleryRouter: Router = express.Router();
const url = "/livraria";

GalleryRouter.use(`${url}/images`, imageVerifyMiddleware, express.static(config.filesPath.galleryImages));

GalleryRouter.post(
    url, auth,
    galleryUploadImages.single("image"), imageVerifyMiddleware,
    insertItemRequest
);

GalleryRouter.get(url, getAllItensRequest);
GalleryRouter.get(`${url}/:id`, auth, getItemByIdRequest);
GalleryRouter.put(`${url}/:id`, auth, updateItemRequest);
GalleryRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);