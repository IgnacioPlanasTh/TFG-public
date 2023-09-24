const mongoose = require("mongoose");

var palabraIntentoSchema = new mongoose.Schema({
  natal: {
    type: String,
    trim: true,
    required: true,
  },
  traduccion: {
    type: String,
    trim: true,
    required: true,
  },
  acertada: {
    type: Boolean,
    required: true,
    default: false,
  },
});

var intentoSchema = new mongoose.Schema({
  mazoId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
    timezone: "Europe/Madrid",
  },
  totales: {
    type: Number,
    required: true,
  },
  acertadas: {
    type: Number,
    required: true,
  },
  palabras: {
    type: [palabraIntentoSchema],
    required: true,
  },
});
module.exports = intentoSchema;
