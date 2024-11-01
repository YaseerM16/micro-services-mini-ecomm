import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
Order;

export const orderProduct = async (req, res) => {
  try {
    const { productTitle, email } = req.body;

    const product = await Product.findOne({ title: productTitle });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User  not found" });
    }

    const newOrder = new Order({
      productId: product._id,
      totalPrice: product.price, // Assuming the product has a price field
      userId: user._id,
    });

    await newOrder.save();
    res.status(201).send({
      message: "Order placed successfully",
      order: newOrder,
      ordered: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error :", error: error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userEmail } = req.params; // Assuming userId is passed as a URL parameter

    // Validate the userId
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send({ message: "User  not found" });
    }

    // Find orders for the specified user
    const orders = await Order.find({ userId: user._id })
      .populate("productId")
      .populate("userId");

    // Check if the user has any orders
    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders found for this user" });
    }

    // Send the orders in the response
    res.status(200).send({ orders });
  } catch (error) {
    console.log("Error In the getting orders :", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
