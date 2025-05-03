import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {


    static async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
            const accessToken = req.headers["x-access-token"] as string;
            jwt.verify(accessToken, ACCESS_SECRET);
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ message: 'Token inválido ou expirado.' });
            }
            res.status(500).send('Erro inesperado na autenticação: ' + error);
        }
    }
}