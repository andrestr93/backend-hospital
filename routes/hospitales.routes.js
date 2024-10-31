/**
 * * RUTA: /api/hospitales
 */


const { Router } = require("express");
const {validarJWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");

const router = Router();

 const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital

} = require('../controllers/hospitales.controller');



router.get("/", getHospitales );


router.post(
  "/",
  validarJWT,
  [
    check("nombre" , 'El nombre del hospital es necesario').not().isEmpty() ,
    validarCampos
  ], 
  createHospital

);

router.put("/:id", updateHospital , [],);

router.delete("/:id", deleteHospital);

module.exports = router;
