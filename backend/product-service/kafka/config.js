import { Kafka } from "kafkajs";

const kakfa = new Kafka({
  clientId: "product-service",
  brokers: ["localhost:9092"],
});

export default kakfa;
