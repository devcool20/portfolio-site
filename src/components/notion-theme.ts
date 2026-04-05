/** Shared class sets for NotionRenderer — paper (legacy) vs f1 (portfolio dark). */
export type NotionSurface = "paper" | "f1";

export function notionBlockClasses(surface: NotionSurface) {
  const f1 = surface === "f1";
  return {
    paragraph:
      "text-[15px] leading-[1.85] font-light mb-6 " +
      (f1 ? "text-gray-400" : "text-[#6f655c]"),
    h1: `text-[1.65rem] md:text-[1.9rem] font-light mt-14 mb-6 leading-tight ${f1 ? "text-white" : "text-[#3a3229]"}`,
    h2: `text-[1.35rem] md:text-[1.55rem] font-light mt-12 mb-5 leading-snug ${f1 ? "text-white" : "text-[#3a3229]"}`,
    h3: `text-[1.1rem] md:text-[1.25rem] font-light mt-10 mb-4 ${f1 ? "text-white" : "text-[#3a3229]"}`,
    slashH1: `text-[1.65rem] md:text-[1.9rem] font-light mt-14 mb-6 leading-tight ${f1 ? "text-white" : "text-[#3a3229]"}`,
    slashH2: `text-[1.35rem] md:text-[1.55rem] font-light mt-12 mb-5 leading-snug ${f1 ? "text-white" : "text-[#3a3229]"}`,
    slashH3: `text-[1.1rem] md:text-[1.25rem] font-light mt-10 mb-4 ${f1 ? "text-white" : "text-[#3a3229]"}`,
    li: `text-[15px] leading-[1.85] font-light ml-5 mb-2 pl-1.5 ${f1 ? "text-gray-400" : "text-[#6f655c]"}`,
    liBullet: f1 ? "list-disc marker:text-[#FF1800]/50" : "list-disc marker:text-[#c4b8a9]",
    liNum: f1 ? "list-decimal marker:text-[#FF1800]/50" : "list-decimal marker:text-[#c4b8a9]",
    todo: `flex items-start gap-3 mb-2.5 text-[15px] leading-[1.85] font-light ${f1 ? "text-gray-400" : "text-[#6f655c]"}`,
    todoBox: (checked: boolean) =>
      checked
        ? f1
          ? "bg-[#FF1800] border-[#FF1800]"
          : "bg-[#6f655c] border-[#6f655c]"
        : f1
          ? "border-gray-600"
          : "border-[#d5cdc3]",
    imgWrap: `overflow-hidden rounded-xl border ${f1 ? "border-[#1e1e28] bg-[#0d0d10]" : "border-[#e8e0d8] bg-[#f0ebe4]"}`,
    videoWrap: `my-10 rounded-xl overflow-hidden border ${f1 ? "border-[#1e1e28] bg-[#0d0d10]" : "border-[#e8e0d8] bg-[#f0ebe4]"}`,
    fileCard:
      "p-4 rounded-lg transition-all flex items-center gap-3 " +
      (f1
        ? "border border-[#1e1e28] hover:border-[#FF1800]/40 hover:bg-[#131318]/80"
        : "border border-[#d5cdc3] hover:border-[#b8ae9f] hover:bg-[#f0ebe4]/30"),
    fileText: f1 ? "text-sm font-light text-gray-400 group-hover:text-white" : "text-sm font-light text-[#6f655c] group-hover:text-[#4a3f35]",
    fileArrow: f1 ? "text-gray-500" : "text-[#a39990]",
    codeOuter: f1 ? "my-8 rounded-xl overflow-hidden border border-[#1e1e28]" : "my-8 rounded-xl overflow-hidden border border-[#e8e0d8]",
    codeLang: f1 ? "px-4 py-2 bg-[#131318] border-b border-[#1e1e28]" : "px-4 py-2 bg-[#f0ebe4] border-b border-[#e8e0d8]",
    codeLangText: f1 ? "text-xs font-light uppercase tracking-wider text-gray-500" : "text-xs font-light uppercase tracking-wider text-[#8d857a]",
    pre: f1
      ? "p-5 overflow-x-auto text-[13px] leading-6 font-mono font-normal text-gray-300 bg-[#0a0a0e]"
      : "p-5 overflow-x-auto text-[13px] leading-6 font-mono font-normal text-[#6f655c] bg-[#faf6f0]",
    quote: f1 ? "my-8 pl-5 border-l-[3px] border-[#FF1800]/40 py-2" : "my-8 pl-5 border-l-[3px] border-[#d5cdc3] py-2",
    quoteInner: f1 ? "text-[15px] md:text-base font-light text-gray-400 italic leading-[1.85]" : "text-[15px] md:text-base font-light text-[#8d857a] italic leading-[1.85]",
    callout: f1
      ? "my-8 p-5 rounded-xl flex gap-3 items-start border border-[#1e1e28] bg-[#131318]/90"
      : "my-8 p-5 bg-[#f5f0ea] rounded-xl flex gap-3 items-start border border-[#e8e0d8]",
    calloutText: f1 ? "text-[15px] leading-[1.85] font-light text-gray-400" : "text-[15px] leading-[1.85] font-light text-[#6f655c]",
    toggle: f1
      ? "my-6 group border border-[#1e1e28] rounded-xl overflow-hidden"
      : "my-6 group border border-[#e8e0d8] rounded-xl overflow-hidden",
    toggleSummary: f1
      ? "p-4 text-[15px] font-light text-gray-200 cursor-pointer select-none bg-[#131318] hover:bg-[#1a1a22] transition-colors"
      : "p-4 text-[15px] font-light text-[#4a3f35] cursor-pointer select-none bg-[#fbf7f2] hover:bg-[#f0ebe4] transition-colors",
    toggleBody: f1 ? "px-5 pb-4 pt-2 border-t border-[#1e1e28]" : "px-5 pb-4 pt-2 border-t border-[#e8e0d8]",
    bookmarkCard:
      "p-4 rounded-lg transition-all flex justify-between items-center gap-3 " +
      (f1
        ? "border border-[#1e1e28] hover:border-[#FF1800]/35 hover:bg-[#131318]/60"
        : "border border-[#d5cdc3] hover:border-[#b8ae9f] hover:bg-[#f0ebe4]/30"),
    bookmarkText: f1 ? "text-sm font-light text-gray-400 truncate group-hover:text-white" : "text-sm font-light text-[#6f655c] truncate group-hover:text-[#4a3f35]",
    embed: f1 ? "my-10 rounded-xl overflow-hidden border border-[#1e1e28] bg-[#0d0d10]" : "my-10 rounded-xl overflow-hidden border border-[#e8e0d8] bg-[#f0ebe4]",
  };
}
