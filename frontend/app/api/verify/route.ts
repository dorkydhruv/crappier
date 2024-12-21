import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (!req.body)
    return NextResponse.json({
      response: false,
    });
  const body = await req.json();
  const token = body.token;
  if (!token)
    return NextResponse.json({
      response: false,
    });
  const tokenData = await prisma.verificationToken.findFirst({
    where: {
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
  });
  if (!tokenData || !tokenData.email) {
    return NextResponse.json({
      response: false,
    });
  }
  console.log(
    "All checks passed successfully. Deleting token and updating user"
  );
  const email = tokenData.email;
  await prisma.$transaction(async (tx) => {
    await tx.verificationToken.delete({
      where: {
        id: tokenData.id,
      },
    });
    await tx.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    });
  });
  return NextResponse.json({
    response: true,
  });
};
