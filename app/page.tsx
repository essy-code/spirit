import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">
        Latest News & Updates
      </h1>

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="card">

            <Link href={`/news/${post.slug}`}>

              {/* IMAGE */}
              {post.image && (
                <img src={post.image} alt="" />
              )}

              {/* CONTENT */}
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
  );
}