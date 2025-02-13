import { UserController } from "../controllers/UserController.js";
import  express, { Router }  from "express";

const userRouter: Router = express.Router();
const url: string = "/user";

userRouter.post(url, UserController.insertItem);
userRouter.get(url, UserController.getAllItens)
userRouter.get(`${url}/:id`, UserController.getItemById)
userRouter.put(`${url}/:id`, UserController.updateItem)
userRouter.delete(`${url}/:id`, UserController.deleteItem)

export default userRouter