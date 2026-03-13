"use client";

export default function HalfCircleMotion() {
  return (
    <div className="flex justify-center items-center h-[300px] bg-gray-100">
      <svg width="400" height="200" viewBox="0 0 400 200">
        
        {/* background arc */}
        <path
          d="M 50 180 A 150 150 0 0 1 350 180"
          stroke="#1e3a8a"
          strokeWidth="8"
          fill="none"
          opacity="0.3"
        />

        {/* moving orange line */}
        <path
          d="M 50 180 A 150 150 0 0 1 350 180"
          stroke="orange"
          strokeWidth="8"
          fill="none"
          strokeDasharray="100 400"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="500"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

      </svg>
    </div>
  );
}
