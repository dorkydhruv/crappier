import { validateToken } from "@/lib/functions/user/validateToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (!req.body) return new Response("Invalid request", { status: 400 });
  const body = await req.json();
  const response = validateToken(body.token);
  return NextResponse.json({
    response,
  });
};
