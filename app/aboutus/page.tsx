"use client";

import { Car, Star, CheckCircle, Settings } from "lucide-react";

const stats = [
  {
    icon: Car,
    title: "100+",
    text: "Vehicles Available in Various Types",
  },
  {
    icon: Settings,
    title: "Service",
    text: "Cover 25 Districts in Country",
  },
  {
    icon: Star,
    title: "Rated 4.5 /5",
    text: "By Happy Clients",
  },
  {
    icon: CheckCircle,
    title: "800 +",
    text: "Booking completed",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-20 px-6">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-6xl font-bold text-gray-900">
          Trip<span className="text-orange-500">Go</span>
        </h1>

        <p className="text-gray-600 mt-2">
          Drive your way, anytime, anywhere.
        </p>
      </div>

      {/* STORY */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Story</h2>

        <p className="text-gray-600">
          At TripGo Rentals, we believe car rentals should be simple,
          affordable, and stress-free. What started as a small local
          service has grown into a trusted platform for travelers and
          professionals alike. Whether it&apos;s a quick city ride or a
          luxury weekend getaway, we provide vehicles that fit every
          lifestyle.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-center mb-20">

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">MISSION</h3>

          <p className="text-gray-600">
            To deliver convenient, affordable, and reliable vehicle
            rentals that empower people to travel with freedom and
            peace of mind.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">VISION</h3>

          <p className="text-gray-600">
            To become the most trusted car rental brand known for
            innovation, customer care, and a wide range of vehicles
            that cater to every journey.
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
            >

              <Icon size={40} className="text-orange-500 mb-4" />

              <h4 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                {item.text}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}
