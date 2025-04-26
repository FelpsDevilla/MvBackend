import { UserController } from "../controllers/UserController.js";
import  express, { Router }  from "express";

const userRouter: Router = express.Router();
const url: string = "/user";

userRouter.post(url, UserController.insertUser);
userRouter.get(url, UserController.getAllItens)
userRouter.get(`${url}/:id`, UserController.getUserById)
userRouter.put(`${url}/:id`, UserController.updateUser)
userRouter.delete(`${url}/:id`, UserController.deleteUser)

export default userRouter