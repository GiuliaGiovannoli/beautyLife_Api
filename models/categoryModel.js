const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, min: 2, max: 50, required: true, unique: true },
  image: { type: String, trim: true, required: true }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
