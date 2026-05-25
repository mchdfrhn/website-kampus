'use client';

import { useEffect } from 'react';

/**
 * Root Error Boundary untuk menangkap kegagalan fatal di produksi
 * Mekanisme: Jika mendeteksi kegagalan Server Action akibat perbedaan versi build,
 * aplikasi akan memaksa browser melakukan hard-refresh untuk mengambil aset terbaru.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Deteksi indikasi kegagalan Server Action dari log
    if (error.message?.includes('Failed to find Server Action')) {
      console.warn('Sinkronisasi build terputus. Memuat ulang halaman...');
      // Lakukan hard reload untuk membersihkan memori cache browser secara instan
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-lg font-semibold text-neutral-800">Koneksi server terputus sesaat</h2>
      <p className="text-sm text-neutral-500 mt-1">Sistem sedang menyelaraskan versi terbaru.</p>
      <button 
        onClick={() => reset()} 
        className="mt-4 px-4 py-2 text-xs font-mono border border-neutral-300 rounded hover:bg-neutral-50 transition"
      >
        Coba Lagi
      </button>
    </div>
  );
}
