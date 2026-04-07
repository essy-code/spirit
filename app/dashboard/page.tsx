import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const users = await prisma.user.findMany();
  const messages = await prisma.message.findMany({
    include: { user: true },
  });

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold text-purple-400">
        Admin Dashboard
      </h1>

      {/* USERS */}
      <div className="card p-4">
        <h2 className="font-bold">Users</h2>

        {users.map((u) => (
          <div key={u.id} className="border-b border-gray-700 py-2">
            {u.name} - {u.email} ({u.role})
          </div>
        ))}
      </div>

      {/* MESSAGES */}
      <div className="card p-4">
        <h2 className="font-bold">Messages</h2>

        {messages.map((m) => (
          <div key={m.id} className="border-b border-gray-700 py-2">
            <p>{m.user.name}</p>
            <p className="text-sm text-gray-400">{m.content}</p>
            <p className="text-green-400">{m.reply}</p>
          </div>
        ))}
      </div>

    </div>
  );
}