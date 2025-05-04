import { UserController } from "@/controllers/UserController.js";
import  express, { Router }  from "express";
import { AuthMiddleware } from "@/classes/AuthMiddleware.js";

const userRouter: Router = express.Router();
const url: string = "/user";

userRouter.post(url, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, UserController.insertUser);
userRouter.get(url, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, UserController.getAllUsers);
userRouter.get(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, UserController.getUserById);
userRouter.put(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, UserController.updateUser);
userRouter.delete(`${url}/:id`, AuthMiddleware.auth, AuthMiddleware.onlyAdmins, UserController.deleteUser);

export default userRouter;