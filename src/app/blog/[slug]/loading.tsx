export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[2.2/1] bg-[#1e1e28] rounded-xl border border-[#1e1e28] mb-10" />
      <div className="h-3 w-36 bg-[#131318] rounded mb-4" />
      <div className="h-9 w-3/4 bg-[#1e1e28] rounded mb-5" />
      <div className="h-5 w-full bg-[#131318] rounded mb-2" />
      <div className="h-5 w-2/3 bg-[#131318] rounded mb-10" />
      <div className="h-px bg-[#1e1e28] mb-10" />
      <div className="space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-[#131318] rounded" />
            <div className="h-4 w-full bg-[#131318] rounded" />
            <div className="h-4 w-4/5 bg-[#131318] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
