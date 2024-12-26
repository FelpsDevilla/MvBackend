import express from "express";
import { DbConnection } from "./db/DbConnection.js";

const livros: string[] = [];

const app = express();
app.use(express.json());

const db = new DbConnection();

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.jas");
});

app.get("/acervo_itens", async (req, res) => {
    const json = await db.BuscarItem("*", "acervo_itens")
    res.status(200).json(json);
});

app.get("/usuarios", async (req, res) => {
    const json = await db.BuscarItem("*", "usuarios")
    res.status(200).json(json);
});

app.get("/livros_itens", async (req, res) => {
    const json = await db.BuscarItem("*", "livros_itens")
    res.status(200).json(json);
});

// app.post("/livros", (req,res) => {
    
//     res.status(201).send("Livro cadastrado com sucesso");
// });

// app.get("/livros/:id", (req, res) => {
//     // index = buscaLivro(req.params.id);
//     //res.status(200).json(livros[index])
// })

// app.put("/livros/:id", (req, res) =>{
//     //const index = buscaLivro(req.params.id);
//     //livros[index].titulo = req.body.titulo;
//     res.status(200).json(livros)
// })

// app.delete("/livros/:id", (req, res) => {
//     //const index = buscaLivro(req.params.id);
//     //livros.splice(index, 1)
//     res.status(200).send("Removido")
// })

export default app;