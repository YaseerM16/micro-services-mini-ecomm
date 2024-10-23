import mongoose from "mongoose";

mongoose;

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    match: [/^\d+(\.\d{1,2})?$/, "Please provide a valid price."],
  },
  stock: {
    type: Number,
    required: true,
    match: [/^\d+$/, "Please provide a valid stock quantity."],
  },
});

const Product = mongoose.model("M-Product", productSchema, "Products-Service");

export default Product;
