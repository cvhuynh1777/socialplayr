import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_SUBSCRIBER_ID = "cmcsj26ev00008o6f8g8r00q1";

export async function GET() {
  try {
    const subscriber = await prisma.user.findUnique({
      where: { id: TEST_SUBSCRIBER_ID },
    });

    if (!subscriber) {
      console.warn(`Subscriber not found: ${TEST_SUBSCRIBER_ID}`);
      return NextResponse.json({ picks: [], message: "Subscriber not found" });
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: TEST_SUBSCRIBER_ID },
      select: { capperId: true },
    });

    const capperIds = subscriptions.map((sub) => sub.capperId);

    if (capperIds.length === 0) {
      console.log(`No subscriptions found for subscriber ${TEST_SUBSCRIBER_ID}`);
      return NextResponse.json({ picks: [], message: "No subscriptions yet" });
    }

    const picks = await prisma.pick.findMany({
      where: { capperId: { in: capperIds } },
      include: {
        capper: {
          select: {
            owner: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = picks.map((p) => ({
      id: p.id,
      content: p.content,
      capperName: p.capper?.owner?.name ?? "Unknown Capper",
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ picks: formatted });
  } catch (error) {
    console.error("❌ Error fetching subscriber feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
