import { UserController } from "@/controllers/UserController.js";
import  express, { Router }  from "express";
import { AuthMiddleware } from "@/classes/AuthMiddleware.js";

const userRouter: Router = express.Router();
const url: string = "/user";

userRouter.post(url, AuthMiddleware.auth ,UserController.insertUser);
userRouter.get(url, UserController.getAllUsers);
userRouter.get(`${url}/:id`, AuthMiddleware.auth, UserController.getUserById);
userRouter.put(`${url}/:id`, AuthMiddleware.auth,UserController.updateUser);
userRouter.delete(`${url}/:id`, AuthMiddleware.auth, UserController.deleteUser);

export default userRouter;