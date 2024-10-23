import Router from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../controller/productController.js";

const productRoute = Router();

productRoute.post("/create-product", createProduct);
productRoute.post("/update-product", updateProduct);
productRoute.get("/get-products", getProducts);

export default productRoute;
