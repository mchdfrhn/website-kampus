export default function BeritaLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="bg-gray-100 h-40 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-10 bg-gray-200 rounded-xl flex-1" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Article card grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-4" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
