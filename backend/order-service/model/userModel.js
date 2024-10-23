import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    phone: {
      type: Number,
      required: true,
      match: [/^\+?[0-9]{10,15}$/, "Please provide a valid phone number."],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("M-User", userSchema, "Order-Service/users");
export default User;
