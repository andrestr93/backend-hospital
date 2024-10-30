
/* 

? PATH '/api/login'
*/


const { Router } = require("express");
const {check} = require ('express-validator')

const {} = require ('../controllers/auth.controller');
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
const {

    loginUser

} = require ("../controllers/auth.controller")



router.post("/",
  
    [
      check("email", "EL email es obligatorio").not().isEmpty(),
      check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
    ],
  
    loginUser
  );



  module.exports = router