/*

ruta api/uploads/

*/

const { Router } = require("express");


const fileUploadExpress = require('express-fileupload');

const {validarJWT} = require('../middlewares/validar-jwt')


const router = Router();

const {fileUpload, retornaIMagen} = require('../controllers/uploads.controller');


router.use(fileUploadExpress());

router.put("/:tipo/:id", validarJWT, fileUpload  );


router.get("/:tipo/:foto", retornaIMagen  );


module.exports = router;