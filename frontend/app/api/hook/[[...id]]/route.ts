import { NextRequest, NextResponse } from "next/server";

const latestRequests = new Map<string, object>();

export const POST = async (
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  try {
    const hookId = params.id;
    const body: object = await req.json();
    latestRequests.set(hookId[0], body);
    return NextResponse.json(body);
  } catch (e) {
    console.log(e);
  }
};

export const GET = async (
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  const hookId = params.id;
  const data = latestRequests.get(hookId[0]);
  return NextResponse.json(data || null);
};
