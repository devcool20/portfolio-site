import Link from "next/link";
import React from "react";

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
  const baseClasses =
    "group inline-flex items-center gap-3.5 px-6 py-3 rounded-full border-2 font-jakarta text-xs font-extrabold uppercase tracking-widest transition-all duration-300 select-none active:scale-[0.98]";

  const variantClasses = {
    lime: "bg-[#B1FC54] text-[#111111] border-[#111111] hover:bg-[#a2ec44] hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    white:
      "bg-white text-[#111111] border-[#111111] hover:bg-gray-50 hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    dark: "bg-[#111111] text-white border-[#111111] hover:bg-[#222] hover:shadow-[4px_4px_0_0_rgba(177,252,84,0.4)]",
    outline:
      "bg-transparent text-[#111111] border-[#111111] hover:bg-[#111111]/5 hover:shadow-[4px_4px_0_0_rgba(11,37,25,0.15)]",
  };

  const dividerClasses = {
    lime: "h-4 w-[1px] bg-[#111111]/20",
    white: "h-4 w-[1px] bg-[#111111]/20",
    dark: "h-4 w-[1px] bg-white/20",
    outline: "h-4 w-[1px] bg-[#111111]/20",
  };

  const arrowClasses = {
    lime: "w-6 h-6 rounded-full border border-[#111111] flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    white:
      "w-6 h-6 rounded-full border border-[#111111] flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    dark: "w-6 h-6 rounded-full border border-white flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    outline:
      "w-6 h-6 rounded-full border border-[#111111] flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  };

  const content = (
    <>
      <span className="shrink-0">{children}</span>
      <span className={dividerClasses[variant]} />
      <span className={arrowClasses[variant]}>↗</span>
    </>
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
