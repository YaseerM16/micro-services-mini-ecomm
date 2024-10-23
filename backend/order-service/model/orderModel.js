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
  orderDate: {
    type: Date,
    default: Date.now, // Automatically sets the order date to the current date
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,15}$/, "Please provide a valid phone number."],
  },
});

const Order = mongoose.model("M-Order", orderSchema, "Order-Service");

export default Order;
