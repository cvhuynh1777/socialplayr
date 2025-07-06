import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const TEST_USER_ID = "cmcqr7ros005rw89khqx5uqvr";

export async function POST(req: Request) {
  try {
    const { bio, price } = await req.json();

    // find the capper by ownerId
    const capper = await prisma.capper.findFirst({
      where: { ownerId: TEST_USER_ID },
    });

    if (!capper) {
      console.warn("⚠️ Capper not found for user:", TEST_USER_ID);
      return NextResponse.json(
        { error: "Capper not found" },
        { status: 404 }
      );
    }

    // update using the unique capper.id
    const updatedCapper = await prisma.capper.update({
      where: { id: capper.id },
      data: { bio, price },
    });

    return NextResponse.json({ capper: updatedCapper });
  } catch (error) {
    console.error("🔥 Error updating capper profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
