"use client";

import React from "react";

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <button
      type="button"
      className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 hover:text-[#FF1800] transition-colors"
      onClick={handleShare}
    >
      Share
    </button>
  );
}
