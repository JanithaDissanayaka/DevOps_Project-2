"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        
        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur"></div>

        <div className="relative text-white">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Login to AutoMarket
          </p>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition"
          >
            Login
          </button>

          <p className="text-center text-gray-300 mt-6">
            New here?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
