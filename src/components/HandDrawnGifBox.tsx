"use client";

import React from "react";
import Image from "next/image";

interface HandDrawnGifBoxProps {
  src: string;
  alt: string;
}

export default function HandDrawnGifBox({
  src,
  alt,
}: HandDrawnGifBoxProps) {
  return (
    <div className="relative w-full h-20 md:h-24 animate-fade-in">
      {/* Hand-drawn border SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {/* Multiple imperfect rectangle strokes for hand-drawn effect */}
        <rect
          x="2%"
          y="8%"
          width="96%"
          height="84%"
          rx="4"
          ry="4"
          fill="none"
          stroke="#2f2822"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6,4"
        />
        {/* Second overlapping stroke for sketchy effect */}
        <rect
          x="2.5%"
          y="10%"
          width="95%"
          height="80%"
          rx="4"
          ry="4"
          fill="none"
          stroke="#2f2822"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
      
      {/* GIF container */}
      <div className="absolute inset-[6px] overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
    </div>
  );
}
