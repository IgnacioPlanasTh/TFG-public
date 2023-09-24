const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var palabraSchema = new Schema({
  natal: {
    type: String,
    trim: true,
    required: true,
    maxLength: 40,
  },
  traduccion: {
    type: String,
    trim: true,
    required: true,
    maxLength: 40,
  },
});
module.exports = palabraSchema;
