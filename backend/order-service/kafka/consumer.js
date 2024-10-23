import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import kakfa from "./config.js";
Product;
User;

const consumer = kakfa.consumer({ groupId: "order-group" });
const topics = ["product-created", "product-updated", "user-registered"];

const receiveMessage = async () => {
  await consumer.connect();
  console.log("Order Consumer is Connected :) ");

  await consumer.subscribe({
    topics: topics,
    fromBeginning: true,
  });
  console.log("Subcribed to the product-created in ORDER-service");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log("Received Msg on topic :", topic);
        const value = JSON.parse(message.value.toString());
        console.log("Received Msg of val :", value);
        if (topic == "product-created") {
          const insertProd = new Product(value);
          try {
            await insertProd.save();
          } catch (error) {
            console.log(
              "ERROR while creating the Prod in Order-Service :",
              error
            );
          }
        } else if (topic == "product-updated") {
          try {
            const { title, price, stock } = value;
            await Product.findOneAndUpdate(
              { title },
              { $set: { price, stock } },
              { new: true }
            );
          } catch (error) {
            console.log("Error while Update the Prod in Order-Service", error);
          }
        } else if (topic == "user-registered") {
          const newUser = new User(value);
          try {
            await newUser.save();
          } catch (error) {
            console.log("Error while registed User in Order-Service :", error);
          }
        }
      } catch (error) {
        console.log(
          "Error inside the Consumer.Run() in Order-Service :",
          error
        );
      }
    },
  });
};

export default receiveMessage;
