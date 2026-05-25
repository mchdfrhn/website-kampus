export default function FrontendLoading() {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="h-4 w-56 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>

      <div className="bg-brand-navy px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-9 w-72 max-w-full animate-pulse rounded-full bg-white/15 sm:h-11 sm:w-96" />
          <div className="mt-6 h-1 w-16 rounded-full bg-brand-gold" />
          <div className="mt-7 max-w-2xl space-y-3">
            <div className="h-4 animate-pulse rounded-full bg-white/15" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium"
            >
              <div className="h-5 w-2/5 animate-pulse rounded-full bg-gray-100" />
              <div className="mt-5 space-y-3">
                <div className="h-4 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 w-11/12 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
