const Usuario = require("../models/usuario");
const express = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res = express) => {
  const desde = Number(req.query.desde || 0);

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeemail = await Usuario.findOne({ email });

    if (existeemail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //* ENCRIPTAR CONTRASEÑA

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    //* GENERAR TOKEN

    const token = await generarJWT(usuario.id);

    //* GUARDAR USUARIO

    await usuario.save();

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado ... revisar logs",
    });
  }
};

//* ACTUALIZAR USUARIO  */

const updateUser = async (req, res = response) => {
  //todo:  validar token y comprobar si el usuario es correcto

  const _id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(_id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario por ese id",
      });
    }

    //* ACTUALIZACIONES

    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe el usuario con el email",
        });
      }
    }

    campos.email = email;

    const updateUser = await Usuario.findByIdAndUpdate(_id, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const id = req.params.id;
  const usuarioDB = await Usuario.findById(id);

  try {
    if (!usuarioDB) {
      res.json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    await Usuario.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "El usuario ha sido borrado de la bd correctamente",
    });
  } catch (error) {
    console.log("error inesperado");

    res.status(500).json({
      ok: false,
      msg: "Erorr inesperado",
    });
  }
};

module.exports = {
  getUsuarios,
  createUser,
  updateUser,
  deleteUser,
};
