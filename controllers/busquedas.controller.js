const { response } = require("express");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");

const getSearchColeccion = async (req, res = response) => {
    const tabla = req.params.tabla
  const searchtxt = req.params.busqueda;
  const regex = new RegExp(searchtxt, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex }).populate('usuario' , 'nombre').populate('hospital' , 'nombre')
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate('usuario' , 'nombre')
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex })

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla debe de tener usuarios medicos y hospitales",
      });
  }

  res.json({
    ok: true,
    resultados: data
  });

};

const getSearch = async (req, res = response) => {
  const searchtxt = req.params.search;
  const regex = new RegExp(searchtxt, "i");

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

module.exports = {
  getSearch,
  getSearchColeccion
};
