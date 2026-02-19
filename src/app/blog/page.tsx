/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div className="animate-fade-in">
      {/* Blog header */}
      <header className="mb-14">
        <h1 className="name-heading text-[#4a3f35]">Blog</h1>
        <p className="text-[#8d857a] text-lg md:text-xl mt-2 font-light">
          Thoughts, learnings &amp; insights
        </p>
      </header>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <p className="text-[#a39990] text-lg font-light">
            No posts yet — stay tuned!
          </p>
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 && (
        <div className="space-y-14">
          {/* Featured Post (first) */}
          <section>
            <p className="text-xs font-light uppercase tracking-[0.15em] text-[#a39990] mb-5">
              Latest Article
            </p>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group grid md:grid-cols-[1.1fr_1fr] gap-6 items-center"
              style={{ textDecoration: "none" }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#e8e0d8] bg-[#f0ebe4]">
                {posts[0].cover ? (
                  <img
                    src={posts[0].cover}
                    alt={posts[0].title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#d5cdc3]">
                    <span className="text-4xl">✍️</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-light uppercase tracking-wider text-[#a39990]">
                  {posts[0].date
                    ? new Date(posts[0].date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Draft"}
                </p>
                <h2 className="text-2xl font-light text-[#4a3f35] group-hover:text-[#6f655c] transition-colors leading-tight">
                  {posts[0].title}
                </h2>
                {posts[0].excerpt && (
                  <p className="text-sm font-light text-[#8d857a] leading-relaxed line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                )}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-sm font-light text-[#4a3f35] underline decoration-[#d5cdc3] underline-offset-4 group-hover:decoration-[#a39990] transition-all">
                    Read article <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* More posts — always in 2-col grid even with 1 post */}
          {posts.length > 1 && (
            <section>
              <p className="text-xs font-light uppercase tracking-[0.15em] text-[#a39990] mb-6">
                More Posts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                {posts.slice(1).map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 animate-fade-in"
                    style={{
                      textDecoration: "none",
                      animationDelay: `${(index + 1) * 0.1}s`,
                    }}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#e8e0d8] bg-[#f0ebe4]">
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#d5cdc3]">
                          <span className="text-2xl">📝</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-light uppercase tracking-wider text-[#a39990]">
                        {post.date
                          ? new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Draft"}
                      </p>
                      <h3 className="text-lg font-light text-[#4a3f35] group-hover:text-[#6f655c] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm font-light text-[#8d857a] leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
