import { Car, CreditCard, ShieldCheck, Headphones } from "lucide-react";
import MovingEllipse from "./movingellipse";

const features = [
  {
    icon: Car,
    title: "Wide Range of Vehicles",
    desc: "From budget-friendly cars to luxury rides, we’ve got the perfect match for every trip.",
  },
  {
    icon: CreditCard,
    title: "Easy & Secure Payments",
    desc: "Simple and secure payment options for a smooth booking experience.",
  },
  {
    icon: ShieldCheck,
    title: "Hassle-Free Booking",
    desc: "Quick and easy booking process designed to save you time.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Our support team is available anytime to assist your journey.",
  },
];

export default function WhyRide() {
  return (
    <section className="py-24 bg-gray-100">

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          Why <span className="text-orange-500">Ride</span> With Us?
        </h2>

        <p className="text-gray-600 mt-3">
          We make renting a vehicle simple, reliable, and stress-free.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="text-center">
              <MovingEllipse/>


              {/* Icon Circle */}
              <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full border-8 border-orange-500 text-black mb-6">
                <Icon size={50} />
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