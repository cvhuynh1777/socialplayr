import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_SUBSCRIBER_ID = "cmcsmr0dm00008obnymtxjfy9";

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: TEST_SUBSCRIBER_ID },
      select: { capperId: true },
    });

    const capperIds = subscriptions.map((sub) => sub.capperId);

    if (capperIds.length === 0) {
      return NextResponse.json({ picks: [] });
    }

    const picks = await prisma.pick.findMany({
      where: { capperId: { in: capperIds } },
      include: {
        capper: { select: { owner: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = picks.map((p) => ({
      id: p.id,
      content: p.content,
      capperName: p.capper.owner.name,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ picks: formatted });
  } catch (error) {
    console.error("Error fetching subscriber feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
