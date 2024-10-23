import { Router } from "express";
import { login, signUp } from "../controller/authController.js";

const authRoute = Router();

authRoute.post("/singup", signUp);
authRoute.post("/login", login);

export default authRoute;
