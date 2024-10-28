import produceMsg from "../kafka/producer.js";
import Product from "../model/productModel.js";
produceMsg;
Product;

export const createProduct = async (req, res) => {
  try {
    const { title, price, stock } = req.body;
    const existProd = await Product.findOne({ title });
    if (existProd) {
      return res.status(409).send({
        message: "Product Already Exists ! Please Look for Stock Increment :",
        exist: true,
      });
    }
    const insertProd = new Product({
      title,
      price,
      stock,
    });
    await insertProd.save();
    const message = JSON.stringify({
      title,
      price,
      stock,
    });
    await produceMsg("product-created", message);
    return res.status(200).send({
      message: "Product Created Successfully  :)",
      product: insertProd,
      created: true,
    });
  } catch (error) {
    console.log("Error WHile Createing the Product :(", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error :-", error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title } = req.body;
    const exist = await Product.findOne({ title });
    if (!exist) {
      return res
        .status(500)
        .send({ message: "Product is not Exist! try Create ..Instead" });
    }
    const _id = exist._id;
    await Product.findByIdAndUpdate(_id, {
      $set: req.body,
    });

    const message = JSON.stringify({ _id, ...req.body });
    await produceMsg("product-updated", message);

    return res.status(200).send({
      message: "Product updated successfully!",
      product: { _id, ...req.body },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error :-", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .send({ message: "Here are the products :", products: products });
  } catch (error) {
    res.status(500).send("Internal Serval Error :(");
  }
};
