// app/api/subscriber/subscriptions/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Temporary hardcoded subscriber for testing
const TEST_SUBSCRIBER_ID = "cmcsj26ev00008o6f8g8r00q1";

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: TEST_SUBSCRIBER_ID },
      include: {
        capper: {
          select: {
            bio: true,
            price: true,
            owner: { select: { name: true, email: true } },
          },
        },
      },
    });

    const formatted = subscriptions.map((sub) => ({
      id: sub.capper.id,
      capperName: sub.capper.owner.name,
      bio: sub.capper.bio,
      price: sub.capper.price,
    }));

    return NextResponse.json({ subscriptions: formatted });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}
