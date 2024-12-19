import prisma from "../../db";

export const validateToken = async (token: string) => {
  try {
    console.log("Validating token");
    const tokenData = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    //Check if token exists
    if (!tokenData) {
      console.log("Token not found");
      return false;
    }
    const user = await prisma.user.findFirst({
      where: {
        email: tokenData.email,
      },
    });
    //Check if user exists
    if (!user) {
      console.log("User not found");
      return false;
    }
    //Check if token has expired
    if (tokenData.expiresAt < new Date()) {
      console.log("Token expired");
      return false;
    }
    console.log(
      "All checks passed successfully. Deleting token and updating user"
    );
    //now delete the token
    await prisma.verificationToken.delete({
      where: {
        id: tokenData.id,
      },
    });
    console.log("All checks passed successfully, now updating user");
    //Now update the user
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
