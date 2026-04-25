/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div className="blog-list-page pb-12 md:pb-16">
      <section className="blog-reveal">
        <div className="telemetry-panel blog-page-intro">
          <div className="blog-intro-head">
            <div>
              <div className="section-label">Field Notes</div>
              <h1 className="blog-page-title">Blog</h1>
            </div>
            <div className="blog-intro-stat">
              <span>{posts.length}</span>
              <p>Published notes</p>
            </div>
          </div>

          <p className="blog-page-deck">
            Long-form write-ups, product diaries, and build logs from the garage.
            A quieter, tighter reading surface with the same visual language as the rest of the site.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="blog-reveal mt-6">
          <div className="telemetry-panel blog-empty-state">
            <p className="panel-kicker">Status</p>
            <p className="panel-copy">No posts yet. Fresh notes will show up here soon.</p>
          </div>
        </section>
      ) : (
        <section className="blog-reveal mt-6">
          <div className="blog-index-head">
            <div className="section-label">Latest Entries</div>
            <p className="blog-index-note">Choose a note to open the full article.</p>
          </div>

          <div className="blog-card-grid">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="telemetry-panel blog-card-item"
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card-topline">
                  <span className="blog-stream-index">{String(index + 1).padStart(2, "0")}</span>
                  <time className="blog-post-date" dateTime={post.date ?? undefined}>
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Draft"}
                  </time>
                </div>

                {post.cover ? (
                  <div className="blog-card-media">
                    <img src={post.cover} alt="" className="blog-card-image" />
                  </div>
                ) : null}

                <div className="blog-card-copy">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">
                    {post.excerpt?.trim() || "Open the note to read the full write-up."}
                  </p>
                </div>

                <span className="blog-stream-cta">
                  <span className="signal-dot" />
                  Open article
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
