"use client";

import React, { useEffect, useRef } from "react";
import BlogBlueprintBanner from "./blog/BlogBlueprintBanner";

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
    <header className="mb-12 md:mb-16 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-4 md:gap-8">
        <div className="flex flex-col items-start">
          <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white whitespace-nowrap">
            Divyanshu Sharma
          </h1>
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
            <span className="theme-toggle-label text-gray-500">Dark mode</span>
          </label>
        </div>
        <div className="translate-y-4 md:translate-y-6 w-full min-w-0">
          <BlogBlueprintBanner />
        </div>
      </div>
      <p className="text-gray-400 text-base md:text-lg mt-4 font-light">
        Software Developer
      </p>
      <div className="flex items-center gap-2 mt-4 text-xs font-mono uppercase tracking-[0.12em] text-gray-500">
        <span className="w-2 h-2 bg-[#FF1800] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,24,0,0.6)]" />
        <span>Available for opportunities</span>
      </div>
    </header>
  );
}
