const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    
  },

  //* HACE REFERENCIA AL USUARIO
  usuario: {

    type: Schema.Types.ObjectId,
    ref:'Usuario',
    required: true
  },

    //* HACE REFERENCIA AL HOSPITAL
  hospital: {

    type: Schema.Types.ObjectId,
    ref:'Hospital',
    required: true
    }
});

MedicoSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Medico", MedicoSchema);
