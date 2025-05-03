import { User } from "@/classes/User";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthControler {

    private static readonly ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    private static readonly REFRESH_SECRET: jwt.Secret = process.env.JWT_SECRET_REFRESH as jwt.Secret;

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const userReq: User = plainToInstance(User, req.body as User);
            const userdb: User = await UserModel.getUserBycpf(userReq.cpf);

            const isPasswordValid: boolean = await bcrypt.compare(userReq.getPassword(), userdb.getPassword())

            if (!isPasswordValid) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return
            }

            if (!userdb.isActive) {
                res.status(401).json({ message: 'Usuário Inativo, favor entrar em contato com Administrador do Sistema' });
                return
            }

            const accessToken = jwt.sign({ userId: userdb.id, isAdmin: userdb.isAdmin }, this.ACCESS_SECRET, { expiresIn: "15min" });
            const refreshToken = jwt.sign({ userId: userdb.id, isAdmin: userdb.isAdmin }, this.REFRESH_SECRET, { expiresIn: "7d" });

            res
                .status(200)
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .json({token: accessToken });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                res.status(500).json({ error: "Erro de login", message: error.message });
            }
        }
    }

    static async auth(req: Request, res: Response): Promise<void> {
        try {
            const accessToken = req.headers["x-acess-token"] as string;

            jwt.verify(accessToken, this.ACCESS_SECRET, (error, decoded) => {
                if (error instanceof jwt.JsonWebTokenError && error.name === "TokenExpiredError") {
                    const refreshToken = req.cookies.refreshToken;

                    const payload: jwt.JwtPayload = jwt.verify(refreshToken, this.REFRESH_SECRET) as jwt.JwtPayload;
                    const newAcessToken = jwt.sign(payload, this.ACCESS_SECRET, { expiresIn: "15min" })
                    res.status(200).json({token: newAcessToken })

                }
            });
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                switch (error.name) {
                    case "TokenExpiredError":
                        res.status(401)
                        break;

                    case "JsonWebTokenError":
                        res.status(400)
                        break;
                }
                res.send(error).end()
            }
            res.status(500).send(error)
        }
    };
}