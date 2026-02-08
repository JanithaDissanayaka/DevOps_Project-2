export default function HomePage() {
  const vehicles = [
    {
      name: "Tesla Model 3",
      year: 2022,
      price: "Rs19,500",
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
      price: "Rs68,000",
      mileage: "8,500 km",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=900",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Auto<span className="text-indigo-400">Lux</span>
          </h1>

          <div className="hidden md:flex gap-10 text-sm text-gray-300">
            <a className="hover:text-white transition">Browse</a>
            <a className="hover:text-white transition">Sell</a>
            <a className="hover:text-white transition">About</a>
            <button className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-28 text-center">
          <h2 className="text-6xl font-extrabold tracking-tight mb-6">
            Drive the <span className="text-indigo-400">Future</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
            Explore certified luxury vehicles from trusted sellers worldwide.
            Seamless buying. Absolute transparency.
          </p>

          <div className="flex justify-center gap-6">
            <button className="px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition">
              Explore Cars
            </button>
            <button className="px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition">
              Sell Your Car
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex justify-between items-end mb-14">
          <h3 className="text-4xl font-bold">
            Featured <span className="text-indigo-400">Collection</span>
          </h3>
          <a className="text-sm text-indigo-400 hover:text-indigo-300 transition">
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {vehicles.map((car, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/40 transition"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xl font-semibold">
                    {car.name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {car.year}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {car.mileage}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-indigo-400">
                    {car.price}
                  </p>
                  <button className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © 2026 AutoLux — Luxury Vehicle Marketplace
      </footer>
    </div>
  );
}
