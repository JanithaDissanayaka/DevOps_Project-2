"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) router.push("/login");
    else alert("Registration failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        
        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 opacity-20 blur"></div>

        <div className="relative text-white">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Join AutoMarket today 🚗
          </p>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:scale-[1.02] transition"
          >
            Register
          </button>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <a href="/" className="text-green-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
