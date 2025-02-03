import express from "express";
import { DbConnection } from "../db/DbConnection.js";
import { acervo_item } from "../classes/acervo_item.js";
import { plainToInstance } from "class-transformer";


const app = express();
const endpoints = [
  { endpoint: "/acervo_itens", table: "acervo_table" },
  { endpoint: "/livraria_itens", table: "livraria_table" },
  { endpoint: "/authors", table: "authors_table" },
  { endpoint: "/collectons", table: "collections_table" },
  { endpoint: "/users", table: "users_table" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// #region CRUD Acervo_Itens
app.post(endpoints[0].endpoint, async (req, res) => {

  try {
    const db = new DbConnection();
    const item: acervo_item = req.body;

    await db.insert(endpoints[0].table, item);
    res.status(200).send("Adcionado ");
  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
});

app.get(`${endpoints[0].endpoint}`, async (req, res) => {
  try {
    const db = new DbConnection();
    const json = await db.select(endpoints[0].table, '*');
    res.status(200).json(json);
  } catch (error) {
    res.status(400);
  }


});

app.get(`${endpoints[0].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const json = await db.select(endpoints[0].table, '*', [`ID = ${req.params.id}`]);

  //adcionar validacao caso string vier vazia

  res.status(200).json(json);
});

app.put(`${endpoints[0].endpoint}/:id`, async (req, res) => {
    
  const updatedItem: acervo_item | acervo_item[] = plainToInstance(acervo_item, req.body);
  const db = new DbConnection();
  await db.update(endpoints[0].table, updatedItem, req.params.id);

  res.status(200).json();
});

app.delete(`${endpoints[0].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const index = req.params.id;
  await db.delete(endpoints[0].table, req.params.id);
  res.status(200).send("Deleted");
});

export default app
