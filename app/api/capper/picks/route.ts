import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const TEST_CAPPER_ID = "cmcqr7rot005tw89k6jzv0cku"; // Replace this later with session.user.id

// GET: Fetch picks for current capper only
export async function GET() {
  try {
    const picks = await prisma.pick.findMany({
      where: { capperId: TEST_CAPPER_ID }, // 👈 filter by capper
      include: { capper: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ picks });
  } catch (error) {
    console.error("Error fetching picks:", error);
    return NextResponse.json(
      { error: "Failed to fetch picks" },
      { status: 500 }
    );
  }
}

// POST: Create new pick for capper
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPick = await prisma.pick.create({
      data: {
        content: body.content,
        confidence: body.confidence,
        notes: body.notes || "",
        capperId: body.capperId, // expects capperId from frontend
      },
    });
    return NextResponse.json(newPick);
  } catch (error) {
    console.error("Error creating pick:", error);
    return NextResponse.json(
      { error: "Failed to create pick" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a pick by ID
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    await prisma.pick.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting pick:", error);
    return NextResponse.json(
      { error: "Failed to delete pick" },
      { status: 500 }
    );
  }
}
