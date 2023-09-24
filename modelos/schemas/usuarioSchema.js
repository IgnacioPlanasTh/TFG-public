const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idiomas = require("../idiomas");
var uniqueValidator = require("mongoose-unique-validator");

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    maxLength: 50,
    required: [true, "El nombre es obligatorio"],
  },
  apellido: {
    type: String,
    trim: true,
    maxLength: 50,
    required: false,
  },

  fechaAlta: {
    type: Date,
    required: [true, "La fecha de alta es obligatoria"],
    default: Date.now,
  },
  idioma: {
    type: String,
    required: [true, "El idioma es obligatorio"],
    enum: idiomas.toSchemaEnum(),
    default: "es",
  },
  apodo: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: [true, "El apodo es obligatorio"],
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  return user.toObject();
};

usuarioSchema.methods.toString = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.avatar;
  return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});

module.exports = usuarioSchema;
