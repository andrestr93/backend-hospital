const { Schema, model } = require("mongoose");

const UsuarioShema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  
  },

  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER:ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioShema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();
  return object;
});

module.exports = model("Usuario", UsuarioShema);
