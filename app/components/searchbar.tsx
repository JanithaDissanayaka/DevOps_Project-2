"use client";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center mt-16">
      <div className="bg-[#151a2f] text-white rounded-2xl shadow-lg px-8 py-6 flex gap-8 items-end">

        {/* Pickup Location */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Pick-up Location</label>
          <input
            type="text"
            placeholder="Location"
            className="bg-gray-200 text-black px-4 py-2 rounded-md w-56"
          />
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Pick-up Date</label>
          <input
            type="datetime-local"
            className="bg-gray-200 text-black px-4 py-2 rounded-md"
          />
        </div>

        {/* Dropoff Date */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Drop-off Date</label>
          <input
            type="datetime-local"
            className="bg-gray-200 text-black px-4 py-2 rounded-md"
          />
        </div>

        {/* Search Button */}
        <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold">
          Search Car
        </button>

      </div>
    </div>
  );
}