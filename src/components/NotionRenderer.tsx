/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NotionBlock } from "@/lib/notion";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

/* ------------------------------------------------------------------ */
/*  Notion color → CSS color map                                       */
/* ------------------------------------------------------------------ */

const notionColorMap: Record<string, { color?: string; bg?: string }> = {
  default:          { color: "#6f655c" },
  gray:             { color: "#9c9187" },
  brown:            { color: "#8b6e5a" },
  orange:           { color: "#c47a30" },
  yellow:           { color: "#b5930e" },
  green:            { color: "#548a3c" },
  blue:             { color: "#3a7bc8" },
  purple:           { color: "#845ec2" },
  pink:             { color: "#c4538c" },
  red:              { color: "#c4554d" },
  gray_background:  { bg: "#f1eeeb" },
  brown_background: { bg: "#f4ece4" },
  orange_background:{ bg: "#fbecdb" },
  yellow_background:{ bg: "#faf0d5" },
  green_background: { bg: "#eef3e4" },
  blue_background:  { bg: "#e7f0f8" },
  purple_background:{ bg: "#f3e8f9" },
  pink_background:  { bg: "#fae8f0" },
  red_background:   { bg: "#fbe4e4" },
};

function getColorStyle(color: string): React.CSSProperties {
  const mapped = notionColorMap[color];
  if (!mapped) return {};
  const style: React.CSSProperties = {};
  if (mapped.color) style.color = mapped.color;
  if (mapped.bg) { style.backgroundColor = mapped.bg; style.padding = "2px 6px"; style.borderRadius = "4px"; }
  return style;
}

/* ------------------------------------------------------------------ */
/*  Rich-text renderer                                                 */
/* ------------------------------------------------------------------ */

function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((t, i) => {
        let node: React.ReactNode = t.plain_text;

        const { bold, italic, strikethrough, underline, code, color } =
          t.annotations;

        const colorStyle = color && color !== "default" ? getColorStyle(color) : {};
        const hasCustomStyle = Object.keys(colorStyle).length > 0;

        if (code) {
          node = (
            <code className="px-1.5 py-0.5 bg-[#f0ebe4] rounded text-[0.85em] text-[#6f655c] font-mono font-normal">
              {node}
            </code>
          );
        }
        if (bold) node = <strong className="font-medium" style={{ color: hasCustomStyle ? colorStyle.color : "#4a3f35" }}>{node}</strong>;
        if (italic) node = <em>{node}</em>;
        if (strikethrough) node = <s>{node}</s>;
        if (underline) node = <u className="decoration-[#d5cdc3] underline-offset-4">{node}</u>;

        if (hasCustomStyle) {
          node = <span style={colorStyle}>{node}</span>;
        }

        if (t.href) {
          node = (
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#cfc5b9] decoration-2 underline-offset-4 hover:decoration-[#a39990] transition-colors"
              style={{ color: hasCustomStyle ? colorStyle.color : "#4a3f35" }}
            >
              {node}
            </a>
          );
        }

        return <React.Fragment key={i}>{node}</React.Fragment>;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Single-block renderer                                              */
/* ------------------------------------------------------------------ */

function Block({ block }: { block: NotionBlock }) {
  const children = block._children;

  switch (block.type) {
    /* ---------- Text ---------- */
    case "paragraph": {
      const rt = block.paragraph.rich_text;
      if (rt.length === 0) return <div className="h-4" />;
      return (
        <p className="text-base leading-[1.9] font-light text-[#6f655c] mb-5">
          <RichText items={rt} />
        </p>
      );
    }

    /* ---------- Headings ---------- */
    case "heading_1":
      return (
        <h2 className="text-2xl md:text-3xl font-light mt-12 mb-5 leading-tight text-[#4a3f35]">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-xl md:text-2xl font-light mt-10 mb-4 leading-snug text-[#4a3f35]">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-lg md:text-xl font-light mt-8 mb-3 text-[#4a3f35]">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      );

    /* ---------- Lists ---------- */
    case "bulleted_list_item":
      return (
        <li className="text-base leading-[1.9] font-light text-[#6f655c] ml-5 list-disc marker:text-[#c4b8a9] mb-1.5 pl-1">
          <RichText items={block.bulleted_list_item.rich_text} />
          {children && children.length > 0 && (
            <ul className="mt-1.5 space-y-1">
              {children.map((c) => (
                <Block key={c.id} block={c} />
              ))}
            </ul>
          )}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="text-base leading-[1.9] font-light text-[#6f655c] ml-5 list-decimal marker:text-[#c4b8a9] mb-1.5 pl-1">
          <RichText items={block.numbered_list_item.rich_text} />
          {children && children.length > 0 && (
            <ol className="mt-1.5 space-y-1">
              {children.map((c) => (
                <Block key={c.id} block={c} />
              ))}
            </ol>
          )}
        </li>
      );

    case "to_do": {
      const checked = block.to_do.checked;
      return (
        <div className="flex items-start gap-3 mb-2 text-base leading-[1.9] font-light text-[#6f655c]">
          <div className={`mt-1.5 flex-none w-4 h-4 rounded border ${checked ? 'bg-[#6f655c] border-[#6f655c]' : 'border-[#d5cdc3]'} flex items-center justify-center`}>
            {checked && <span className="text-white text-[10px]">✓</span>}
          </div>
          <span className={checked ? "line-through opacity-50" : ""}>
            <RichText items={block.to_do.rich_text} />
          </span>
        </div>
      );
    }

    /* ---------- Media ---------- */
    case "image": {
      const img = block.image;
      const url =
        img.type === "external" ? img.external.url : img.file.url;
      const caption =
        img.caption?.map((t) => t.plain_text).join("") || "";
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-lg border border-[#e8e0d8] bg-[#f0ebe4]">
            <img
              src={url}
              alt={caption || "Blog image"}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption className="text-sm font-light text-[#a39990] mt-2 text-center italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const vid = block.video;
      const url =
        vid.type === "external" ? vid.external.url : vid.file.url;
      return (
        <div className="my-8 rounded-lg overflow-hidden border border-[#e8e0d8] bg-[#f0ebe4]">
          <video src={url} controls className="w-full" />
        </div>
      );
    }

    /* ---------- File ---------- */
    case "file": {
      const f = block.file;
      const url = f.type === "external" ? f.external.url : f.file.url;
      const caption =
        f.caption?.map((t) => t.plain_text).join("") || "Download file";
      const isImage = /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url);
      if (isImage) {
        return (
          <figure className="my-8">
            <div className="overflow-hidden rounded-lg border border-[#e8e0d8] bg-[#f0ebe4]">
              <img src={url} alt={caption} className="w-full h-auto" loading="lazy" />
            </div>
          </figure>
        );
      }
      return (
        <a href={url} target="_blank" rel="noreferrer" className="my-5 block group" style={{ textDecoration: "none" }}>
          <div className="p-3 border border-[#d5cdc3] rounded-lg hover:border-[#b8ae9f] hover:bg-[#f0ebe4]/30 transition-all flex items-center gap-3">
            <span className="text-sm font-light text-[#6f655c] group-hover:text-[#4a3f35] transition-colors">
              📎 {caption}
            </span>
            <span className="text-[#a39990] text-xs ml-auto">↗</span>
          </div>
        </a>
      );
    }

    /* ---------- Code ---------- */
    case "code": {
      const text = block.code.rich_text
        .map((t) => t.plain_text)
        .join("");
      const lang = block.code.language || "";
      return (
        <div className="my-7 rounded-lg overflow-hidden border border-[#e8e0d8]">
          {lang && (
            <div className="px-4 py-1.5 bg-[#f0ebe4] border-b border-[#e8e0d8]">
              <span className="text-xs font-light uppercase tracking-wider text-[#8d857a]">
                {lang}
              </span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-sm leading-6 font-mono font-normal text-[#6f655c] bg-[#fbf7f2]">
            <code>{text}</code>
          </pre>
        </div>
      );
    }

    /* ---------- Quote ---------- */
    case "quote":
      return (
        <blockquote className="my-7 pl-4 border-l-2 border-[#d5cdc3] py-1">
          <p className="text-base md:text-lg font-light text-[#8d857a] italic leading-relaxed">
            <RichText items={block.quote.rich_text} />
          </p>
        </blockquote>
      );

    /* ---------- Callout ---------- */
    case "callout": {
      const icon = block.callout.icon;
      const emoji = icon?.type === "emoji" ? icon.emoji : "";
      return (
        <div className="my-7 p-4 bg-[#f0ebe4] rounded-lg flex gap-3 items-start border border-[#e8e0d8]">
          {emoji && <span className="text-lg flex-none mt-0.5">{emoji}</span>}
          <div className="text-base leading-[1.9] font-light text-[#6f655c]">
            <RichText items={block.callout.rich_text} />
          </div>
        </div>
      );
    }

    /* ---------- Toggle ---------- */
    case "toggle":
      return (
        <details className="my-5 group border border-[#e8e0d8] rounded-lg overflow-hidden">
          <summary className="p-3 text-base font-light text-[#4a3f35] cursor-pointer select-none bg-[#fbf7f2] hover:bg-[#f0ebe4] transition-colors">
            <RichText items={block.toggle.rich_text} />
          </summary>
          <div className="px-4 pb-3 pt-1 border-t border-[#e8e0d8]">
            {children?.map((c) => (
              <Block key={c.id} block={c} />
            ))}
          </div>
        </details>
      );

    /* ---------- Bookmark ---------- */
    case "bookmark": {
      const url = block.bookmark.url;
      const caption =
        block.bookmark.caption?.map((t) => t.plain_text).join("") || url;
      return (
        <a href={url} target="_blank" rel="noreferrer" className="my-5 block group" style={{ textDecoration: "none" }}>
          <div className="p-3 border border-[#d5cdc3] rounded-lg hover:border-[#b8ae9f] hover:bg-[#f0ebe4]/30 transition-all flex justify-between items-center gap-3">
            <span className="text-sm font-light text-[#6f655c] truncate group-hover:text-[#4a3f35] transition-colors">
              {caption}
            </span>
            <span className="text-[#a39990] flex-none text-xs">↗</span>
          </div>
        </a>
      );
    }

    /* ---------- Divider ---------- */
    case "divider":
      return <div className="section-divider my-8" />;

    /* ---------- Embed ---------- */
    case "embed":
      return (
        <div className="my-8 rounded-lg overflow-hidden border border-[#e8e0d8] bg-[#f0ebe4]">
          <iframe
            src={block.embed.url}
            className="w-full min-h-[360px]"
            loading="lazy"
            title="Embedded content"
          />
        </div>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Group consecutive list items                                       */
/* ------------------------------------------------------------------ */

function groupAndRender(blocks: NotionBlock[]): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const b = blocks[i];

    if (b.type === "bulleted_list_item") {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i]);
        i++;
      }
      out.push(
        <ul key={items[0].id} className="my-4 space-y-0.5">
          {items.map((item) => (
            <Block key={item.id} block={item} />
          ))}
        </ul>,
      );
      continue;
    }

    if (b.type === "numbered_list_item") {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i]);
        i++;
      }
      out.push(
        <ol key={items[0].id} className="my-4 space-y-0.5">
          {items.map((item) => (
            <Block key={item.id} block={item} />
          ))}
        </ol>,
      );
      continue;
    }

    out.push(<Block key={b.id} block={b} />);
    i++;
  }

  return out;
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */

export default function NotionRenderer({
  blocks,
}: {
  blocks: NotionBlock[];
}) {
  return <div className="notion-content">{groupAndRender(blocks)}</div>;
}
