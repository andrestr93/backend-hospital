const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const fs = require("fs");

const deleteImage = async (path) => {

  if (fs.existsSync(path)) {
    //* BORRAR LA IMAGEN ANTERIOR
    fs.unlinkSync(path);
  }
};

const updatePhoto = async (tipo, id, nameFile) => {

    let pathViejo = ''
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);

      if (!medico) {

        return false;
      }

       pathViejo = `./uploads/medicos/${medico.img}`;

    


      deleteImage(pathViejo)


      medico.img = nameFile;

      await medico.save();

      return true;

    case "usuarios":
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        console.log("No es un medico por id");

        return false;
      }

       pathViejo = `./uploads/usuarios/${usuario.img}`;
      deleteImage(pathViejo);

      usuario.img = nameFile;

      await usuario.save();

      return true;

    case "hospitales":
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        console.log("No es un medico por id");

        return false;
      }


       pathViejo = `./uploads/hospitales/${hospital.img}`;
      deleteImage(pathViejo);

      hospital.img = nameFile;

      await hospital.save();

      return true;
  }
};

module.exports = {
  updatePhoto,
};
