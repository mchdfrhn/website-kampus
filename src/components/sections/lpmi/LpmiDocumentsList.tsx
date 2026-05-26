'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, FileText, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LpmiDocument = {
  id?: string | number;
  judul?: string | null;
  deskripsi?: string | null;
  file?: {
    url?: string | null;
    filename?: string | null;
    filesize?: number | null;
    mimeType?: string | null;
  } | string | number | null;
};

function formatFileSize(value?: number | null) {
  if (!value || value <= 0) return null;
  if (value < 1024 * 1024) return `${Math.ceil(value / 1024)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function getSafeUrl(url?: string | null): string {
  if (!url) return '#';
  try {
    const cleanUrl = url.trim();
    const base = 'https://safe-dummy.sttpu.ac.id';
    const parsed = new URL(cleanUrl, base);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      if (parsed.origin === base) {
        return parsed.pathname + parsed.search + parsed.hash;
      }
      return parsed.href;
    }
  } catch {
    // ignore
  }
  return '#';
}

export default function LpmiDocumentsList({ documents }: { documents: LpmiDocument[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase().trim();
  const matchingIndices = documents
    .map((doc, idx) => {
      if (!query) return idx;
      const titleMatch = doc.judul?.toLowerCase().includes(query) ?? false;
      const descMatch = doc.deskripsi?.toLowerCase().includes(query) ?? false;
      return titleMatch || descMatch ? idx : -1;
    })
    .filter((idx) => idx !== -1);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Cari dokumen berdasarkan judul atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all bg-gray-50/50"
          aria-label="Cari dokumen"
        />
      </div>

      <motion.div layout className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {matchingIndices.map((originalIndex, i) => {
            const document = documents[originalIndex];
            const file = typeof document.file === 'object' ? document.file : null;
            const fileSize = formatFileSize(file?.filesize);
            return (
              <motion.article
                key={document.id ?? document.judul}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-brand-mist p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-white hover:shadow-premium hover:border-brand-navy/10 transition-colors duration-300"
              >
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-brand-navy shadow-sm">
                    <FileText size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-brand-navy leading-snug">{document.judul}</h3>
                    {document.deskripsi && (
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-500">
                        {document.deskripsi}
                      </p>
                    )}
                    {(file?.filename || fileSize) && (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-navy/40">
                        {[file?.filename, fileSize].filter(Boolean).join(' - ')}
                      </p>
                    )}
                  </div>
                </div>

                {file?.url && (
                  <Link
                    href={getSafeUrl(file.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand-gold px-5 py-3 text-sm font-black text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
                  >
                    <Download size={18} />
                    Download
                  </Link>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>

        {matchingIndices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-400 text-sm font-medium"
          >
            Tidak ada dokumen yang cocok dengan kata kunci pencarian.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
