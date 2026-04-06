import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <div className="grid md:grid-cols-4 gap-6">

      {/* LEFT SIDE */}
      <div className="md:col-span-3 space-y-6">

        {/* 🔥 FEATURED POST */}
        {featured && (
          <Link href={`/news/${featured.slug}`}>
            <div className="relative rounded-xl overflow-hidden">

              {featured.image && (
                <img
                  src={featured.image}
                  className="w-full h-[400px] object-cover"
                />
              )}

              <div className="absolute bottom-0 bg-gradient-to-t from-black p-6 w-full">
                <h1 className="text-2xl font-bold">
                  {featured.title}
                </h1>
              </div>

            </div>
          </Link>
        )}

        {/* 📰 OTHER POSTS */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <div key={post.id} className="card">

              <Link href={`/news/${post.slug}`}>

                {post.image && (
                  <img src={post.image} />
                )}

                <div className="card-content">
                  <h2 className="card-title">{post.title}</h2>
                  <p className="card-text">
                    {post.excerpt || "No description available"}
                  </p>
                </div>

              </Link>

            </div>
          ))}
        </div>

      </div>

      {/* 📌 SIDEBAR */}
      <div className="space-y-4">

        <h2 className="text-lg font-bold">Latest</h2>

        {posts.slice(0, 5).map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`}>
            <div className="flex gap-3 items-center border-b border-gray-800 pb-2">

              {post.image && (
                <img
                  src={post.image}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              <p className="text-sm">{post.title}</p>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}