import { deleteUserRequest, getAllUsersRequest, getUserByIdRequest, insertUserRequest, updateUserRequest } from "@/controllers/UserController.js";
import  express, { Router }  from "express";
import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";

export const userRouter: Router = express.Router();
const url = "/user";

userRouter.use(auth);
userRouter.use(onlyAdmins);

userRouter.post(url, insertUserRequest);
userRouter.get(url, getAllUsersRequest);
userRouter.get(`${url}/:id`, getUserByIdRequest);
userRouter.put(`${url}/:id`, updateUserRequest);
userRouter.delete(`${url}/:id`, deleteUserRequest);