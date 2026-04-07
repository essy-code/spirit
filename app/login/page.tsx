"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Login successful");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">

      <h1 className="text-2xl font-bold text-purple-400">
        Login
      </h1>

      <input
        placeholder="Email"
        className="w-full p-2 text-black"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 text-black"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="btn text-white w-full"
      >
        Login
      </button>

    </div>
  );
}