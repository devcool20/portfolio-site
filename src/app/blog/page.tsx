/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in space-y-4">
        <p className="text-[#a39990] text-lg">
          No posts yet — stay tuned!
        </p>
        <p className="text-sm text-[#b8ae9f] max-w-md mx-auto">
          If you use Notion: add posts in your database, check the &quot;Published&quot; box, and ensure the database is shared with your integration (⋯ → Connections).
        </p>
      </div>
    );
  }

  // Split posts into featured (first one) and recent (rest)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Featured Post */}
      {featuredPost && (
        <section>
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-6">
            Latest Article
          </p>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid md:grid-cols-[1.2fr_1fr] gap-8 items-start no-underline"
            style={{ textDecoration: "none" }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e8e0d8] bg-[#f0ebe4]">
              {featuredPost.cover ? (
                <img
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#d5cdc3]">
                  <span className="text-4xl">✍️</span>
                </div>
              )}
            </div>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-[#a39990]">
                  {featuredPost.date
                    ? new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Draft"}
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-[#2f2822] group-hover:text-[#6f655c] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
              </div>
              {featuredPost.excerpt && (
                <p className="text-[#8d857a] leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              )}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#2f2822] underline decoration-[#d5cdc3] underline-offset-4 group-hover:decoration-[#a39990] transition-all">
                  Read article <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section>
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-8">
            Recent Posts
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {recentPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 no-underline animate-fade-in"
                style={{ 
                  textDecoration: "none",
                  animationDelay: `${(index + 1) * 0.1}s` 
                }}
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-[#e8e0d8] bg-[#f0ebe4]">
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
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#a39990]">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Draft"}
                  </p>
                  <h3 className="text-xl font-light text-[#2f2822] group-hover:text-[#6f655c] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-[#8d857a] leading-relaxed line-clamp-2">
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
  );
}
