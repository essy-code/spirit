import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.update({
      where: { email: body.email },
      data: { password: hashed },
    });

    return NextResponse.json(user); // ✅ FIX
  } catch (error) {
    return NextResponse.json(
      { error: "Password reset failed" },
      { status: 500 }
    );
  }
}