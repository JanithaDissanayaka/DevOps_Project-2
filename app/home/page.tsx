"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {

  const router = useRouter();
  const carouselRef = useRef(null);

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
      name: "Mercedes C-Class",
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
    {
      name: "Audi RS7",
      year: 2023,
      price: "Rs 75,000",
      mileage: "6,000 km",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=900",
    },
  ];

  const logout = async () => {
    await fetch("/api/auth/logout");
    router.push("/");
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -350,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 350,
      behavior: "smooth"
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-semibold tracking-wide">
            Auto<span className="text-yellow-400">Lux</span>
          </h1>

          <div className="flex gap-8 items-center text-sm">
            <button onClick={() => router.push("/browse")} className="hover:text-yellow-400 transition">Browse</button>
            <button onClick={() => router.push("/sell")} className="hover:text-yellow-400 transition">Sell</button>
            <button onClick={() => router.push("/about")} className="hover:text-yellow-400 transition">About</button>

            <button
              onClick={logout}
              className="px-5 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>


      {/* HERO */}
      <section className="h-screen flex items-center relative overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          className="absolute w-full h-full object-cover opacity-40"
        />

        <div className="max-w-7xl mx-auto px-8 relative">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <h2 className="text-7xl font-bold leading-tight">
              Find Your
              <br />
              <span className="text-yellow-400">Luxury Car</span>
            </h2>

            <p className="text-gray-400 mt-6 max-w-xl text-lg">
              Buy and sell premium vehicles with confidence.
              Discover curated luxury cars from top brands worldwide.
            </p>

            <div className="flex gap-6 mt-10">

              <button
                onClick={() => router.push("/browse")}
                className="px-8 py-4 bg-yellow-400 text-black rounded-lg font-medium hover:scale-105 transition"
              >
                Browse Cars
              </button>

              <button
                onClick={() => router.push("/sell")}
                className="px-8 py-4 border border-white/20 rounded-lg hover:border-yellow-400 transition"
              >
                Sell Car
              </button>

            </div>

          </motion.div>

        </div>

      </section>


      {/* FEATURED */}
<section className="max-w-10xl mx-auto px-8 py-24 overflow-hidden">

  <div className="flex justify-center items-center mb-14">
    <h3 className="text-4xl font-semibold">
      Featured <span className="text-yellow-400">Cars</span>
    </h3>
  </div>
  <div className="relative overflow-hidden">

    <motion.div
      className="flex gap-8"
      animate={{ x: ["0px", "-1056px"] }}
      transition={{
        ease: "linear",
        duration: 18,
        repeat: Infinity
      }}
    >

      {[...vehicles, ...vehicles, ...vehicles].map((car, i) => (

        <div
          key={i}
          className="min-w-[320px] bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-400/50 transition group"
        >

          <div className="h-56 overflow-hidden">
            <img
              src={car.image}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className="p-6">

            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold">{car.name}</h4>

              <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                {car.year}
              </span>
            </div>

            <p className="text-gray-400 text-sm">
              Mileage: {car.mileage}
            </p>

            <div className="flex justify-between items-center mt-6">

              <p className="text-yellow-400 font-semibold text-lg">
                {car.price}
              </p>

              <button
                onClick={() => router.push(`/car/${i}`)}
                className="text-sm border border-white/20 px-3 py-1 rounded hover:border-yellow-400 transition"
              >
                Details
              </button>

            </div>

          </div>

        </div>

      ))}

    </motion.div>

  </div>
  <div className="flex justify-center items-center mb-14 pt-4">
    <button
      onClick={() => router.push("/browse")}
      className="text-sm border border-white/20 px-4 py-2 rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition justify-end ml-auto"
    >
      View All
    </button>
  </div>

</section>

      {/* BROWSE + FILTER */}
      <section className="max-w-12xl mx-auto px-8 pb-24">

        <h3 className="text-4xl font-semibold mb-10 justify-center items-center flex">
          Browse <span className="text-yellow-400">Cars</span>
        </h3>

        <div className="grid grid-cols-12 gap-10">

          {/* FILTER MENU */}
          <div className="col-span-3">

            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24">

              <h4 className="text-lg font-semibold mb-6">
                Filters
              </h4>

              <div className="mb-6">
                <label className="text-sm text-gray-400">Brand</label>
                <select className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2">
                  <option>All</option>
                  <option>Tesla</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400">Max Price</label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400">Year</label>
                <select className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2">
                  <option>Any</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>

              <button className="w-full mt-4 bg-yellow-400 text-black py-2 rounded-lg font-medium hover:bg-yellow-300">
                Apply Filters
              </button>

            </div>

          </div>


          {/* RESULTS */}
          <div className="col-span-9">

            <div className="grid md:grid-cols-3 gap-8">

              {vehicles.map((car, i) => (

                <div
                  key={i}
                  className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-400/50 transition group"
                >

                  <div className="h-48 overflow-hidden">
                    <img
                      src={car.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  <div className="p-5">

                    <h4 className="text-lg font-semibold">{car.name}</h4>

                    <p className="text-gray-400 text-sm mt-1">
                      Mileage: {car.mileage}
                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <p className="text-yellow-400 font-semibold">
                        {car.price}
                      </p>

                      <button
                        onClick={() => router.push(`/car/${i}`)}
                        className="text-sm border border-white/20 px-3 py-1 rounded hover:border-yellow-400"
                      >
                        Details
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}