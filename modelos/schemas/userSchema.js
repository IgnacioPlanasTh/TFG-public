const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

function validadorEmail(email) {
  var emailRegularExpresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegularExpresion.test(email);
}

var roles = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} no es un rol válido",
};

var tipo = {
  values: ["LOCAL", "GOOGLE"],
  message: "{VALUE} no es un rol válido",
};

var userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "El correo electrónico es obligatorio"],
    validate: [
      validadorEmail,
      "Por favor inserte un correo electrónico valido",
    ],
  },
  password: {
    type: String,
    minLength: 5,
  },
  usuarioId: {
    type: mongoose.Types.ObjectId,
    ref: "Usuario",
    unique: false,
    required: [true, "El usuario es obligatorio"],
  },
  rol: {
    type: String,
    default: "USER",
    enum: roles,
    required: [true, "El rol es obligatorio"],
  },
  tipo: {
    type: String,
    default: "LOCAL",
    enum: tipo,
  },
});

userSchema.index({ email: 1, tipo: 1 }, { unique: true });
userSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});

module.exports = userSchema;
