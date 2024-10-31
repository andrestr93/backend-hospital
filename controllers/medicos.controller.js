const {response} = require ('express')
const Medico = require("../models/medico");


const getMedicos = async (req , res= response)=> {

    const medicos =  await Medico.find().populate("usuario" , "nombre").populate("hospital" , "nombre")

    res.json({
        ok:true,
        medicos
    })

}


const createMedicos = async (req , res= response)=> {


    const id= req.id

    const medico = new Medico ({ usuario: id, ... req.body})


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

        console.log(error)
        
    }




  



}

const updateMedicos = (req , res= response)=> {


    res.json({

        ok: true,
        msg: 'updateMedicos'
    })



}

const deleteMedicos = (req , res= response)=> {


    res.json({

        ok: true,
        msg: 'deleteMedicos'
    })



}


module.exports = {

    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos

}