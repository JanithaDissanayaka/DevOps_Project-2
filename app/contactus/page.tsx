"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className=" rounded-lg overflow-hidden">
          <Image
            src="/contactus.png"
            alt="contact"
            width={500}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT FORM */}
        <div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch...
          </h2>

          <p className="text-gray-500 mb-8">
            Have a question about a vehicle, your booking, or anything else?
            We're here to help. Fill out the form below and we'll get back to
            you as soon as possible.
          </p>

          <form className="space-y-5">

            {/* NAME ROW */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-md outline-none"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-md outline-none"
              />
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-md outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-md outline-none"
              />
            </div>

            {/* MESSAGE */}
            <textarea
              placeholder="Enter your message here..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
            >
              SEND
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}