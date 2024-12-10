import { kafka, TOPIC_NAME } from "../const";
import { prisma } from "../db";

export async function publisher() {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      take: 10,
    });
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((row) => ({
        key: row.id.toString(),
        value: JSON.stringify(row),
      })),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((row) => row.id),
        },
      },
    });
  }
}
