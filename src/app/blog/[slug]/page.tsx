/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getPostBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import ShareButton from "@/components/ShareButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data) return { title: "Post not found" };
  return {
    title: `${data.post.title} — Divyanshu Sharma`,
    description: data.post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) notFound();

  const { post, blocks } = data;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <article className="animate-fade-in">
      {/* ---- Nav ---- */}
      <nav className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#a39990] hover:text-[#6f655c] transition-colors"
          style={{ textDecoration: "none" }}
        >
          <span aria-hidden>←</span>
          <span>Back to blog</span>
        </Link>
      </nav>

      {/* ---- Cover image (hero) ---- */}
      {post.cover && (
        <div className="relative w-full overflow-hidden rounded-xl border border-[#e8e0d8] mb-10 bg-[#f0ebe4]">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-auto max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* ---- Header ---- */}
      <header className="mb-10">
        <p className="text-xs font-light uppercase tracking-widest text-[#a39990] mb-4">
          {post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Draft"}
        </p>
        <h1 className="text-3xl md:text-4xl font-light leading-tight mb-5 text-[#4a3f35]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-base md:text-lg font-light leading-relaxed text-[#8d857a]">
            {post.excerpt}
          </p>
        )}
        <div className="section-divider mt-8" />
      </header>

      {/* ---- Media files from "Files & media" property ---- */}
      {post.mediaFiles.length > 0 && (
        <div className="mb-10 grid grid-cols-2 gap-4">
          {post.mediaFiles.map((url, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-[#e8e0d8] bg-[#f0ebe4]">
              <img
                src={url}
                alt={`${post.title} media ${i + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* ---- Body ---- */}
      <div className="blog-canvas">
        <NotionRenderer blocks={blocks} />
      </div>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-[#e8e0d8]">
        <div className="flex justify-between items-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-light text-[#8d857a] hover:text-[#4a3f35] transition-colors"
            style={{ textDecoration: "none" }}
          >
            <span aria-hidden className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all posts
          </Link>
          <ShareButton title={post.title} url={postUrl} />
        </div>
      </footer>
    </article>
  );
}
