"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) router.push("/login");
    };
    checkAuth();
  }, []);

  const vehicles = [
    {
      name: "Tesla Model 3",
      year: 2022,
      price: "Rs 19,500",
      mileage: "18,000 km",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=900",
    },
    {
      name: "Mercedes-Benz C-Class",
      year: 2021,
      price: "Rs 42,000",
      mileage: "25,000 km",
      image:
        "https://images.unsplash.com/photo-1616789916437-bbf724d94f1a?q=80&w=900",
    },
    {
      name: "BMW X5 M Sport",
      year: 2023,
      price: "Rs 68,000",
      mileage: "8,500 km",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=900",
    },
  ];

  const logout = async () => {
    await fetch("/api/auth/logout");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold tracking-wide">
            Auto<span className="text-indigo-400">Lux</span>
          </h1>

          <div className="flex gap-6 items-center">
            <a className="hover:text-indigo-400 cursor-pointer">Browse</a>
            <a className="hover:text-indigo-400 cursor-pointer">Sell</a>
            <a className="hover:text-indigo-400 cursor-pointer">About</a>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-28 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Find Your Dream <span className="text-indigo-400">Luxury Car</span>
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Discover premium vehicles from top brands. Buy, sell, and explore
            the world of luxury automobiles in one place.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold">
              Browse Cars
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/20 hover:border-indigo-400 transition">
              Sell Your Car
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400"
          className="rounded-3xl shadow-2xl"
        />
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-6xl mx-auto px-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-4 gap-4">

          <input
            placeholder="Brand"
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
          />

          <input
            placeholder="Model"
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
          />

          <input
            placeholder="Max Price"
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
          />

          <button className="bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold">
            Search
          </button>

        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <h3 className="text-4xl font-bold mb-12">
          Featured <span className="text-indigo-400">Collection</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {vehicles.map((car, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:scale-[1.03] transition"
            >

              <img
                src={car.image}
                alt={car.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-7">

                <h4 className="text-xl font-semibold mb-2">
                  {car.name}
                </h4>

                <p className="text-gray-400 text-sm">
                  {car.year} • {car.mileage}
                </p>

                <p className="text-2xl font-bold text-indigo-400 mt-4">
                  {car.price}
                </p>

                <button className="mt-5 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
                  View Details
                </button>

              </div>
            </div>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400">
        © 2026 AutoLux — Premium Vehicle Marketplace
      </footer>

    </div>
  );
}