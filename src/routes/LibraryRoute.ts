import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItemsRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LibraryController.js";
import express, { Router } from "express";
import { imageVerifyMiddleware } from "@/middlewares/FileTypes/imageVerifyMiddleware";
import { pdfVerifyMiddleware } from "@/middlewares/FileTypes/pdfVerifyMiddleware";
import { libraryUploadBook, libraryUploadImage } from "@/middlewares/uploads/LibraryUpload";
import { config } from "@/config";

export const libraryRouter: Router = express.Router();
const url = "/library";

libraryRouter.use(`${url}/book`, pdfVerifyMiddleware, express.static(config.filesPath.libraryBooks));
libraryRouter.use(`${url}/images`, imageVerifyMiddleware, express.static(config.filesPath.libraryImages));

libraryRouter.post(
    url, auth,
    libraryUploadImage.single("image"), imageVerifyMiddleware,
    libraryUploadBook.single("book"), pdfVerifyMiddleware,
    insertItemRequest
);

libraryRouter.get(url, getAllItemsRequest);
libraryRouter.get(`${url}/:id`, auth, getItemByIdRequest);
libraryRouter.put(`${url}/:id`, auth, updateItemRequest);
libraryRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);