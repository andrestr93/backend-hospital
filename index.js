const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./database/config");

const cors = require("cors");

const app = express();

//* CONFIGURAR CORS

app.use(cors());

//*BASE DE DATOS
dbConnection();

//* Rutas

app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto ", process.env.PORT);
});
