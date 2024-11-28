import prisma from "../../db";

export const getVerificationTokenByEmail = async (email: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
  return existingToken;
};
