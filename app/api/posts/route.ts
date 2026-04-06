import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const slug = generateSlug(body.title);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: slug,
        content: body.content,
        excerpt: body.excerpt,
        image: body.image,
        status: "PUBLISHED",
        authorId: "admin-1",
        categoryId: "cat-1",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" });
  }
}