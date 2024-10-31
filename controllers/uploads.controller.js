const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updatePhoto } = require("../helpers/updatephoto");
const path = require('path');
const fs = require('fs'); 

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;

  const id = req.params.id

  try {
    //* VALIDAR TIPOS

    const tipoValidos = ["hospitales", "medicos", "usuarios"];

    if (!tipoValidos.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        msg: "No se encuentra el tipo correspondiente",
      });
    }

    //* COMPROBACION SI HAY FICHERO 

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay ningun archivo '
      })
    }


    //* SE PROCESA LA IMAGEN 

    const file = req.files.imagen

    
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length-1]

    // * VALIDAR EXTENSION

    const extensionesValidas = ['png' , 'jpg' , 'jpeg' , 'gif']

    if(!extensionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msg:'No es una extension permitida '
        })
    }



    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    const path = `./uploads/${tipo}/${nombreArchivo}`

    //* MOVER LA IMAGEN

    file.mv(path , (error) => {

        if(error) {

            console.log(error)

            return res.status(500).json({

                ok: false,
                msg: 'Error al mover la imagen'
            })


        }

      

        //* actualizar base de datos
        updatePhoto(tipo , id  , nombreArchivo)




        res.json({
            ok: true,
            msg: 'archivo subido',
            file
        })

    })


  } catch (error) {
    console.log(error);
  }
};


const retornaIMagen= (req , res = response) => {

    const tipo = req.params.tipo
    const foto= req.params.foto
    
    const pathimg = path.join( __dirname, `../uploads/${tipo}/${foto}`)
    
    //* imagen por defecto 
    
    if(fs.existsSync(pathimg)){
        
        res.sendFile(pathimg)
        
    } else {
        
        const default_image = path.join( __dirname, `../uploads/default_image.png`)
        res.sendFile(default_image)

    }


}

module.exports = {
  fileUpload,
  retornaIMagen
};
