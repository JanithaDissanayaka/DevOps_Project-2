"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/70 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-start gap-2">

          <span className="text-2xl font-bold text-white tracking-wide">
            Auto<span className="text-yellow-500">Lux</span>
          </span>

        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          <Link
            href="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            href="/cars"
            className="hover:text-yellow-400 transition"
          >
            Browse Cars
          </Link>

          <Link
            href="/sell"
            className="hover:text-yellow-400 transition"
          >
            Sell Car
          </Link>

          <Link
            href="/about"
            className="hover:text-yellow-400 transition"
          >
            About
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search cars..."
            className="hidden lg:block px-4 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          />

          {/* LOGIN */}
          <Link
            href="/"
            className="px-4 py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-yellow-500/10 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-yellow-500/10 transition"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}