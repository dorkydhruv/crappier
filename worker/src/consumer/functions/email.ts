import { JsonObject } from "@prisma/client/runtime/library";
import { parser } from "./parser";
import dotenv from "dotenv";
import { EmailClient } from "@azure/communication-email";

// for loading environment variables
dotenv.config();

export async function emailWorker(payload: any, metadata: JsonObject) {
  try {
    const body = metadata.body;
    const subject = metadata.subject;
    const to = metadata.to;
    const parsedbody = parser(body?.toString() ?? "", payload);
    const parsedsubject = parser(subject?.toString() ?? "", payload);
    const parsedto = parser(to?.toString() ?? "", payload);
    // Send email
    const client = new EmailClient(
      process.env.COMMUNICATION_SERVICES_CONNECTION_STRING ?? ""
    );
    const emailMessage = {
      senderAddress:
        "DoNotReply@6325c506-af68-40ee-9669-3a9cdbc262c9.azurecomm.net",
      recipients: {
        to: [{ address: parsedto }],
      },
      content: {
        subject: parsedsubject,
        plainText: parsedbody,
      },
    };
    const poller = await client.beginSend(emailMessage);
    await poller.pollUntilDone();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
