import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const availableTriggers = await prisma.availableTriggers.findMany({});
  return NextResponse.json(availableTriggers);
};
