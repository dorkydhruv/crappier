export const TOPIC_NAME = "zaps";
import { Connection, PublicKey } from "@solana/web3.js";
import { Kafka } from "kafkajs";
export const kafka = new Kafka({
  clientId: "worker",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});

export const connection = new Connection(
  "https://thrilling-methodical-brook.solana-devnet.quiknode.pro/dd7c4e3b8a51ab3c1a229f287a30db024e12a6d2"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);
