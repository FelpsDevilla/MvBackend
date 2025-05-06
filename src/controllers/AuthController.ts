import { User } from "@/classes/User";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { getUserBycpf, getUserById } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const REFRESH_SECRET: jwt.Secret = process.env.JWT_SECRET_REFRESH as jwt.Secret;
        const ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
        const userReq: User = plainToInstance(User, req.body as User);
        const userDB: User = await getUserBycpf(userReq.cpf);

        const isPasswordValid: boolean = await bcrypt.compare(
            userReq.getPassword(),
            userDB.getPassword()
        );

        if (!isPasswordValid) {
            res.status(401).json({ message: "Credenciais inválidas" });
            return;
        }

        if (!userDB.isActive) {
            res.status(401).json({ message: "Usuário Inativo, favor entrar em contato com Administrador do Sistema" });
            return;
        }

        const accessToken = jwt.sign(
            { userId: userDB.id, userCpf: userDB.cpf, userName: userDB.name, isAdmin: userDB.isAdmin },
            ACCESS_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );
        const refreshToken = jwt.sign({ userId: userDB.id }, REFRESH_SECRET, {
            expiresIn: REFRESH_EXPIRES_IN,
        });

        res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({ token: accessToken });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: "Erro de login", message: error.message });
        }
    }
}

export async function refresh(req: Request, res: Response): Promise<void> {
    try {
        const ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
        const REFRESH_SECRET: jwt.Secret = process.env.JWT_SECRET_REFRESH as jwt.Secret;
        const token = req.cookies.refreshToken;

        const payload = jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload;
        const userDB: User = await getUserById(payload.userId);

        const newAccessToken = jwt.sign(
            { userId: userDB.id, userCpf: userDB.cpf, userName: userDB.name, isAdmin: userDB.isAdmin },
            ACCESS_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Token inválido ou expirado." });
        }
        res.status(500).send("Erro inesperado na autenticação: " + error);
    }
}
