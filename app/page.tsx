"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SearchBar from "./components/searchbar";
import Rating from "./components/rating";
import Resons from "./components/resons";



export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">

import SearchBar from "../components/searchbar";
      <SearchBar />
      {/* HERO */}
      <section className="text-center pt-15">

        {/* Main Title */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-orange-500">
          RENT A CAR
        </h1>

        {/* Subtitle */}
        <p className="text-3xl md:text-4xl font-bold text-black mt-4">
          ANYWHERE. ANYTIME
        </p>

        {/* Cars Image */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/hero-car.png"
            alt="Cars"
            width={900}
            height={400}
            className="object-contain"
            priority
          />
        </div>

      </section>

      
      <section className="py-20 bg-gray-100">

      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800">
          Choose the <span className="text-orange-500">Ride</span> That Fits You{" "}
          <span className="text-orange-500">Best</span>
        </h2>
      </div>

      

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

        {/* Card 1 */}
        <div className="relative h-[420px] rounded-2xl overflow-hidden group">
          <Image
            src="/view-3d-car.png"
            alt="Economy Car"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold text-black">Easy Rides</h3>
            <p className="text-sm mb-3">Economy Vehicles</p>

            <Link
              href="/doug-bagg-Z_jNOR_8Fw0-unsplash.png"
              className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition"
            >
              View Vehicles
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative h-[420px] rounded-2xl overflow-hidden group">
          <Image
            src="/doug-bagg-Z_jNOR_8Fw0-unsplash.png"
            alt="Comfort Car"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">Comfort Drive</h3>
            <p className="text-sm mb-3">Mid-Range Vehicles</p>

            <Link
              href="/vehicles"
              className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition"
            >
              View Vehicles
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative h-[420px] rounded-2xl overflow-hidden group">
          <Image
            src="/pexels-emreaslihak-19034268.png"
            alt="Luxury Car"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">Elite Wheels</h3>
            <p className="text-sm mb-3">Luxury Vehicles</p>

            <Link
              href="/vehicles"
              className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition"
            >
              View Vehicles
            </Link>
          </div>
        </div>

      </div>
    </section>

   <Rating/>
   <Resons/>

    </div>
  );
}