export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Back link skeleton */}
      <div className="h-4 w-32 bg-[#e8e0d8] rounded mb-6" />

      {/* Title skeleton */}
      <div className="h-10 w-48 bg-[#e8e0d8] rounded mt-6 mb-2" />
      <div className="h-5 w-64 bg-[#e8e0d8]/60 rounded mb-14" />

      {/* Featured post skeleton */}
      <div className="h-4 w-28 bg-[#e8e0d8]/60 rounded mb-5" />
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 items-center">
        <div className="aspect-video w-full bg-[#e8e0d8] rounded-xl" />
        <div className="space-y-3">
          <div className="h-3 w-32 bg-[#e8e0d8]/60 rounded" />
          <div className="h-7 w-full bg-[#e8e0d8] rounded" />
          <div className="h-4 w-3/4 bg-[#e8e0d8]/60 rounded" />
          <div className="h-4 w-1/2 bg-[#e8e0d8]/60 rounded" />
        </div>
      </div>

      {/* More posts skeleton */}
      <div className="h-4 w-24 bg-[#e8e0d8]/60 rounded mt-14 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full bg-[#e8e0d8] rounded-lg" />
            <div className="h-3 w-28 bg-[#e8e0d8]/60 rounded" />
            <div className="h-5 w-3/4 bg-[#e8e0d8] rounded" />
            <div className="h-4 w-full bg-[#e8e0d8]/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
