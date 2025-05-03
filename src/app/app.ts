import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import acervoRouter from "@/routes/AcervoRoute.js";
import authorRouter from "@/routes/AuthorRoute.js";
import collectionRouter from "@/routes/CollectionsRoute.js";
import livrariaRouter from "@/routes/LivrariaRoute.js";
import userRouter from "@/routes/UsersRoute.js";
import authRouter from "@/routes/AuthRoute";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Allow cookies and credentials
}

))
const url = "/"

app.use(url, authRouter)
app.use(url, acervoRouter)
app.use(url, authorRouter)
app.use(url, collectionRouter)
app.use(url, livrariaRouter)
app.use(url, userRouter)

export default app
