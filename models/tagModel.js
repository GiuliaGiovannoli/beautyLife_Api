const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, min: 2, max: 50, required: true, unique: true },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;