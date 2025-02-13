import express from "express";
import acervoRouter from "../routes/AcervoRoute.js";
import authorRouter from "../routes/AuthorRoute.js";
import collectionRouter from "../routes/CollectionsRoute.js";
import livrariaRouter from "../routes/LivrariaRoute.js";
import userRouter from "../routes/UsersRoute.js";

const app = express();

app.use(express.json());

const url = "/"

app.use(url, acervoRouter)
app.use(url, authorRouter)
app.use(url, collectionRouter)
app.use(url, livrariaRouter)
app.use(url, userRouter)

export default app
