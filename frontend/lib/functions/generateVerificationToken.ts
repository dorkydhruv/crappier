import { randomUUID } from "crypto";
import prisma from "../db";
import { getVerificationTokenByEmail } from "./getverificationToken";
import { Resend } from "resend";
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

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email for Crappier",
    html: `
    <h1>Verify your email.</h1>
    <p>Click on the link below to verify your email</p><br>
    <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}">Verify</a>
    `,
  });
};
