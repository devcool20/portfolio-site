import React from "react";

type FlagLogoProps = {
  className?: string;
  size?: number;
};

export default function FlagLogo({ className = "", size = 24 }: FlagLogoProps) {
  // Compute width/height ratios based on standard 28x24 viewBox
  const width = size * (28 / 24);
  const height = size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Left slanted panel */}
      <polygon points="2,22 9,2 17,2 10,22" />
      {/* Right slanted panel */}
      <polygon points="12,22 19,2 27,2 20,22" />
    </svg>
  );
}
