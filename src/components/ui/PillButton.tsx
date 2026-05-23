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
    "group inline-flex items-center justify-center rounded-full border-2 font-sans text-xs font-extrabold uppercase tracking-widest transition-all duration-500 ease-in-out select-none active:scale-[0.98] overflow-hidden h-12 p-0 min-w-12";

  const variantClasses = {
    lime: "bg-[#B1FC54] text-[#111111] border-[#111111] hover:bg-[#a2ec44] hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    white:
      "bg-white text-[#111111] border-[#111111] hover:bg-gray-50 hover:shadow-[4px_4px_0_0_rgba(17,17,17,1)]",
    dark: "bg-[#111111] text-white border-[#111111] hover:bg-[#222] hover:shadow-[4px_4px_0_0_rgba(177,252,84,0.4)]",
    outline:
      "bg-transparent text-[#111111] border-[#111111] hover:bg-[#111111]/5 hover:shadow-[4px_4px_0_0_rgba(11,37,25,0.15)]",
  };

  const textWrapperClasses =
    "max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-xs group-hover:opacity-100 flex items-center shrink-0";

  const dividerClasses = {
    lime: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
    white: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
    dark: "h-4 w-[1px] bg-white/20 mx-3 shrink-0",
    outline: "h-4 w-[1px] bg-[#111111]/20 mx-3 shrink-0",
  };

  const arrowClasses = {
    lime: "w-8 h-8 rounded-full border border-[#111111] bg-white text-[#111111] flex items-center justify-center text-[10px] transition-all duration-500 ease-in-out group-hover:rotate-[360deg] shrink-0 m-1.5",
    white:
      "w-8 h-8 rounded-full border border-[#111111] bg-[#B1FC54] text-[#111111] flex items-center justify-center text-[10px] transition-all duration-500 ease-in-out group-hover:rotate-[360deg] shrink-0 m-1.5",
    dark: "w-8 h-8 rounded-full border border-white bg-white text-[#111111] flex items-center justify-center text-[10px] transition-all duration-500 ease-in-out group-hover:rotate-[360deg] shrink-0 m-1.5",
    outline:
      "w-8 h-8 rounded-full border border-[#111111] bg-white text-[#111111] flex items-center justify-center text-[10px] transition-all duration-500 ease-in-out group-hover:rotate-[360deg] shrink-0 m-1.5 group-hover:bg-[#B1FC54]",
  };

  const content = (
    <div className="flex items-center justify-center w-full">
      <div className={textWrapperClasses}>
        <span className="pl-5 whitespace-nowrap text-[10px] tracking-wider">{children}</span>
        <span className={dividerClasses[variant]} />
      </div>
      <span className={arrowClasses[variant]}>↗</span>
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
