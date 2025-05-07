import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteAuthorRequest, getAllAuthorsRequest, getAuthorByIdRequest, insertAuthorRequest, updateAuthorRequest } from "@/controllers/AuthorsController.js";
import express, { Router } from "express";

export const authorRouter: Router = express.Router();
const url = "/authors";

authorRouter.use(auth);

authorRouter.post(url, insertAuthorRequest);
authorRouter.get(url, getAllAuthorsRequest);
authorRouter.get(`${url}/:id`, getAuthorByIdRequest);
authorRouter.put(`${url}/:id`, updateAuthorRequest);
authorRouter.delete(`${url}/:id`, onlyAdmins, deleteAuthorRequest);