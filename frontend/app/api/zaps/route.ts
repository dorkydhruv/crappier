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
  console.log(parsedBody.data);
  try {
    // Ensure the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // Create the zap with the valid userId
    const zapId = await prisma.$transaction(async (tx) => {
      const zap = await tx.zap.create({
        data: {
          name: parsedBody.data.name,
          actions: {
            create: parsedBody.data.actions.map((action, index) => ({
              availableActionId: action.availableActionId,
              metadata: action.actionMetadata ?? {},
              sortingOrder: index,
            })),
          },
          userId: session.user.id,
          triggerId: "",
        },
      });
      const trigger = await tx.trigger.create({
        data: {
          availableTriggerId: parsedBody.data.availableTriggerId,
          metadata: parsedBody.data.triggerMetadata ?? {},
          zapId: zap.id,
        },
      });
      await tx.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });
      return zap.id;
    });

    return NextResponse.json(zapId);
  } catch (error) {
    console.error("Error creating zap:", error);
    return NextResponse.json({ error: "Failed to create zap" });
  }
};
