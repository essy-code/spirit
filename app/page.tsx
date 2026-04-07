import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <div className="grid md:grid-cols-4 gap-6">

      {/* LEFT */}
      <div className="md:col-span-3 space-y-6">

        {/* FEATURED */}
        {featured && (
          <Link href={`/news/${featured.slug}`}>
            <div className="relative rounded-xl overflow-hidden group">

              {featured.image && (
                <img
                  src={featured.image}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-300"
                />
              )}

              <div className="absolute bottom-0 bg-gradient-to-t from-black p-6 w-full">
                
                <span className="text-xs bg-red-600 px-2 py-1 rounded">
                  {featured.category?.name}
                </span>

                <h1 className="text-2xl font-bold mt-2">
                  {featured.title}
                </h1>

                <p className="text-sm text-gray-300 mt-1">
                  {new Date(featured.createdAt).toDateString()}
                </p>

              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <div key={post.id} className="card group">

              <Link href={`/news/${post.slug}`}>

                {post.image && (
                  <img className="group-hover:scale-105 transition duration-300" src={post.image} />
                )}

                <div className="card-content">

                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                    {post.category?.name}
                  </span>

                  <h2 className="card-title mt-2">
                    {post.title}
                  </h2>

                  <p className="card-text">
                    {post.excerpt || "No description available"}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.createdAt).toDateString()}
                  </p>

                </div>

              </Link>

            </div>
          ))}
        </div>

      </div>

      {/* SIDEBAR */}
      <div className="space-y-4">

        <h2 className="text-lg font-bold border-b border-gray-700 pb-2">
          Latest News
        </h2>

        {posts.slice(0, 5).map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`}>
            <div className="flex gap-3 items-center border-b border-gray-800 pb-2 hover:bg-gray-900 p-2 rounded transition">

              {post.image && (
                <img
                  src={post.image}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              <div>
                <p className="text-sm font-medium">
                  {post.title}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toDateString()}
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}