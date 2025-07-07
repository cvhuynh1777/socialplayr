import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_USER_ID = "cmcsj26ey00058o6fxischwb1";

export async function GET() {
  try {
    const capper = await prisma.capper.findFirst({
      where: { ownerId: TEST_USER_ID },
      include: {
        picks: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!capper) {
      console.warn("⚠️ Capper not found for user:", TEST_USER_ID);
      return NextResponse.json({
        activePicks: 0,
        avgConfidence: "N/A",
        subscribers: 0,
        totalRevenue: 0,
        recentPicks: [],
      });
    }

    const activePicks = capper.picks.length;
    const avgConfidence =
      activePicks > 0
        ? (
            capper.picks.reduce((sum, p) => sum + (p.confidence ?? 1), 0) /
            activePicks
          ).toFixed(1)
        : "N/A";

    const subscribers = Math.floor(Math.random() * 50) + 10;
    const totalRevenue = parseFloat((subscribers * capper.price).toFixed(2));

    return NextResponse.json({
      activePicks,
      avgConfidence,
      subscribers,
      totalRevenue,
      recentPicks: capper.picks.map((p) => ({
        id: p.id,
        content: p.content,
      })),
    });
  } catch (error) {
    console.error("🔥 Error fetching dashboard data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        activePicks: 0,
        avgConfidence: "N/A",
        subscribers: 0,
        totalRevenue: 0,
        recentPicks: [],
      },
      { status: 500 }
    );
  }
}
