import { Kafka } from "kafkajs";

const kakfa = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9092"],
});

export default kakfa;
