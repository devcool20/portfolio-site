/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div className="animate-fade-in pb-16 md:pb-24">
      {/* Editorial hero — fills the space where the old header + banner lived */}
      <div className="relative mb-12 md:mb-16 lg:mb-20">
        <div
          className="pointer-events-none absolute -left-4 top-0 h-24 w-px bg-linear-to-b from-[#FF1800]/60 via-[#FF1800]/20 to-transparent md:-left-6 lg:-left-8"
          aria-hidden
        />
        <div className="relative pl-5 md:pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#FF1800]/90">
            Field notes
          </p>
          <h1 className="mt-4 font-light text-4xl tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Blog
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-gray-500 md:text-base">
            Long-form write-ups and build logs from the garage. Newest entries first.
          </p>
        </div>
        <div
          className="mt-10 h-px w-full max-w-2xl bg-linear-to-r from-[#FF1800]/40 via-[#1e1e28] to-transparent"
          aria-hidden
        />
      </div>

      {posts.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#1e1e28] bg-[#0a0a0e]/50 py-24 text-center">
          <p className="font-mono text-sm tracking-wide text-gray-500">
            No posts yet — check back soon.
          </p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="space-y-14 md:space-y-20">
          <section aria-labelledby="latest-heading">
            <h2
              id="latest-heading"
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#FF1800]/85"
            >
              Latest
            </h2>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group block overflow-hidden rounded-2xl border border-[#1e1e28] bg-linear-to-br from-[#131318] to-[#0d0d10] transition-all duration-300 hover:border-[#FF1800]/35 hover:shadow-[0_0_60px_-12px_rgba(255,24,0,0.15)]"
              style={{ textDecoration: "none" }}
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-16/10 min-h-[220px] w-full overflow-hidden bg-[#0a0a0e] lg:aspect-auto lg:min-h-[320px]">
                  {posts[0].cover ? (
                    <img
                      src={posts[0].cover}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full min-h-[220px] items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
                      No cover
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#060608]/80 via-transparent to-transparent opacity-60 lg:opacity-0" />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  <time
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500"
                    dateTime={posts[0].date ?? undefined}
                  >
                    {posts[0].date
                      ? new Date(posts[0].date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Draft"}
                  </time>
                  <h3 className="mt-4 text-2xl font-light leading-snug text-white transition-colors group-hover:text-[#FF1800] md:text-3xl lg:text-[2rem]">
                    {posts[0].title}
                  </h3>
                  {posts[0].excerpt && (
                    <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-400 md:text-base">
                      {posts[0].excerpt}
                    </p>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#FF1800] transition-colors group-hover:text-[#FF6B35]">
                    Read <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {posts.length > 1 && (
            <section aria-labelledby="more-heading">
              <h2
                id="more-heading"
                className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-[#FF1800]/85"
              >
                Archive
              </h2>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {posts.slice(1).map((post, index) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1e1e28] bg-[#0d0d10]/90 transition-all duration-300 hover:border-[#FF1800]/25 hover:bg-[#131318]"
                      style={{
                        textDecoration: "none",
                        animationDelay: `${(index + 1) * 0.05}s`,
                      }}
                    >
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#0a0a0e]">
                        {post.cover ? (
                          <img
                            src={post.cover}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-mono text-[9px] uppercase tracking-widest text-gray-600">
                            —
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <time
                          className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-500"
                          dateTime={post.date ?? undefined}
                        >
                          {post.date
                            ? new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Draft"}
                        </time>
                        <h3 className="mt-3 flex-1 text-base font-light leading-snug text-white transition-colors group-hover:text-[#FF1800] md:text-lg">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
