/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <section className="slate-section blog-index-section accent-sky">
      <div className="slate-heading">
        <span>{String(posts.length).padStart(2, "0")}</span>
        <p>Blog</p>
        <div className="slate-gif-frame">
          <img src="/gif/f1.gif" alt="" loading="lazy" />
        </div>
      </div>

      <div className="slate-page blog-slate-page">
        <div className="slate-rule" aria-hidden="true" />
        <p className="slate-kicker">Long-form notes, build logs, and product diaries.</p>
        <h1 className="slate-title">Field Notes</h1>

        {posts.length === 0 ? (
          <div className="slate-line" style={{ "--write": 1 } as CSSProperties}>
            <p className="slate-line-copy">No posts yet. Fresh notes will show up here soon.</p>
          </div>
        ) : (
          <div className="blog-note-grid">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-note-card slate-line"
                style={{ "--write": 0 } as CSSProperties}
              >
                {post.cover ? (
                  <span className="blog-note-cover">
                    <img src={post.cover} alt="" loading="lazy" />
                  </span>
                ) : null}

                <span className="blog-note-copy">
                  <span className="blog-note-meta">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Draft"}
                  </span>
                  <strong>{post.title}</strong>
                  <span>{post.excerpt?.trim() || "Open the note to read the full write-up."}</span>
                  <em>Open article</em>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
