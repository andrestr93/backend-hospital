/**
 * * RUTA: /api/medicos
 */

const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const router = Router();

const {
  getMedicos,
  createMedicos,
  updateMedicos,
  deleteMedicos,
} = require("../controllers/medicos.controller");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  createMedicos
);

router.put("/:id", updateMedicos, [
  validarJWT,
  check("nombre", "EL nombre del medico es necesario").not().isEmpty(),
  check("hospital", "El hospital id debe de ser valido").isMongoId,
  validarCampos,
]);

router.delete("/:id", validarJWT, deleteMedicos);

module.exports = router;
