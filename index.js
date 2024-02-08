import express from "express";

//nota: no hice la aplicacion orientada a MVC ya que pense que era otro tipo de prueba alli 
//y me recordé de eso un poco tarde


//con esta configuracion se puede usar la api de manera estatica
// import { deleteModule, getModules, insertModule, updateModule
//      } from './static-app.js';

import { deleteModule, deleteSubModule, getModules, getSubModules, insertModule, insertSubModule, updateSubModule } from "./mongdb-app.js";

const app = express();

app.use(express.json());

const port = 1234;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json("Modulos");
});

app.get("/modulos", async (req, res) => {
  res.json(await getModules());
});

app.get("/sub_modulos", async (req, res) => {
  const r = await getSubModules()
  res.json(r);
});



app.post("/modulo", (req, res) => {
  const r = insertModule(req.body)
  res.json(r ? r : "Modulo insertado");
});

app.post("/sub_modulo", async (req, res) => {
  const r = await insertSubModule(req.body)
    res.json(r ? r : "Sub_Modulo insertado");
  });



app.delete("/modulo/:id",async (req, res) => {
  const id = req.params.id;
  res.json(await deleteModule(id));
});

app.delete("/sub_modulo/:id",async (req, res) => {
    const id = req.params.id;
    res.json(await deleteSubModule(id));
  });

app.put("/module/:id",async (req, res) => {
  const id = req.params.id;
  res.json(await deleteSubModule(id, req.body));
});

app.put("/sub_module/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await updateSubModule(id, req.body));
  });
