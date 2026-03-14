"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

      // save login token
      localStorage.setItem("token","loggedin");

      router.push("/");
      router.refresh();

    }else{
      alert("Invalid credentials");
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Trip<span className="text-orange-500">Go</span>
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Sign in to rent your perfect ride
        </p>

        <form
          onSubmit={(e)=>{
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-5"
        >

          {/* Username */}
          <input
            type="text"
            placeholder="Email or Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-gray-400 text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link
            href="/register"
            className="text-orange-400 hover:underline"
        >
            Register
        </Link>
        </p>


      </div>

    </div>
  );
}
