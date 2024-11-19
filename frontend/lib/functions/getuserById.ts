import prisma from "../db";

export const getUserById = async (id: string) => {
  const user = prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user;
};
