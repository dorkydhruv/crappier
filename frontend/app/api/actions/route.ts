import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const availableActions = await prisma.availableActions.findMany({});
  return NextResponse.json(availableActions);
};
