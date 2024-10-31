const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {

  const hospitales = await Hospital.find().populate('usuario' , 'nombre')



  res.json({
    ok: true,
    hospitales
  })


 
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

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateHospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deletrHospital",
  });
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
