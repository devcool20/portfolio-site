export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-[#1e1e28] rounded mb-6" />
      <div className="h-10 w-48 bg-[#1e1e28] rounded mt-6 mb-2" />
      <div className="h-5 w-64 bg-[#131318] rounded mb-14" />
      <div className="h-4 w-28 bg-[#131318] rounded mb-5" />
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 items-center">
        <div className="aspect-video w-full bg-[#1e1e28] rounded-xl border border-[#1e1e28]" />
        <div className="space-y-3">
          <div className="h-3 w-32 bg-[#131318] rounded" />
          <div className="h-7 w-full bg-[#1e1e28] rounded" />
          <div className="h-4 w-3/4 bg-[#131318] rounded" />
          <div className="h-4 w-1/2 bg-[#131318] rounded" />
        </div>
      </div>
      <div className="h-4 w-24 bg-[#131318] rounded mt-14 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full bg-[#1e1e28] rounded-lg border border-[#1e1e28]" />
            <div className="h-3 w-28 bg-[#131318] rounded" />
            <div className="h-5 w-3/4 bg-[#1e1e28] rounded" />
            <div className="h-4 w-full bg-[#131318] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
