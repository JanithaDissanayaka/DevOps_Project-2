import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    img: "/reson1.png",
    title: "Wide Range of Vehicles",
    desc: "From budget-friendly cars to luxury rides, we’ve got the perfect match for every trip.",
  },
  {
    img: "/reson2.png",
    title: "Easy & Secure Payments",
    desc: "Simple and secure payment options for a smooth booking experience.",
  },
  {
    img: "/reson3.png",
    title: "Hassle-Free Booking",
    desc: "Quick and easy booking process designed to save you time.",
  },
  {
    img: "/reson4.png",
    title: "24/7 Customer Support",
    desc: "Our support team is available anytime to assist your journey.",
  },
];

export default function WhyRide() {
  return (
    <section className="py-24 bg-gray-100">

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800">
          Why <span className="text-orange-500">Ride</span> With Us?
        </h2>

        <p className="text-gray-600 mt-3">
          We make renting a vehicle simple, reliable, and stress-free.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {features.map((item, index) => {

          return (
            <div key={index} className="text-center">

              {/* Animated Circle */}
              <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">

                {/* rotating border */}
                <motion.div
  animate={{ rotate: 360 }}
  transition={{
    repeat: Infinity,
    duration: 4,
    ease: "linear",
  }}
  className="absolute inset-0 rounded-full border-[4px] border-transparent"
  style={{
    background:
      "conic-gradient(#f97316, #f97316, #000000, #000000)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    padding: "8px",
  }}
/>


                {/* image */}
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-white">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </div>

              </div>

              {/* Title */}
              <h3 className="font-semibold text-orange-500 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>

            </div>
          );
        })}

      </div>
    </section>
  );
}
