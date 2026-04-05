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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <article className="animate-fade-in w-full max-w-[640px] pb-8">
      {post.cover && (
        <div className="relative w-full overflow-hidden rounded-xl mb-10 border border-[#1e1e28] bg-[#0a0a0e]">
          <img
            src={post.cover}
            alt=""
            className="w-full h-auto max-h-[min(420px,55vh)] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1800]/40 to-transparent" />
        </div>
      )}

      <header className="mb-10">
        <div className="section-label mb-2">Article</div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">
          {post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Draft"}
        </p>
        <h1 className="section-heading text-2xl sm:text-3xl md:text-[2.15rem] mb-6 text-white leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-sm md:text-base font-light leading-relaxed text-gray-400 border-l-2 border-[#FF1800]/40 pl-4">
            {post.excerpt}
          </p>
        )}
        <div className="section-divider mt-10" />
      </header>

      {post.mediaFiles.length > 0 && (
        <div className="mb-10 grid grid-cols-2 gap-4">
          {post.mediaFiles.map((url, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-[#1e1e28] bg-[#0a0a0e]"
            >
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

      <div className="blog-canvas-f1">
        <NotionRenderer blocks={blocks} surface="f1" />
      </div>

      <footer className="mt-16 pt-8 border-t border-[#1e1e28]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-gray-500 hover:text-[#FF1800] transition-colors"
            style={{ textDecoration: "none" }}
          >
            <span
              aria-hidden
              className="group-hover:-translate-x-1 transition-transform"
            >
              ←
            </span>
            All posts
          </Link>
          <ShareButton title={post.title} url={postUrl} />
        </div>
      </footer>
    </article>
  );
}
