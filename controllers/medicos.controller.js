const { response } = require("express");
const Medico = require("../models/medico");
const { body } = require("express-validator");
const usuario = require("../models/usuario");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");

  res.json({
    ok: true,
    medicos,
  });
};

const createMedicos = async (req, res = response) => {
  const id = req.id;

  const medico = new Medico({ usuario: id, ...req.body });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      hospital: medicoDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }

  try {
  } catch (error) {
    console.log(error);
  }
};

const updateMedicos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el medico por ese id",
      });
    }

    const cambioMedico = {
      ...req.body,
      usuario: id,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, {
      new: true,
    });

    res.json({
      ok: true,
      medicoActualizado: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      msg: "no ha pasado",
    });

    console.log(error);
  }
};

const deleteMedicos = async (req, res = response) => {
  const id = req.params.id;

  const medicoDB = await Medico.findById(id);

  try {
    if (!medicoDB) {
      res.json({
        ok: false,
        msg: "El medico no existe",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "El medico seleccionado ha sido borrado satisfactoriamente",
    });
  } catch (error) {
    console.log("Error inesperado");

    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getMedicos,
  createMedicos,
  updateMedicos,
  deleteMedicos,
};
