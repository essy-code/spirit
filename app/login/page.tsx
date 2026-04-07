import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  return prisma.message.create({
    data: {
      content: body.content,
      userId: body.userId,
    },
  });
}