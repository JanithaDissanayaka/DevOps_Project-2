import Image from "next/image";

const testimonials = [
  {
    name: "Michael R.",
    image: "/user1.jpg",
    review:
      "Smooth booking process and the car was in great condition. Made my business trip stress-free.",
  },
  {
    name: "Amelia W.",
    image: "/user2.jpg",
    review:
      "I loved how quick and easy it was to rent. The car was clean, comfortable and fuel-efficient.",
  },
  {
    name: "The Johnson Family",
    image: "/user3.jpg",
    review:
      "Perfect spacious vehicle for our weekend getaway. Safe, reliable and excellent service.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-100">

      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800">
          Trusted by Thousands of{" "}
          <span className="text-orange-500">Happy Riders</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto flex justify-center gap-8 flex-wrap">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 w-72 text-center shadow-xl relative"
          >

            {/* Profile Image */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white"
              />
            </div>

            {/* Name */}
            <h3 className="mt-12 font-semibold">{item.name}</h3>

            {/* Review */}
            <p className="text-gray-600 text-sm mt-4">{item.review}</p>

            {/* Stars */}
            <div className="text-orange-500 mt-4">★★★★★</div>
          </div>
        ))}

      </div>
    </section>
  );
}