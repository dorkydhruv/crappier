import { authConfig } from "@/auth.config";
import prisma from "@/lib/db";
import { ZapSchema } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  const zaps = await prisma.zap.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      actions: {
        include: {
          availableAction: true,
        },
      },
      trigger: {
        include: {
          availableTrigger: true,
        },
      },
    },
  });
  return NextResponse.json(zaps);
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  const payload = await req.json();
  const parsedBody = ZapSchema.safeParse(payload);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error });
  }
  try {
    console.log(parsedBody.data);
    // Create the zap with the valid userId
    const zap = await prisma.zap.create({
      data: {
        name: parsedBody.data.name,
        trigger: {
          create: {
            availableTriggerId: parsedBody.data.availableTriggerId,
            metadata: parsedBody.data.triggerMetadata ?? {},
          },
        },
        userId: session.user.id,
        actions: {
          create: parsedBody.data.actions.map((action) => ({
            availableActionId: action.availableActionId,
            metadata: action.actionMetadata ?? {},
          })),
        },
      },
    });
    const zapId = zap.id;
    return NextResponse.json(zapId);
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` });
  }
};
