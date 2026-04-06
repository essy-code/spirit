import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 🔥 FIX: await params (IMPORTANT for Next.js 16)
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto">

      {post.image && (
        <img
          src={post.image}
          alt=""
          className="w-full rounded-xl mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-300 leading-7 whitespace-pre-line">
        {post.content}
      </p>

    </div>
  );
}