/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6">
      {/* Left Column: Title and Count */}
      <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
        <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#111111]/25 leading-none">
          {String(posts.length).padStart(2, "0")}
        </span>
        <h1 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-none uppercase tracking-wider">
          Blog
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#111111]/50 mt-1">
          Field Notes
        </p>
      </div>

      {/* Right Column: List of Blog Posts */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        <div className="bg-white border-2 border-[#111111] rounded-[20px] p-6 sm:p-8 shadow-[4px_4px_0_0_rgba(17,17,17,1)]">
          <p className="font-display text-xl sm:text-2xl text-[#111111] uppercase tracking-tight mb-8">
            Long-form notes, build logs, and product diaries.
          </p>

          {posts.length === 0 ? (
            <p className="font-body text-base text-[#111111]/60">
              No posts yet. Fresh notes will show up here soon.
            </p>
          ) : (
            <div className="blog-note-grid">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-note-card"
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
                    <em className="font-body font-bold text-xs uppercase tracking-wider text-[#111111] mt-auto pt-4 flex items-center gap-1">
                      Open article
                    </em>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

