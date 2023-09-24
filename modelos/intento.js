const mongoose = require("mongoose");
const intentoSchema = require("./schemas/intentoSchema");
module.exports = mongoose.model("Intento", intentoSchema);
