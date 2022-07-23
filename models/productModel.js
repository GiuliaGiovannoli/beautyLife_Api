const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: { type: String, min: 2, required: true, unique: true },
  product_price: { type: Number, required: true },
  quantity_in_stock: { type: Number, required: true },
  product_image: { type: String, trim: true, required: true },
  product_description: { type: String, min: 2, required: true },
  product_usage: { type: String, min: 2, required: true },
  product_ingredients: { type: String, min: 2, required: true },
  product_is_offer: { type: Boolean, require: true, default: false },
  product_tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
  product_categories: [
    { type: Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  product_brands: [
    { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  ]
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
