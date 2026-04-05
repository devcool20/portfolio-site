"use client";

import React from "react";
import { tabs } from "@/lib/data";
import HandDrawnButton from "./HandDrawnButton";

export default function NavTabs({
  activeTab,
  onChange,
  isHome = true,
}: {
  activeTab: string;
  onChange?: (value: string) => void;
  isHome?: boolean;
}) {
  return (
    <nav className="flex flex-row gap-3 text-sm text-gray-500 md:flex-col md:gap-5 md:text-[13px] flex-wrap font-mono uppercase tracking-[0.12em]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        
        // Logic for handling clicks:
        // 1. If it's the "blog" tab, it always links to /blog (handled by href prop in HandDrawnButton)
        // 2. If we are on Home (isHome=true), other tabs use onChange to switch content
        // 3. If we are on Blog (isHome=false), other tabs must link back to Home with a query param
        
        let href = tab.href;
        let onClick = undefined;

        if (tab.id === "blog") {
             // Keep existing href="/blog"
        } else {
            if (isHome && onChange) {
                onClick = () => onChange(tab.id);
            } else {
                href = `/?tab=${tab.id}`;
            }
        }

        return (
          <HandDrawnButton
            key={tab.id}
            label={tab.label}
            isActive={isActive}
            onClick={onClick}
            href={href}
          />
        );
      })}
    </nav>
  );
}
