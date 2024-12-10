import { kafka, TOPIC_NAME } from "../const";

export async function consumer() {
  const consumer = kafka.consumer({
    groupId: "zap-worker",
  });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();

  consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true,
  });

  await consumer.run({
    // autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log("message", message.value?.toString());
    },
  });
}
