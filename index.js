const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./database/config");

const cors = require("cors");

const app = express();

//* CONFIGURAR CORS

app.use(cors());

//* LECTURA Y PARSEO DEL BODY

app.use(express.json());

//*BASE DE DATOS
dbConnection();

//* Rutas

app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/hospitales", require("./routes/hospitales.routes"));
app.use("/api/medicos", require("./routes/medicos.routes"));
app.use("/api/todo", require("./routes/search.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto ", process.env.PORT);
});
