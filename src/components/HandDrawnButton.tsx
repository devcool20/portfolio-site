"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HandDrawnButtonProps {
  label: string;
  isActive: boolean;
  onClick?: () => void;
  href?: string;
}

export default function HandDrawnButton({
  label,
  isActive,
  onClick,
  href,
}: HandDrawnButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sharedClassName = `relative inline-block text-center px-2 py-1 lowercase transition-colors z-10 ${
    isActive ? "text-[#FF1800]" : "text-gray-500 hover:text-gray-300"
  }`;

  const inner = (
    <>
      <span className="relative z-10">{label}</span>

      {/* SVG Container */}
      <div
        className={`absolute inset-0 -z-10 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "scale(1.2)",
        }}
      >
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{
            overflow: "visible",
          }}
        >
          <path
            d="M10,20 C10,10 25,5 50,5 C75,5 90,10 90,20 C90,30 75,35 50,35 C25,35 10,30 10,20 C10,12 25,8 50,8 C75,8 92,12 92,22 C92,32 75,38 50,38 C25,38 8,32 8,22"
            fill="none"
            stroke="rgba(255,24,0,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hand-drawn-path"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: isHovered ? 0 : 600,
              transition: "stroke-dashoffset 2.25s ease-out",
            }}
          />
        </svg>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={sharedClassName}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={sharedClassName}
      aria-pressed={isActive}
    >
      {inner}
    </button>
  );
}
