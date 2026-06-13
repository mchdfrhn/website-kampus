'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function BuildSyncProvider({ children }: { children: React.ReactNode }) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleSyncError = (event: ErrorEvent | PromiseRejectionEvent) => {
      let message = '';
      if (event instanceof PromiseRejectionEvent) {
        message = event.reason?.message || '';
      } else {
        message = event.message || '';
      }

      if (message.includes('Failed to find Server Action')) {
        event.preventDefault();
        setIsUpdating(true);
        console.warn('Sync mismatch detected. Reloading page for new assets...');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };

    window.addEventListener('error', handleSyncError);
    window.addEventListener('unhandledrejection', handleSyncError);

    return () => {
      window.removeEventListener('error', handleSyncError);
      window.removeEventListener('unhandledrejection', handleSyncError);
    };
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {isUpdating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative p-6 max-w-sm w-full mx-4 rounded-2xl border border-white/10 bg-neutral-900/80 text-white shadow-2xl backdrop-blur-xl flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                <RefreshCw className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 font-sans tracking-tight">
                Penyelarasan Aplikasi
              </h3>
              <p className="text-sm text-neutral-400 mt-2 font-sans leading-relaxed">
                Versi situs web telah diperbarui untuk stabilitas dan keamanan tambahan. Halaman akan dimuat ulang secara otomatis.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-blue-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                Memuat ulang dalam 3 detik...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
