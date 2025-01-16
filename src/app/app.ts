import express from "express";
import { util } from "classes/util.js";
import { DbConnection } from "../db/DbConnection.js";
import { acervo_item } from "classes/acervo_item.js";


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

    await db.insert(
      endpoints[0].table,
      `(
                city, object_name, creation_date, legend, technique, material, digitalized, state_origin, 
                author_id, collection_id, donor, context_history, thumbnail_url, created_at, updated_at
            )`,
      [
        item.city,
        item.objectName,
        item.creationDate.toString(),
        item.legend,
        item.technique,
        item.material,
        item.digitized.toString(),
        item.state,
        item.author,
        item.collection,
        item.donor,
        item.contextHistory,
        item.thumbnailUrl,
        item.created.toString(),
        item.updated.toString(),
      ]
    );
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

  const db = new DbConnection();
  const json = await db.select(endpoints[0].endpoint, "*", [`ID = ${req.params.id}`])
  const item: acervo_item = util.serializeClass(acervo_item, json)

  await db.update(endpoints[0].table,
    `(
      city, object_name, creation_date, legend, technique, material, digitalized, state_origin, 
      author_id, collection_id, donor, context_history, thumbnail_url, created_at, updated_at
    )`,
    [
      item.city,
      item.objectName,
      item.creationDate.toString(),
      item.legend,
      item.technique,
      item.material,
      item.digitized.toString(),
      item.state,
      item.author,
      item.collection,
      item.donor,
      item.contextHistory,
      item.thumbnailUrl,
      item.created.toString(),
      item.updated.toString(),
    ]
  );
  );
res.status(200).json(json);
});

app.delete(`${endpoints[0].endpoint}/:id`, async (req, res) => {
  const db = new DbConnection();
  const index = req.params.id;
  //Adcionar validação
  await db.delete(endpoints[0].table, `WHERE ID = ${req.params.id}`);
  res.status(200).send("Deleted");
});

export default app;
