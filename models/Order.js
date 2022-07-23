const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    // date_order: { type: Date , required: true , default: Date.now},
    date_delivery: {
      type: Date, required: true, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)
    },
    items: [
      // { type: Schema.Types.ObjectId, ref: "Product", required: true },

      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      }
    ],
    // qty: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    // paymentStatus: {
    //   type: String,
    //   enum: ["pending", "completed", "cancelled", "refund"],
    //   required: true,
    //   default: "completed"
    // },
    // paymentType: {
    //   type: String,
    //   enum: ["payD", "Card"],
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
