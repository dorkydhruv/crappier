export const TOPIC_NAME = "zaps";
import { Connection, PublicKey } from "@solana/web3.js";
import { Kafka } from "kafkajs";
export const kafka = new Kafka({
  clientId: "worker",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});

export const connection = new Connection(
  "https://dawn-broken-putty.solana-devnet.quiknode.pro/54b907b683c741f54a33c70d4df3d7d75e404aa3"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);
