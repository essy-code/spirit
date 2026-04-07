import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = await prisma.message.create({
      data: {
        content: body.content,
        userId: body.userId,
      },
    });

    return NextResponse.json(message); // ✅ FIX
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}