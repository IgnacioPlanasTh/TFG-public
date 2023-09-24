var mongoose = require("mongoose");
var imageSchema = require("./schemas/imagenSchema");
module.exports = new mongoose.model("Imagenes", imageSchema);
