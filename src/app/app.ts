import express from "express";
import { DbConnection } from "../db/DbConnection.js";
import { acervo_item } from "../classes/acervo_item.js";
import { plainToInstance } from "class-transformer";
import { livraria_item } from "../classes/livraria_item.js";
import { authors } from "../classes/authors.js";


const app = express();
const endpoints = [
  { endpoint: "/acervo_itens", table: "acervo_table", class: acervo_item },
  { endpoint: "/livraria_itens", table: "livraria_table" },
  { endpoint: "/authors", table: "authors_table" },
  { endpoint: "/collections", table: "collections_table" },
  { endpoint: "/users", table: "users_table" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

//#endregion
//#region CRUD Livraria_Itens

app.post(endpoints[1].endpoint, async (req, res) => {

  try {
    const db = new DbConnection();
    const item: livraria_item = req.body;

    await db.insert(endpoints[1].table, item);
    res.status(200).send("Adcionado ");
  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
});

app.get(`${endpoints[1].endpoint}`, async (req, res) => {
  try {
    const db = new DbConnection();
    const json = await db.select(endpoints[1].table, '*');
    res.status(200).json(json);
  } catch (error) {
    res.status(400);
  }


});

app.get(`${endpoints[1].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const json = await db.select(endpoints[1].table, '*', [`ID = ${req.params.id}`]);

  //adcionar validacao caso string vier vazia

  res.status(200).json(json);
});

app.put(`${endpoints[1].endpoint}/:id`, async (req, res) => {
    
  const updatedItem: livraria_item | livraria_item[] = plainToInstance(livraria_item, req.body);
  const db = new DbConnection();
  await db.update(endpoints[1].table, updatedItem, req.params.id);

  res.status(200).json();
});

app.delete(`${endpoints[1].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const index = req.params.id;
  await db.delete(endpoints[1].table, req.params.id);
  res.status(200).send("Deleted");
});

//#endregion
//#region CRUD Authors

app.post(endpoints[2].endpoint, async (req, res) => {

  try {
    const db = new DbConnection();
    const item: authors = req.body;

    await db.insert(endpoints[2].table, item);
    res.status(200).send("Adcionado ");
  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
});

app.get(`${endpoints[2].endpoint}`, async (req, res) => {
  try {
    const db = new DbConnection();
    const json = await db.select(endpoints[2].table, '*');
    res.status(200).json(json);
  } catch (error) {
    res.status(400);
  }


});

app.get(`${endpoints[2].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const json = await db.select(endpoints[2].table, '*', [`ID = ${req.params.id}`]);

  //adcionar validacao caso string vier vazia

  res.status(200).json(json);
});

app.put(`${endpoints[2].endpoint}/:id`, async (req, res) => {
    
  const updatedItem: authors | authors[] = plainToInstance(authors, req.body);
  const db = new DbConnection();
  await db.update(endpoints[2].table, updatedItem, req.params.id);

  res.status(200).json();
});

app.delete(`${endpoints[2].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const index = req.params.id;
  await db.delete(endpoints[2].table, req.params.id);
  res.status(200).send("Deleted");
});

//#endregion
//#region CRUD collections
//#endregion
export default app
