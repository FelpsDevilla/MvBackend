import { User } from "@/classes/User";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthControler {

    static async login(req: Request, res: Response): Promise<void>{
        try{
            const jwtSecret: string = process.env.JWT_SECRET as string;
            const userReq: User = plainToInstance(User, req.body as User);
            const userdb: User = await UserModel.getUserBycpf(userReq.cpf);

            if(!userdb){
                res.status(401).json({ message: 'Credenciais inválidas' });
                return
            }
            
            const isPasswordValid: Boolean = await bcrypt.compare(userReq.getPassword(), userdb.getPassword())

            if(!isPasswordValid){
                res.status(401).json({ message: 'Credenciais inválidas' });
                return
            }

            const token = jwt.sign({userId: userdb.id, isAdmin: userdb.isAdmin}, jwtSecret, { expiresIn: 300 });

            res.status(200).json({auth: true, token: token});
        }catch(error){
            console.error(error);
            res.status(500).json({ error: "Erro de login", message: error });
        }
    }

    static async testeJWT(req: Request, res: Response): Promise<void>{ //Func criada apenas para ver como manipular o token jtw
        try{
            const jwtSecret: string = process.env.JWT_SECRET as string;
            const token: string = req.headers["x-acess-token"] as string;
            const decodedToken = jwt.verify(token, jwtSecret)
            console.log(decodedToken)
            res.status(200).end()
        }catch(error){
            res.status(500).send(error)
        }
    }

}