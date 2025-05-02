import { User } from "@/classes/User";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthControler {

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const ACCESS_TOKEN_SECRET: string = process.env.JWT_SECRET as string;
            const REFRESH_TOKEN_SECRET: string = process.env.JWT_SECRET_REFRESH as string;

            const userReq: User = plainToInstance(User, req.body as User);
            const userdb: User = await UserModel.getUserBycpf(userReq.cpf);

            if (!userdb) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return
            }

            const isPasswordValid: Boolean = await bcrypt.compare(userReq.getPassword(), userdb.getPassword())

            if (!isPasswordValid) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return
            }

            const accessToken = jwt.sign({ userId: userdb.id, isAdmin: userdb.isAdmin }, ACCESS_TOKEN_SECRET, { expiresIn: "15min" });
            const refreshToken = jwt.sign({ userId: userdb.id, isAdmin: userdb.isAdmin }, REFRESH_TOKEN_SECRET, { expiresIn: "15min" });

            res.status(200)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            
            res.json({ auth: true, token: accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro de login", message: error });
        }
    }

    static async testeJWT(req: Request, res: Response): Promise<void> { //Func criada apenas para ver como manipular o token jtw
        try {
            const jwtSecret: string = process.env.JWT_SECRET as string;
            const token: string = req.headers["x-acess-token"] as string;
            const decodedToken = jwt.verify(token, jwtSecret)
            console.log(decodedToken)
            res.status(200).send(decodedToken)
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError){
                switch (error.name) {
                    case "TokenExpiredError":
                        res.status(401)
                        break;
                
                    case "JsonWebTokenError":
                        res.status(400)
                        break;
                }
                res.send(error)
            }
        }
    }

}