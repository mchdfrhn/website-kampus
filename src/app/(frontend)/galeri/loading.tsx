export default function GaleriLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="bg-gray-100 h-40 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category filter row */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
          ))}
        </div>

        {/* Album card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden bg-white flex flex-col">
              {/* Cover image */}
              <div className="h-52 bg-gray-200 flex-shrink-0" />
              <div className="p-6 flex flex-col gap-3 flex-1">
                {/* Title */}
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                {/* Description */}
                <div className="h-3 bg-gray-200 rounded w-full mt-1" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                {/* Footer meta */}
                <div className="flex justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-3 bg-gray-200 rounded w-20" />
                </div>
                {/* CTA button */}
                <div className="h-9 bg-gray-200 rounded-xl mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
