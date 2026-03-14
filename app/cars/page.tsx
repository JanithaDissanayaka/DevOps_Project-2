"use client";

import Image from "next/image";
import SearchBar from "../components/searchbar";

const cars = [
  {
    name: "BMW 7 Series",
    price: 5300,
    img: "/cars/bmw.png",
  },
  {
    name: "Mercedes-Benz S-Class",
    price: 7500,
    img: "/cars/mercedes.png",
  },
  {
    name: "Lexus LS",
    price: 6500,
    img: "/cars/lexus.png",
  },
  {
    name: "Mazda CX-5",
    price: 4200,
    img: "/cars/mazda.png",
  },
  {
    name: "Audi e-tron GT",
    price: 8200,
    img: "/cars/audi.png",
  },
  {
    name: "Kia Telluride",
    price: 6000,
    img: "/cars/kia.png",
  },
];

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <SearchBar/>

      {/* Title */}
      <div className="text-center mb-14 pt-10 ">
        <h1 className="text-4xl font-bold text-gray-800">
          Available <span className="text-orange-500">Vehicles</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Choose your perfect ride for your journey
        </p>
      </div>

      {/* Cars Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {cars.map((car, index) => (
          <div
            key={index}
            className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* Car Image */}
            <Image
              src={car.img}
              alt={car.name}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute top-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">{car.name}</h3>

              <div className="flex gap-2 mt-2 text-xs">
                <span className="bg-white/20 px-2 py-1 rounded">5</span>
                <span className="bg-white/20 px-2 py-1 rounded">Petrol</span>
                <span className="bg-white/20 px-2 py-1 rounded">Automatic</span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">

              <div>
                <p className="text-xs">LKR.</p>
                <p className="text-2xl font-bold">{car.price} <span className="text-sm font-normal">/ Day</span></p>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-semibold">
                BOOK NOW
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}