/*

ruta api/todo:busqueda

*/


const { Router } = require("express");

const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router();

 const {
  getSearch,
  getSearchColeccion
} = require('../controllers/busquedas.controller');




router.get("/:search", validarJWT, [ 
], getSearch);

router.get("/coleccion/:tabla/:busqueda", validarJWT, getSearchColeccion);


module.exports = router;
