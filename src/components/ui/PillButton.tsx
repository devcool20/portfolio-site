"use client";

import Link from "next/link";
import React, { useState } from "react";

type PillButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: "lime" | "white" | "dark" | "outline";
  className?: string;
  target?: string;
  type?: "button" | "submit";
};

export default function PillButton({
  children,
  href,
  onClick,
  variant = "lime",
  className = "",
  target,
  type = "button",
}: PillButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const baseClasses =
    "group inline-flex items-center justify-center rounded-full border-2 font-sans text-xs font-extrabold uppercase tracking-widest transition-all duration-500 ease-in-out select-none active:scale-[0.98] overflow-hidden h-12 p-0 min-w-12";

  const variantClasses = {
    lime: "bg-[#B1FC54] text-[#111111] border-[#111111] hover:bg-[#a2ec44] hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    white:
      "bg-white text-[#111111] border-[#111111] hover:bg-gray-50 hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    dark: "bg-[#111111] text-white border-[#111111] hover:bg-[#222] hover:shadow-[4px_4px_0_0_rgba(177,252,84,0.4)]",
    outline:
      "bg-transparent text-[#111111] border-[#111111] hover:bg-[#111111]/5 hover:shadow-[4px_4px_0_0_rgba(11,37,25,0.15)]",
  };

  const textWrapperClasses = `overflow-hidden transition-all duration-500 ease-in-out flex items-center shrink-0 ${
    isExpanded
      ? "max-w-xs opacity-100"
      : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
  }`;

  const dividerClasses = {
    lime: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
    white: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
    dark: "h-4 w-[1px] bg-white/20 mx-3 shrink-0",
    outline: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
  };

  const arrowVariantClasses = {
    lime: "border-[#111111] bg-white text-[#111111]",
    white: "border-[#111111] bg-[#B1FC54] text-[#111111]",
    dark: "border-white bg-white text-[#111111]",
    outline: "border-[#111111] bg-white text-[#111111] group-hover:bg-[#B1FC54]",
  };

  const arrowClasses = `w-8 h-8 rounded-full border flex items-center justify-center text-[10px] transition-all duration-500 ease-in-out shrink-0 m-1.5 ${
    arrowVariantClasses[variant]
  } ${isExpanded ? "rotate-[360deg] bg-[#B1FC54]!" : "group-hover:rotate-[360deg]"}`;

  const handleArrowClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpanded((prev) => !prev);
  };

  const content = (
    <div className="flex items-center justify-center w-full">
      <div className={textWrapperClasses}>
        <span className="pl-5 whitespace-nowrap text-[10px] tracking-wider">{children}</span>
        <span className={dividerClasses[variant]} />
      </div>
      <span className={arrowClasses} onClick={handleArrowClick}>
        ↗
      </span>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          target={target ?? "_blank"}
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        target={target}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
