import kakfa from "./config";

const producer = kakfa.producer();

const produceMsg = async (topic, message) => {
  try {
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
