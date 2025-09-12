export const TOPIC_NAME = "zaps";
import { Connection, PublicKey } from "@solana/web3.js";
import { Kafka } from "kafkajs";
export const kafka = new Kafka({
  clientId: "worker",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});

export const connection = new Connection(
  "https://cool-snowy-silence.solana-devnet.quiknode.pro/056b57d6ff0a6ddfc0e2398a332ce5bea67f8985/"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);
