import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_SUBSCRIBER_ID = "cmcsmr0dm00008obnymtxjfy9";

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: TEST_SUBSCRIBER_ID },
      include: {
        capper: { select: { id: true, owner: { select: { name: true } } } },
      },
    });

    const formatted = subscriptions.map((s) => ({
      capperId: s.capper.id,
      capperName: s.capper.owner.name,
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

export async function POST(req: Request) {
  try {
    const { capperId } = await req.json();

    const subscription = await prisma.subscription.create({
      data: {
        subscriberId: TEST_SUBSCRIBER_ID,
        capperId,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { capperId } = await req.json();

    await prisma.subscription.delete({
      where: {
        subscriberId_capperId: {
          subscriberId: TEST_SUBSCRIBER_ID,
          capperId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
