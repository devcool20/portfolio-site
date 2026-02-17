export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Back link skeleton */}
      <div className="h-4 w-28 bg-[#e8e0d8] rounded mb-10" />

      {/* Cover image skeleton */}
      <div className="w-full aspect-[2.2/1] bg-[#e8e0d8] rounded-xl mb-10" />

      {/* Date */}
      <div className="h-3 w-36 bg-[#e8e0d8]/60 rounded mb-4" />

      {/* Title */}
      <div className="h-9 w-3/4 bg-[#e8e0d8] rounded mb-5" />

      {/* Excerpt */}
      <div className="h-5 w-full bg-[#e8e0d8]/60 rounded mb-2" />
      <div className="h-5 w-2/3 bg-[#e8e0d8]/60 rounded mb-10" />

      {/* Divider */}
      <div className="h-px bg-[#e8e0d8] mb-10" />

      {/* Body paragraphs */}
      <div className="space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-[#e8e0d8]/50 rounded" />
            <div className="h-4 w-full bg-[#e8e0d8]/50 rounded" />
            <div className="h-4 w-4/5 bg-[#e8e0d8]/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
