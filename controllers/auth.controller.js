const Usuario = require("../models/usuario");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    console.log(usuarioDB);

    //* COMPROBAMOS EL EMIAL SI ES CORRECTO

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El email no es valido ",
      });
    }

    //* VERIFICAR CONTRASEÑA

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "El email no es valido ",
      });
    }

    //* GENERAR EL TOKEN - JWT

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.id;

  const token = await generarJWT(uid);

  res.json({
    ok: true,
    token,
  });
};
module.exports = {
  loginUser,
  renewToken,
};
