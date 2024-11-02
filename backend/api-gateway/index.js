import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 5000;
app.use(cors());

app.use(
  "/api/user-service",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.use(
  "/api/product-service",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

app.use(
  "/api/order-service",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
  })
);

//this is for the dommy commit ::
///dummsdfds
app.get("/", (req, res) => res.send("Api-Gateway is Running :-"));
app.listen(port, () => console.log(`Api Gate way listening on port ${port}!`));
