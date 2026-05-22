/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getPostBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import ShareButton from "@/components/ShareButton";
import PillButton from "@/components/ui/PillButton";

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
    title: `${data.post.title} - Divyanshu Sharma`,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6">
      {/* Left Column: Post Metadata & Back Button */}
      <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:sticky lg:top-24 select-none">
        <div className="flex flex-col items-start gap-1">
          <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#111111]/25 leading-none">
            01
          </span>
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-none uppercase tracking-wider">
            Article
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#111111]/50 mt-1">
            {post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "Draft"}
          </p>
        </div>
        <div className="lg:mt-6">
          <PillButton href="/blog" variant="outline">
            All Notes
          </PillButton>
        </div>
      </div>

      {/* Right Column: Article Card */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        <article className="bg-white border-2 border-[#111111] rounded-[20px] p-6 sm:p-8 md:p-12 shadow-[4px_4px_0_0_rgba(17,17,17,1)] flex flex-col gap-6">
          {post.cover ? (
            <div className="w-full max-h-[480px] overflow-hidden border-2 border-[#111111] rounded-[16px] shadow-[4px_4px_0_0_rgba(17,17,17,1)]">
              <img
                src={post.cover}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}

          <div>
            <p className="font-body text-xs sm:text-sm uppercase tracking-wider text-[#111111]/50">
              {post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Draft"}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] uppercase leading-tight tracking-tight mt-2">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="font-body text-base sm:text-lg text-[#111111]/70 border-l-4 border-[#B1FC54] pl-4 py-1 mt-4 italic">
                {post.excerpt}
              </p>
            ) : null}
          </div>

          <div className="h-[2px] bg-[#111111]/10 my-2" aria-hidden="true" />

          {post.mediaFiles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              {post.mediaFiles.slice(0, 4).map((url, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl border-2 border-[#111111] overflow-hidden shadow-[2px_2px_0_0_rgba(17,17,17,1)]"
                >
                  <img
                    src={url}
                    alt={`${post.title} media ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="blog-post-body-slate">
            <NotionRenderer blocks={blocks} surface="paper" />
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-[#111111]/10">
            <PillButton href="/blog" variant="outline">
              Back to Blog
            </PillButton>
            <ShareButton title={post.title} url={postUrl} />
          </div>
        </article>
      </div>
    </div>
  );
}
