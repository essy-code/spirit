import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  return prisma.message.update({
    where: { id: body.messageId },
    data: { reply: body.reply },
  });
}