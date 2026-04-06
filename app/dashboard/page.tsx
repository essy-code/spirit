import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <Link
        href="/dashboard/create-post"
        className="bg-blue-600 px-4 py-2 rounded"
      >
        + Create Post
      </Link>
    </div>
  );
}