import prisma from "@/lib/db";
import { CreateUserSchema } from "@/lib/types";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "@/lib/functions/user/generateVerificationToken";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    if (!req.body) {
      return NextResponse.json({ message: "Request body is null" });
    }
    const body = await req.json();
    const parsedBody = CreateUserSchema.safeParse(body);
    console.log(parsedBody);
    if (!parsedBody.success) {
      return NextResponse.json({
        message: "Invalid request body",
      });
    }
    const { email, password, name } = parsedBody.data;
    // Check if user already exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({ message: "User already exists" });
    }
    //TODO: Password hashing
    //Now create a user and ask for verification
    const pass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: pass,
        name,
        verified: false,
      },
    });
    //Now send verification email
    await generateVerificationToken(newUser.email);
    return NextResponse.json({
      message: "Verify your user. Check your email for the verification link",
    });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: `Internal server error: ${error}` });
  }
};
