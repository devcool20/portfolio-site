"use client";

import React, { useEffect, useRef } from "react";
import HandDrawnGifBox from "./HandDrawnGifBox";

export default function HeaderSection() {
  const toggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.setAttribute(
      "data-theme",
      shouldUseDark ? "dark" : "light",
    );
    if (toggleRef.current) {
      toggleRef.current.checked = shouldUseDark;
    }
  }, []);

  const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDarkMode = event.target.checked;
    document.documentElement.setAttribute(
      "data-theme",
      nextDarkMode ? "dark" : "light",
    );
    window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <header className="mb-16 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-4 md:gap-8">
        <div className="flex flex-col items-start">
          <h1 className="name-heading whitespace-nowrap">Divyanshu Sharma</h1>
          <label className="theme-toggle mt-3">
            <input
              ref={toggleRef}
              type="checkbox"
              onChange={handleThemeToggle}
              className="theme-toggle-input"
              role="switch"
              aria-label="Toggle dark mode"
            />
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-label">Dark mode</span>
          </label>
        </div>
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
