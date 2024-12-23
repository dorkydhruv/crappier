export const TOPIC_NAME = "zaps";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Kafka } from "kafkajs";
export const kafka = new Kafka({
  clientId: "worker",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});

export const connection = new Connection(clusterApiUrl("devnet"));
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);
