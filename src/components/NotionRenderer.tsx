/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NotionBlock } from "@/lib/notion";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

/* ------------------------------------------------------------------ */
/*  Rich-text renderer                                                 */
/* ------------------------------------------------------------------ */

function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((t, i) => {
        let node: React.ReactNode = t.plain_text;

        const { bold, italic, strikethrough, underline, code } =
          t.annotations;

        if (code) {
          node = (
            <code className="px-1.5 py-0.5 bg-[#f0ebe4] rounded text-[0.85em] text-[#6f655c] font-mono">
              {node}
            </code>
          );
        }
        if (bold) node = <strong className="font-medium text-[#2f2822]">{node}</strong>;
        if (italic) node = <em className="italic">{node}</em>;
        if (strikethrough) node = <s className="line-through">{node}</s>;
        if (underline) node = <u className="underline decoration-[#d5cdc3] underline-offset-4">{node}</u>;

        if (t.href) {
          node = (
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="text-[#2f2822] underline decoration-[#cfc5b9] decoration-2 underline-offset-4 hover:decoration-[#a39990] transition-colors"
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
      if (rt.length === 0) return <div className="h-6" />;
      return (
        <p className="text-lg leading-relaxed text-[#5a5049] mb-6 max-w-prose">
          <RichText items={rt} />
        </p>
      );
    }

    /* ---------- Headings ---------- */
    case "heading_1":
      return (
        <h2 className="text-3xl md:text-4xl text-[#2f2822] font-light mt-12 mb-6 leading-tight">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-2xl md:text-3xl text-[#2f2822] font-light mt-10 mb-5 leading-snug">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-xl md:text-2xl text-[#2f2822] font-medium mt-8 mb-4">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      );

    /* ---------- Lists ---------- */
    case "bulleted_list_item":
      return (
        <li className="text-lg leading-relaxed text-[#5a5049] ml-6 list-disc marker:text-[#d5cdc3] mb-2 pl-2">
          <RichText items={block.bulleted_list_item.rich_text} />
          {children && children.length > 0 && (
            <ul className="mt-2 space-y-2">
              {children.map((c) => (
                <Block key={c.id} block={c} />
              ))}
            </ul>
          )}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="text-lg leading-relaxed text-[#5a5049] ml-6 list-decimal marker:text-[#d5cdc3] mb-2 pl-2">
          <RichText items={block.numbered_list_item.rich_text} />
          {children && children.length > 0 && (
            <ol className="mt-2 space-y-2">
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
        <div className="flex items-start gap-3 mb-3 text-lg leading-relaxed text-[#5a5049]">
          <div className={`mt-1.5 flex-none w-5 h-5 rounded border ${checked ? 'bg-[#2f2822] border-[#2f2822]' : 'border-[#d5cdc3]'} flex items-center justify-center transition-colors`}>
            {checked && <span className="text-white text-xs">✓</span>}
          </div>
          <span className={checked ? "line-through opacity-60 decoration-[#d5cdc3]" : ""}>
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
        <figure className="my-10 -mx-4 md:-mx-8 lg:-mx-12">
          <div className="relative overflow-hidden rounded-xl bg-[#f0ebe4]">
            <img
              src={url}
              alt={caption || "Blog image"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption className="text-sm text-[#a39990] mt-3 text-center italic max-w-lg mx-auto">
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
        <div className="my-10 rounded-xl overflow-hidden border border-[#e8e0d8] bg-[#f0ebe4]">
          <video src={url} controls className="w-full aspect-video" />
        </div>
      );
    }

    /* ---------- Code ---------- */
    case "code": {
      const text = block.code.rich_text
        .map((t) => t.plain_text)
        .join("");
      const lang = block.code.language || "";
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-[#e8e0d8] bg-[#fbf7f2]">
          {lang && (
            <div className="px-4 py-2 bg-[#f0ebe4] border-b border-[#e8e0d8] flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-[#8d857a] font-medium">
                {lang}
              </span>
            </div>
          )}
          <pre className="p-6 overflow-x-auto text-sm leading-6 font-mono text-[#5a5049]">
            <code>{text}</code>
          </pre>
        </div>
      );
    }

    /* ---------- Quote ---------- */
    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-[#d5cdc3] py-2">
          <p className="text-xl md:text-2xl text-[#6f655c] italic font-light leading-relaxed">
            <RichText items={block.quote.rich_text} />
          </p>
        </blockquote>
      );

    /* ---------- Callout ---------- */
    case "callout": {
      const icon = block.callout.icon;
      const emoji = icon?.type === "emoji" ? icon.emoji : "";
      return (
        <div className="my-8 p-6 bg-[#f0ebe4] rounded-xl flex gap-4 items-start border border-[#e8e0d8]">
          {emoji && <span className="text-2xl flex-none mt-0.5">{emoji}</span>}
          <div className="text-lg leading-relaxed text-[#6f655c]">
            <RichText items={block.callout.rich_text} />
          </div>
        </div>
      );
    }

    /* ---------- Toggle ---------- */
    case "toggle":
      return (
        <details className="my-6 group border border-[#e8e0d8] rounded-lg bg-white/50 open:bg-white transition-colors">
          <summary className="p-4 text-lg text-[#2f2822] cursor-pointer select-none font-medium flex items-center gap-2">
            <RichText items={block.toggle.rich_text} />
          </summary>
          <div className="px-4 pb-4 pt-0 text-[#5a5049]">
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
        block.bookmark.caption?.map((t) => t.plain_text).join("") ||
        url;
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="my-6 block group no-underline"
        >
          <div className="p-4 border border-[#d5cdc3] rounded-xl hover:border-[#b8ae9f] hover:bg-[#f0ebe4]/30 transition-all flex justify-between items-center gap-4">
            <span className="text-lg text-[#6f655c] truncate group-hover:text-[#2f2822] transition-colors">
              {caption}
            </span>
            <span className="text-[#a39990] group-hover:translate-x-1 transition-transform">↗</span>
          </div>
        </a>
      );
    }

    /* ---------- Divider ---------- */
    case "divider":
      return <div className="section-divider my-12" />;

    /* ---------- Embed ---------- */
    case "embed":
      return (
        <div className="my-10 rounded-xl overflow-hidden border border-[#e8e0d8] bg-[#f0ebe4]">
          <iframe
            src={block.embed.url}
            className="w-full min-h-[450px]"
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
/*  Group consecutive list items into <ul> / <ol> wrappers             */
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
        <ul key={items[0].id} className="my-6 space-y-2">
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
        <ol key={items[0].id} className="my-6 space-y-2">
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
  return <div className="notion-content max-w-3xl mx-auto">{groupAndRender(blocks)}</div>;
}
