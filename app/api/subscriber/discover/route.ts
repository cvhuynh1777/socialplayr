import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_SUBSCRIBER_ID = "cmcsmr0dm00008obnymtxjfy9";

export async function GET() {
  try {
    const subscribedIds = await prisma.subscription.findMany({
      where: { subscriberId: TEST_SUBSCRIBER_ID },
      select: { capperId: true },
    });

    const excludeIds = subscribedIds.map((s) => s.capperId);

    const cappers = await prisma.capper.findMany({
      where: { id: { notIn: excludeIds } },
      include: { owner: { select: { name: true } } },
    });

    const formatted = cappers.map((c) => ({
      id: c.id,
      ownerName: c.owner.name,
      bio: c.bio,
    }));

    return NextResponse.json({ cappers: formatted });
  } catch (error) {
    console.error("Error fetching discover cappers:", error);
    return NextResponse.json(
      { error: "Failed to fetch discover cappers" },
      { status: 500 }
    );
  }
}
