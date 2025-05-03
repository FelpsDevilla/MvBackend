import { AuthControler } from "@/controllers/AuthController.js";
import  express, { Router }  from "express";

const authRouter: Router = express.Router();

authRouter.post("/login", AuthControler.login);
authRouter.post("/refresh", AuthControler.refresh);

export default authRouter;