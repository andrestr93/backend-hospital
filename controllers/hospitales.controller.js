const { response } = require("express");
const Hospital = require("../models/hospital");
const usuario = require("../models/usuario");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre");

  res.json({
    ok: true,
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  const id = req.id;

  const hospital = new Hospital({ usuario: id, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log("error inesperado");

    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no enconrado por id",
      });
    }

    const cambioHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambioHospital,
      { new: true }
    );

    res.json({
      ok: true,
      id,
      Hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospital = Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no enconrado por id",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
