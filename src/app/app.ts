import express from "express";
import { DbConnection } from "../db/DbConnection.js";
import { acervo_item } from "classes/acervo_item.js";

const app = express();
const db = new DbConnection();
const endpoints = [
    { endpoint: "/acervo_itens", table: "acervo_table" },
    { endpoint: "/livraria_itens", table: "livraria_table" },
    { endpoint: "/authors", table: "authors_table" },
    { endpoint: "/collectons", table: "collections_table" },
    { endpoint: "/users", table: "users_table" },
  ];

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200);
});

// #region CRUD Acervo_Itens
app.post(endpoints[0].endpoint, async(req, res) =>{
    const item: acervo_item = req.body;
    db.Create(
        endpoints[0].table, 
        //Prencher parametros do acervo-item
    )
});

app.get(`${endpoints[0].endpoint}/:id`, async (req, res) => {
    const json = await db.Read("*", endpoints[0].table)
    res.status(200).json(json);
});

app.get(`${endpoints[0].endpoint}/:id`, async (req, res) => {
    const json = await db.Read(req.params.id, endpoints[0].table)
    res.status(200).json(json);
});

app.put(`${endpoints[0].endpoint}/:id`, async (req, res) => {
    const json = await db.Read(req.params.id, endpoints[0].table)
    res.status(200).json(json);
});

app.delete(`${endpoints[0].endpoint}/:id`, async (req, res) => {
        const index = (req.params.id);
        //Adcionar validação
        await db.Delete(endpoints[0].table, `WHERE ID = ${req.params.id}`)
        res.status(200).send("Deleted")
});


export default app;