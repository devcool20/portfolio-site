export default function RootLoading() {
  return (
    <div className="min-h-screen px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl animate-pulse space-y-8">
        <div className="h-12 w-72 rounded bg-[#e9e2d8]" />
        <div className="h-6 w-48 rounded bg-[#ece5dc]" />
        <div className="space-y-4 pt-6">
          <div className="h-4 w-full rounded bg-[#ece5dc]" />
          <div className="h-4 w-11/12 rounded bg-[#ece5dc]" />
          <div className="h-4 w-10/12 rounded bg-[#ece5dc]" />
        </div>
      </div>
    </div>
  );
}
