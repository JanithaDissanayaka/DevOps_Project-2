"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0d1325] border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-white">Trip</span>
          <span className="text-orange-500">Go</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 text-white font-medium">
          <Link href="/" className="hover:text-orange-400 transition">
            Home
          </Link>

          <Link href="/cars" className="hover:text-orange-400 transition">
            Vehicles
          </Link>

          <Link href="/contactus" className="hover:text-orange-400 transition">
            Contact Us
          </Link>

          <Link href="/aboutus" className="hover:text-orange-400 transition">
            About Us
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/loging"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold transition"
        >
          Login | Register
        </Link>
      </div>
    </nav>
  );
}