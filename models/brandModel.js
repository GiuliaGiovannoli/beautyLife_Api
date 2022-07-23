const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, min: 2, max: 50, required: true, unique: true },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
