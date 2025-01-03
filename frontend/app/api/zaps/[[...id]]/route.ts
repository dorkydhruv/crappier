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
  // Retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const zaps = await prisma.zap.findMany({
    where: {
      userId: user.id,
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

  // Retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const payload = await req.json();
  const parsedBody = ZapSchema.safeParse(payload);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error });
  }
  try {
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
        userId: user.id,
        actions: {
          create: parsedBody.data.actions.map((action, index) => ({
            availableActionId: action.availableActionId,
            metadata: action.actionMetadata ?? {},
            sortingOrder: index,
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

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  const zapId = params.id[0];
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  try {
    await prisma.zapRun.deleteMany({
      where: {
        zapId: zapId,
      },
    });
    await prisma.action.deleteMany({
      where: {
        zapId: zapId,
      },
    });
    await prisma.trigger.delete({
      where: {
        zapId: zapId,
      },
    });
    await prisma.zap.delete({
      where: {
        id: zapId,
      },
    });
    return NextResponse.json({ message: "Zap deleted" });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` });
  }
};
