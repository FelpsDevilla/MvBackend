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

            const token = jwt.sign({userId: userdb.id}, jwtSecret, { expiresIn: 300 });

            res.status(200).send(token);
        }catch(error){
            console.error(error);
            res.status(500).json({ error: "Erro de login", message: error });
        }
    }
}