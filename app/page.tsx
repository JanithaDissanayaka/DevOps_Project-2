"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";   // ✅ missing import

export default function LoginPage() {

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleLogin = async () => {

    setLoading(true);

    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,password})
    });

    setLoading(false);

    if(res.ok){
      router.push("/home");
    }else{
      alert("Invalid credentials");
    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)"
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Auto<span className="text-yellow-500">Lux</span>
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Sign in to buy or sell luxury cars
        </p>

        <form
          onSubmit={(e)=>{
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-5"
        >

          {/* EMAIL */}
          <input
            type="text"
            placeholder="Email or Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* REGISTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>

  );
}