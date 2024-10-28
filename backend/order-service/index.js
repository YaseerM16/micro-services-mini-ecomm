import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import receiveMessage from "./kafka/consumer.js";
import orderRoute from "./route/orderRoute.js";
const app = express();
const port = process.env.PORT || 3002;
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((e) => console.log("Mongo ERR ❌: ", e));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(orderRoute);

app.get("/", (req, res) => res.send("HI From the Order_Serivce form 3002:"));
receiveMessage();

app.listen(port, () =>
  console.log("Order - Service is Running on port : ", port)
);
