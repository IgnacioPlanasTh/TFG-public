const mongoose = require("mongoose");
const mazoSchema = require("./schemas/mazoSchema");
module.exports = mongoose.model("Mazo", mazoSchema);
