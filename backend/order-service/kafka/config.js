import { Kafka } from "kafkajs";

const kakfa = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

export default kakfa;
