import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "M-Product", // Reference to the Product model
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    match: [/^\d+(\.\d{1,2})?$/, "Please provide a valid total price."],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "M-User", // Reference to the User model
    required: true,
  },
});

const Order = mongoose.model("M-Order", orderSchema, "Order-Service/orders");

export default Order;
