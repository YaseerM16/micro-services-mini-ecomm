import { Partitioners } from "kafkajs";
import kakfa from "./config.js";

const producer = kakfa.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const produceMsg = async (topic, message) => {
  try {
    console.log("produceMsg is approaching :");

    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log("Messsage Produced Successfully :");

    await producer.disconnect();
  } catch (error) {
    console.log("Error in the Producer : -> ", error);
  }
};

export default produceMsg;
