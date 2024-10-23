import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./route/product-route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((e) => console.log("Mongo ERR ❌: ", e));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productRoute);
app.get("/", (req, res) => res.send("HI From the Product_Serivce form 3001:"));

app.listen(port, () =>
  console.log("Product - Service is Running on port :", port)
);
