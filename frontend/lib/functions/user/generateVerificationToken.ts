import { randomUUID } from "crypto";
import prisma from "../../db";
import { getVerificationTokenByEmail } from "./getverificationToken";
import { EmailClient } from "@azure/communication-email";
export const generateVerificationToken = async (email: string) => {
  //Generate a random token
  const token = randomUUID();
  //Store it in the database
  const expires = new Date().getTime() + 1000 * 60 * 60 * 24;
  //Check if the user already has a token
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    //If yes, delete that token and update the new one
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  //Create verification db entry
  await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(expires),
    },
  });

  //Send the user mail for the verification
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
      subject: "Verify your email for Crappier",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">Verify Your Email Address</h1>
      <p>Hi there,</p>
      <p>Thank you for registering with Crappier! Please click the button below to verify your email address:</p>
      <p style="text-align: center;">
        <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      </p>
      <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
      <p><a href="${process.env.NEXTAUTH_URL}/verify?token=${token}">${process.env.NEXTAUTH_URL}/verify?token=${token}</a></p>
      <p>If you did not create an account, no further action is required.</p>
      <p>Best regards,<br>The Crappier Team</p>
    </div>
    `,
    },
  };
  const poller = await client.beginSend(emailMessage);
  await poller.pollUntilDone();
};
