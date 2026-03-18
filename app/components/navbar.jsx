"use client";

import Link from "next/link";

export default function Navbar() {

  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-[#0d1325] border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-white">Trip</span>
          <span className="text-orange-500">Go</span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-10 text-white font-medium">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <Link href="/cars" className="hover:text-orange-400">Vehicles</Link>
          <Link href="/contactus" className="hover:text-orange-400">Contact Us</Link>
          <Link href="/aboutus" className="hover:text-orange-400">About Us</Link>
        </div>

        {/* Right Side */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold"
          >
            Login | Register
          </Link>
          
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}
