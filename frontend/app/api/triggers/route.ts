import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const availableTriggers = await prisma.availableTriggers.findMany({});
  return NextResponse.json(availableTriggers);
};
