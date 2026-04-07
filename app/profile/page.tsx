import { prisma } from "@/lib/prisma";

export default async function Profile() {
  const user = await prisma.user.findFirst();

  return (
    <div className="container space-y-4">
      <h1 className="text-xl font-bold text-purple-400">My Profile</h1>

      <div className="card p-4">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
}