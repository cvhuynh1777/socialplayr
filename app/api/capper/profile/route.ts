import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {
  try {
    const { bio, price } = await req.json();

    const capper = await prisma.capper.update({
      where: { id: "YOUR_TEST_CAPPER_ID" }, // Replace with dynamic auth later
      data: { bio, price }
    });

    return NextResponse.json({ capper });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
