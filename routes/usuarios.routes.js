/**
 * * RUTAS: /api/usuarios
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
const {
  getUsuarios,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios.controller");

router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "EL password es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createUser
);

router.put(
  "/:id",

  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    check("role", "EL rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  updateUser
);

router.delete(
  "/:id",
  validarJWT,
  deleteUser
);

module.exports = router;
