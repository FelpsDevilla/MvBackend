import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/classes/User";
import { getUserById } from "@/models/UserModel";

const headerToken = "x-access-token";

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
        const accessToken: string = req.headers[headerToken] as string;

        if (accessToken == "" || accessToken == undefined) {
            res.status(401).send('Token não informado');
            return
        }

        jwt.verify(accessToken, ACCESS_SECRET);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send('Token inválido ou expirado.');
            return
        }
        res.status(500).send('Erro inesperado na autenticação: ' + error);
        return
    }
}

export async function onlyAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const accessToken: string = req.headers[headerToken] as string;
        const payload: JwtPayload = jwt.decode(accessToken) as JwtPayload;
        const user: User = await getUserById(payload.userId);

        if (!user.isAdmin) {
            res.status(401).send('Usuário sem permissão');
            return
        }

        next();
    } catch (error) {
        res.status(500).send("Erro de Middleware: " + error);
    }
}