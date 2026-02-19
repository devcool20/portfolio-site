"use client";

import React from "react";
import HandDrawnGifBox from "./HandDrawnGifBox";

export default function HeaderSection() {
  return (
    <header className="mb-16 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-4 md:gap-8">
        <h1 className="name-heading whitespace-nowrap">
          Divyanshu Sharma
        </h1>
        <div className="translate-y-4 md:translate-y-6">
          <HandDrawnGifBox
            src="/f1-monaco.gif"
            alt="Formula 1 Monaco Grand Prix racing"
          />
        </div>
      </div>
      <p className="text-[#8d857a] text-lg md:text-xl mt-4">
        Software Developer
      </p>
      <div className="flex items-center gap-2 mt-4 text-sm text-[#a39990]">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Available for opportunities</span>
      </div>
    </header>
  );
}
