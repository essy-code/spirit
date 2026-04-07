import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const featured = posts[0];
  const rest = posts.slice(1, 5);

  return (
    <div className="space-y-10">

      {/* HERO SECTION */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-purple-400">
          Spirit Surge Network
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto">
          A Wave of the Spirit, A Rise of a Generation.
        </p>
      </div>

      {/* VISION */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-purple-300">Our Vision</h2>
        <p className="text-gray-300 mt-2">
          To ignite a Spirit-led movement of young people empowered by faith,
          united in purpose, and driven to transform lives and communities.
        </p>
      </div>

      {/* MISSION */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-purple-300">Our Mission</h2>
        <p className="text-gray-300 mt-2">
          To raise a generation deeply rooted in Christ, bold in faith,
          passionate in worship, and committed to serving others.
        </p>
      </div>

      {/* FEATURED */}
      {featured && (
        <Link href={`/news/${featured.slug}`}>
          <div className="card">
            {featured.image && (
              <img src={featured.image} className="w-full h-[300px] object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{featured.title}</h2>
            </div>
          </div>
        </Link>
      )}

      {/* NEWS */}
      <div className="grid md:grid-cols-2 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`}>
            <div className="card p-4">
              <h3>{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}