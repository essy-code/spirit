import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-xl"
        />
      )}

      <div>
        <span className="text-xs bg-red-600 px-2 py-1 rounded">
          {post.category?.name}
        </span>

        <h1 className="text-3xl font-bold mt-2">
          {post.title}
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          {new Date(post.createdAt).toDateString()}
        </p>
      </div>

      <a
  href={`https://wa.me/?text=${encodeURIComponent("Check this out: " + post.title)}`}
  target="_blank"
  className="btn"
>
  Share on WhatsApp
</a>

      <p className="text-gray-300 leading-8 whitespace-pre-line">
        {post.content}
      </p>

    </div>
  );
}