"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, MapPin } from "lucide-react";

const quickLinks = ["Home", "Vehicles", "About Us", "Contact Us"];

const supportLinks = [
  "FAQs",
  "Terms & Conditions",
  "Privacy Policy",
  "Customer Support",
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1226] text-white py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {/* Logo Section */}
        <div>
          <h2 className="text-3xl font-bold">
            Trip<span className="text-orange-500">Go</span>
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Drive your way,<br /> anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-orange-500">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-400">
            {supportLinks.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-orange-500">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          {/* Email Input */}
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 w-full bg-[#1b1f3b] text-sm rounded-l-md outline-none"
            />
            <button className="bg-gray-200 text-black px-4 rounded-r-md">
              →
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Phone size={16} />
            +94 71 5672458
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <MapPin size={16} />
            Colombo, Sri Lanka
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            <Facebook size={20} className="cursor-pointer hover:text-orange-500" />
            <Instagram size={20} className="cursor-pointer hover:text-orange-500" />
            <Twitter size={20} className="cursor-pointer hover:text-orange-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}