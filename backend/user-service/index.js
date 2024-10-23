import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((e) => console.log("Mongo ERR ❌: ", e));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authRoute);
app.get("/", (req, res) => res.send("User-Service is running :"));

app.listen(port, () =>
  console.log("userAuth Service is Running on port : ", port)
);
