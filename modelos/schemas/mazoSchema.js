const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idiomas = require("../idiomas");
const palabraSchema = require("./palabraSchema");
const usuarioSchema = require("./usuarioSchema");

var mazoSchema = new Schema({
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: "Usuario",
    unique: false,
    required: [true, "El usuario es obligatorio"],
  },

  nombre: {
    type: String,
    maxLength: 30,
    trim: true,
    required: [true, "El nombre es obligatorio"],
  },

  descripcion: {
    type: String,
    maxLength: 100,
    trim: true,
    default: "",
  },

  idioma1: {
    type: String,
    required: [true, "El idioma1 es obligatorio"],
    enum: idiomas.toSchemaEnum(),
  },

  idioma2: {
    type: String,
    required: [true, "El idioma2 es obligatorio"],
    enum: idiomas.toSchemaEnum(),
  },

  fechaCreacion: {
    type: Date,
    required: [true, "La fecha creación es obligatoria"],
    default: Date.now,
  },

  palabras: {
    type: [palabraSchema],
    required: true,
    default: [],
  },

  privado: {
    type: Boolean,
    default: false,
  },

  favorito: {
    type: Boolean,
    default: false,
  },

  archivado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mazoSchema;
