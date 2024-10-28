import { Router } from "express";
import { getOrders, orderProduct } from "../controller/orderController.js";

const orderRoute = Router();

orderRoute.post("/order-product", orderProduct);
orderRoute.get("/get-orders/:userEmail", getOrders);

export default orderRoute;
