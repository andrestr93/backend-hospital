/**
 * * RUTA: /api/hospitales
 */

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");

const router = Router();

const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales.controller");

router.get("/", getHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  createHospital
);

router.delete("/:id", validarJWT, deleteHospital);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "EL nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  updateHospital
);

module.exports = router;
