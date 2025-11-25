import { JsonObject } from "@prisma/client/runtime/library";
import { kafka, TOPIC_NAME } from "../const";
import { prisma } from "../db";
import { emailWorker } from "./functions/email";
import { solanaWorker } from "./functions/solana";

interface ZapRunOutbox {
  id: string;
  zapRunId: string;
  stage: number;
}

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
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }
      const data: ZapRunOutbox = JSON.parse(message.value?.toString() ?? "");
      const zapRun = await prisma.zapRun.findFirst({
        where: {
          id: data.zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  availableAction: true,
                },
              },
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      if (!zapRun) {
        console.log("ZapRun not found");
        return;
      }
      const action = zapRun?.zap.actions.find(
        (action) => action.sortingOrder === data.stage
      );
      if (!action) {
        console.log("Action not found");
        return;
      }
      console.log("Action found:", {
        availableActionId: action.availableActionId,
        availableAction: action.availableAction,
        metadata: action.metadata,
      });
      let actionCompleted: boolean = false;
      if (action.availableActionId === "solana") {
        console.log("Running Solana worker");
        actionCompleted = await solanaWorker(
          zapRun.payload,
          action.metadata as JsonObject,
          zapRun.zap.user.email
        );
      } else if (action.availableActionId === "email") {
        console.log("Running Email worker");
        actionCompleted = await emailWorker(
          zapRun.payload,
          action.metadata as JsonObject
        );
      } else {
        console.log("Unknown action type:", action.availableActionId);
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (data.stage !== zapRun.zap.actions.length - 1) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              key: data.id,
              value: JSON.stringify({
                ...data,
                stage: data.stage + 1,
              }),
            },
          ],
        });
      }
      actionCompleted
        ? await consumer.commitOffsets([
            {
              topic: TOPIC_NAME,
              partition: partition,
              offset: (parseInt(message.offset) + 1).toString(),
            },
          ])
        : null;
    },
  });
}
