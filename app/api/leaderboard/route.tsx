// app/api/leaderboard/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await prisma.capper.findMany({
      select: {
        price: true,
        owner: { select: { name: true } },
        picks: true
      }
    });

    const leaderboardData = leaderboard.map((capper) => {
      const totalWagered = capper.picks.length * capper.price;
      const totalPayout = capper.picks.reduce(
        (sum, pick) => sum + (pick.confidence || 1) * capper.price,
        0
      );
      const roi =
        totalWagered > 0
          ? ((totalPayout - totalWagered) / totalWagered) * 100
          : 0;

      return {
        capperName: capper.owner.name,
        roi: parseFloat(roi.toFixed(2)),
        totalWagered,
        totalPayout
      };
    });

    return NextResponse.json({ leaderboard: leaderboardData });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
