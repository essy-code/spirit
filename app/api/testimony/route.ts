import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const testimony = await prisma.testimony.create({
    data: {
      message: body.message,
      userId: body.userId,
    },
  });

  return NextResponse.json(testimony);
}