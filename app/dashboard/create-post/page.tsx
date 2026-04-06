"use client";

import { useState } from "react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
  });

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        authorId: "admin-1",
        categoryId: "cat-1",
      }),
    });

    alert("Post created!");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Create Post</h1>

      <input
        placeholder="Title"
        className="w-full p-2 text-black"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        placeholder="Content"
        className="w-full p-2 text-black"
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <input
        placeholder="Excerpt"
        className="w-full p-2 text-black"
        onChange={(e) =>
          setForm({ ...form, excerpt: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        className="w-full p-2 text-black"
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Publish
      </button>
    </div>
  );
}