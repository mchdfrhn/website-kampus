'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.message?.includes('Failed to find Server Action')) {
      console.warn('Sinkronisasi build terputus. Memuat ulang halaman...');
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="id">
      <body className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6 text-center font-sans">
        <div className="max-w-md w-full p-8 bg-white border border-neutral-200 rounded-2xl shadow-xl flex flex-col items-center">
          <h2 className="text-xl font-bold text-neutral-800">Koneksi server terputus sesaat</h2>
          <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
            Sistem sedang menyelaraskan versi terbaru aplikasi. Halaman akan dimuat ulang.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md shadow-blue-500/20"
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
