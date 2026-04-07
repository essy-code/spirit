import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const updated = await prisma.message.update({
      where: { id: body.messageId },
      data: { reply: body.reply },
    });

    return NextResponse.json(updated); // ✅ FIX
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reply" },
      { status: 500 }
    );
  }
}