"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleRegister = async () => {

    setLoading(true);

    const res = await fetch("/api/auth/register",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({username,password})
    });

    setLoading(false);

    if(res.ok){
      router.push("/login");
    }else{
      alert("Registration failed");
    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1493238792000-8113da705763)"
      }}
    >

      {/* LIGHTER OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Auto<span className="text-yellow-500">Lux</span>
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Create your AutoLux account 🚗
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/loging"
            className="text-yellow-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}