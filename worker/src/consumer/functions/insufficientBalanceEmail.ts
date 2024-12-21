import { EmailClient } from "@azure/communication-email";

export async function insufficientBalanceEmail(payload: any, email: string) {
  // Send email to user that the balance is insufficient
  const client = new EmailClient(
    process.env.COMMUNICATION_SERVICES_CONNECTION_STRING ?? ""
  );
  const emailMessage = {
    senderAddress:
      "DoNotReply@6325c506-af68-40ee-9669-3a9cdbc262c9.azurecomm.net",
    recipients: {
      to: [{ address: email }],
    },
    content: {
      subject: "Insufficient balance.",
      plainText: `Your balance is insufficient to complete the transaction. Please fill the pot to continue.\n The transaction with payload ${JSON.stringify(
        payload
      )} has been stopped.
          `,
    },
  };
  const poller = await client.beginSend(emailMessage);
  await poller.pollUntilDone();
}
