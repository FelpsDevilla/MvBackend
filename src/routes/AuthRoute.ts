import { AuthControler } from "@/controllers/AuthController.js";
import  express, { Router }  from "express";

const authRouter: Router = express.Router();
const url: string = "/login";

authRouter.post(url, AuthControler.login);
authRouter.get(url, AuthControler.testeJWT)

export default authRouter;