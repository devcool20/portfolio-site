"use client";

/* eslint-disable @next/next/no-img-element */
import React, { createContext, useContext } from "react";
import type { NotionBlock } from "@/lib/notion";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  notionBlockClasses,
  type NotionSurface,
} from "@/components/notion-theme";

const NotionSurfaceContext = createContext<NotionSurface>("paper");

/* ------------------------------------------------------------------ */
/*  Notion color → CSS                                                 */
/* ------------------------------------------------------------------ */

const notionColorMap: Record<string, { color?: string; bg?: string }> = {
  default:           { color: "#6f655c" },
  gray:              { color: "#9c9187" },
  brown:             { color: "#8b6e5a" },
  orange:            { color: "#c47a30" },
  yellow:            { color: "#b5930e" },
  green:             { color: "#548a3c" },
  blue:              { color: "#3a7bc8" },
  purple:            { color: "#845ec2" },
  pink:              { color: "#c4538c" },
  red:               { color: "#c4554d" },
  gray_background:   { bg: "#f1eeeb" },
  brown_background:  { bg: "#f4ece4" },
  orange_background: { bg: "#fbecdb" },
  yellow_background: { bg: "#faf0d5" },
  green_background:  { bg: "#eef3e4" },
  blue_background:   { bg: "#e7f0f8" },
  purple_background: { bg: "#f3e8f9" },
  pink_background:   { bg: "#fae8f0" },
  red_background:    { bg: "#fbe4e4" },
};

function getColorStyle(color: string): React.CSSProperties {
  const mapped = notionColorMap[color];
  if (!mapped) return {};
  const style: React.CSSProperties = {};
  if (mapped.color) style.color = mapped.color;
  if (mapped.bg) {
    style.backgroundColor = mapped.bg;
    style.padding = "2px 6px";
    style.borderRadius = "4px";
  }
  return style;
}

/* ------------------------------------------------------------------ */
/*  Detect /h1, /h2, #, ## etc. typed as text — render as real headings */
/* ------------------------------------------------------------------ */

function parseSlashHeading(
  items: RichTextItemResponse[],
): { level: 1 | 2 | 3; text: string } | null {
  let raw = items.map((t) => t.plain_text).join("");
  raw = raw.replace(/^\s*[\*_]+\s*/, "").replace(/\s*[\*_]+\s*$/, ""); // strip ** or __
  const trimmed = raw.trim();
  const h1Match = /^\/h1\s+(.+)$/i.exec(trimmed) ?? /^#\s+(.+)$/.exec(trimmed);
  const h2Match = /^\/h2\s+(.+)$/i.exec(trimmed) ?? /^##\s+(.+)$/.exec(trimmed);
  const h3Match = /^\/h3\s+(.+)$/i.exec(trimmed) ?? /^###\s+(.+)$/.exec(trimmed);
  if (h1Match) return { level: 1, text: h1Match[1].trim() };
  if (h2Match) return { level: 2, text: h2Match[1].trim() };
  if (h3Match) return { level: 3, text: h3Match[1].trim() };
  return null;
}

/* ------------------------------------------------------------------ */
/*  Convert plain_text with \n into React nodes with <br />            */
/* ------------------------------------------------------------------ */

function textWithLineBreaks(text: string): React.ReactNode {
  const lines = text.split("\n");
  if (lines.length === 1) return text;
  return lines.map((line, j) => (
    <React.Fragment key={j}>
      {j > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}

/* ------------------------------------------------------------------ */
/*  Rich-text renderer                                                 */
/* ------------------------------------------------------------------ */

function RichText({ items }: { items: RichTextItemResponse[] }) {
  const surface = useContext(NotionSurfaceContext);
  const f1 = surface === "f1";

  return (
    <>
      {items.map((t, i) => {
        let node: React.ReactNode = textWithLineBreaks(t.plain_text);

        const { bold, italic, strikethrough, underline, code, color } =
          t.annotations;

        const colorStyle =
          color && color !== "default" ? getColorStyle(color) : {};
        const hasCustomStyle = Object.keys(colorStyle).length > 0;

        if (code) {
          node = (
            <code
              className={
                f1
                  ? "px-1.5 py-0.5 rounded text-[0.85em] text-gray-300 font-mono font-normal border border-[#1e1e28] bg-[#1a1a22]"
                  : "px-1.5 py-0.5 bg-[#f0ebe4] rounded text-[0.85em] text-[#6f655c] font-mono font-normal"
              }
            >
              {node}
            </code>
          );
        }
        if (bold)
          node = (
            <strong
              className="font-medium"
              style={{
                color: hasCustomStyle
                  ? colorStyle.color
                  : f1
                    ? "#f0f0f5"
                    : "#4a3f35",
              }}
            >
              {node}
            </strong>
          );
        if (italic) node = <em>{node}</em>;
        if (strikethrough) node = <s>{node}</s>;
        if (underline)
          node = (
            <u
              className={
                f1
                  ? "decoration-gray-600 underline-offset-4"
                  : "decoration-[#d5cdc3] underline-offset-4"
              }
            >
              {node}
            </u>
          );

        if (hasCustomStyle) {
          node = <span style={colorStyle}>{node}</span>;
        }

        if (t.href) {
          node = (
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className={
                f1
                  ? "underline decoration-[#FF1800]/45 decoration-2 underline-offset-4 hover:decoration-[#FF6B35] transition-colors"
                  : "underline decoration-[#cfc5b9] decoration-2 underline-offset-4 hover:decoration-[#a39990] transition-colors"
              }
              style={{
                color: hasCustomStyle ? colorStyle.color : f1 ? "#FF1800" : "#4a3f35",
              }}
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
  const surface = useContext(NotionSurfaceContext);
  const nc = notionBlockClasses(surface);
  const children = block._children;

  switch (block.type) {
    /* ---------- Text ---------- */
    case "paragraph": {
      const rt = block.paragraph.rich_text;
      if (rt.length === 0) return <div className="h-6" />;
      const slashHeading = parseSlashHeading(rt);
      if (slashHeading) {
        const { level, text } = slashHeading;
        const headingClass =
          level === 1 ? nc.slashH1 : level === 2 ? nc.slashH2 : nc.slashH3;
        const Tag = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
        return (
          <Tag className={headingClass}>{text}</Tag>
        );
      }
      return (
        <p className={nc.paragraph}>
          <RichText items={rt} />
        </p>
      );
    }

    /* ---------- Headings ---------- */
    case "heading_1":
      return (
        <h2 className={nc.h1}>
          <RichText items={block.heading_1.rich_text} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className={nc.h2}>
          <RichText items={block.heading_2.rich_text} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className={nc.h3}>
          <RichText items={block.heading_3.rich_text} />
        </h4>
      );

    /* ---------- Lists ---------- */
    case "bulleted_list_item":
      return (
        <li className={`${nc.li} ${nc.liBullet}`}>
          <RichText items={block.bulleted_list_item.rich_text} />
          {children && children.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {children.map((c) => (
                <Block key={c.id} block={c} />
              ))}
            </ul>
          )}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className={`${nc.li} ${nc.liNum}`}>
          <RichText items={block.numbered_list_item.rich_text} />
          {children && children.length > 0 && (
            <ol className="mt-2 space-y-1.5">
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
        <div className={nc.todo}>
          <div
            className={`mt-1.5 flex-none w-4 h-4 rounded border ${nc.todoBox(checked)} flex items-center justify-center`}
          >
            {checked && (
              <span className="text-white text-[10px]">✓</span>
            )}
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
        <figure className="my-10">
          <div className={nc.imgWrap}>
            <img
              src={url}
              alt={caption || "Blog image"}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption
              className={`text-[13px] font-light mt-3 text-center italic ${surface === "f1" ? "text-gray-500" : "text-[#a39990]"}`}
            >
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
        <div className={nc.videoWrap}>
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
          <figure className="my-10">
            <div className={nc.imgWrap}>
              <img
                src={url}
                alt={caption}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </figure>
        );
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="my-6 block group"
          style={{ textDecoration: "none" }}
        >
          <div className={`${nc.fileCard} flex items-center gap-3`}>
            <span className={`${nc.fileText} transition-colors`}>
              📎 {caption}
            </span>
            <span className={`${nc.fileArrow} text-xs ml-auto`}>↗</span>
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
        <div className={nc.codeOuter}>
          {lang && (
            <div className={nc.codeLang}>
              <span className={nc.codeLangText}>
                {lang}
              </span>
            </div>
          )}
          <pre className={nc.pre}>
            <code>{text}</code>
          </pre>
        </div>
      );
    }

    /* ---------- Quote ---------- */
    case "quote":
      return (
        <blockquote className={nc.quote}>
          <p className={nc.quoteInner}>
            <RichText items={block.quote.rich_text} />
          </p>
        </blockquote>
      );

    /* ---------- Callout ---------- */
    case "callout": {
      const icon = block.callout.icon;
      const emoji = icon?.type === "emoji" ? icon.emoji : "";
      return (
        <div className={nc.callout}>
          {emoji && (
            <span className="text-lg flex-none mt-0.5">{emoji}</span>
          )}
          <div className={nc.calloutText}>
            <RichText items={block.callout.rich_text} />
          </div>
        </div>
      );
    }

    /* ---------- Toggle ---------- */
    case "toggle":
      return (
        <details className={nc.toggle}>
          <summary className={nc.toggleSummary}>
            <RichText items={block.toggle.rich_text} />
          </summary>
          <div className={nc.toggleBody}>
            {children?.map((c) => <Block key={c.id} block={c} />)}
          </div>
        </details>
      );

    /* ---------- Bookmark ---------- */
    case "bookmark": {
      const url = block.bookmark.url;
      const caption =
        block.bookmark.caption?.map((t) => t.plain_text).join("") ||
        url;
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="my-6 block group"
          style={{ textDecoration: "none" }}
        >
          <div className={`${nc.bookmarkCard}`}>
            <span className={`${nc.bookmarkText} transition-colors`}>
              {caption}
            </span>
            <span className={`${nc.fileArrow} flex-none text-xs`}>↗</span>
          </div>
        </a>
      );
    }

    /* ---------- Divider ---------- */
    case "divider":
      return <div className="section-divider my-10" />;

    /* ---------- Embed ---------- */
    case "embed":
      return (
        <div className={nc.embed}>
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
      while (
        i < blocks.length &&
        blocks[i].type === "bulleted_list_item"
      ) {
        items.push(blocks[i]);
        i++;
      }
      out.push(
        <ul key={items[0].id} className="my-5 space-y-0.5">
          {items.map((item) => (
            <Block key={item.id} block={item} />
          ))}
        </ul>,
      );
      continue;
    }

    if (b.type === "numbered_list_item") {
      const items: NotionBlock[] = [];
      while (
        i < blocks.length &&
        blocks[i].type === "numbered_list_item"
      ) {
        items.push(blocks[i]);
        i++;
      }
      out.push(
        <ol key={items[0].id} className="my-5 space-y-0.5">
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
  surface = "paper",
}: {
  blocks: NotionBlock[];
  surface?: NotionSurface;
}) {
  return (
    <NotionSurfaceContext.Provider value={surface}>
      <div className="notion-content">{groupAndRender(blocks)}</div>
    </NotionSurfaceContext.Provider>
  );
}
