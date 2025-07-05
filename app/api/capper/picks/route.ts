// app/api/capper/picks/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const picks = await prisma.pick.findMany({
      include: { capper: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ picks });
  } catch (error) {
    console.error("Error fetching picks:", error);
    return NextResponse.json({ error: "Failed to fetch picks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPick = await prisma.pick.create({
      data: {
        content: body.content,
        confidence: body.confidence,
        notes: body.notes || "",
        capperId: body.capperId // assumes capperId is passed in body
      }
    });
    return NextResponse.json(newPick);
  } catch (error) {
    console.error("Error creating pick:", error);
    return NextResponse.json({ error: "Failed to create pick" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    await prisma.pick.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting pick:", error);
    return NextResponse.json({ error: "Failed to delete pick" }, { status: 500 });
  }
}
