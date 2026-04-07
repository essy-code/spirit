import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) return NextResponse.json({ error: "User not found" });

  const valid = await bcrypt.compare(body.password, user.password);

  if (!valid) return NextResponse.json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );

  return NextResponse.json({ token });
}