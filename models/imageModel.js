const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: { type: String, min: 2, required: true, unique: true },
    image: { type: String, trim: true, required: true },
})

const Image = mongoose.model("Image", imageSchema);



module.exports = Image