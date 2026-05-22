"use client";

import React from "react";
import PillButton from "@/components/ui/PillButton";

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
    <PillButton variant="outline" onClick={handleShare}>
      Share
    </PillButton>
  );
}
