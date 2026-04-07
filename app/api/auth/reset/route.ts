import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();

  const hashed = await bcrypt.hash(body.password, 10);

  return prisma.user.update({
    where: { email: body.email },
    data: { password: hashed },
  });
}