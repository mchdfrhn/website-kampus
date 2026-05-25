export default function DosenLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-100 h-40 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          {/* Main */}
          <div className="space-y-8">
            {/* Title block */}
            <div className="space-y-3">
              <div className="h-7 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-full max-w-2xl" />
              <div className="h-4 bg-gray-200 rounded w-4/5 max-w-xl" />
            </div>

            {/* Program studi tabs */}
            <div className="flex gap-3 overflow-x-hidden pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-11 w-36 shrink-0 bg-gray-200 rounded-xl" />
              ))}
            </div>

            {/* Dosen panel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-8 space-y-4">
              <div className="flex justify-between pb-5 border-b border-gray-100">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-5 bg-gray-200 rounded w-48" />
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-24 self-start" />
              </div>

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded-full w-24" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => <div key={j} className="h-7 bg-gray-200 rounded-full w-24" />)}
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
