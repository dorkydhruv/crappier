import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const availableActions = await prisma.availableActions.findMany({});
  return NextResponse.json(availableActions);
};
