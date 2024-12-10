import express from "express";
import cors from "cors";
import { prisma } from "./db";
import { publisher } from "./publisher";
import { consumer } from "./consumer";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/hook/:userId/:id", async (req, res) => {
  const body = req.body;
  const userId = req.params.userId;
  const id = req.params.id;

  console.log("userId", userId);
  console.log("id", id);
  console.log("body", body);

  try {
    await prisma.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          payload: body,
          zapId: id,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });
    res.json({
      message: "ok",
    });
  } catch (e) {
    res.json({
      message: `e: ${e}`,
    });
  }
});

const t = async () => {
  publisher();
  consumer();
  console.log("Worker is running");
  app.listen(3000, () => {
    console.log("Worker is running on port 3000");
  });
};

t();
