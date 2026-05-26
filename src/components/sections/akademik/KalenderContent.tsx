'use client';

import { useState } from 'react';
import { Calendar, Download, AlertCircle, Search, Info, Grid, List, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type KegiatanItem = { kegiatan: string; tanggal: string; keterangan?: string };
type KegiatanPenting = { nama: string; tanggal: string; keterangan?: string };

type KalenderData = {
  tahunAkademik: string;
  deskripsi: string;
  pdfUrl?: string;
  semesterGanjil: { label: string; kegiatan: KegiatanItem[] };
  semesterGenap: { label: string; kegiatan: KegiatanItem[] };
  kegiatanPenting: KegiatanPenting[];
};

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function KalenderContent({ data }: { data: KalenderData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSemester, setActiveSemester] = useState<'semua' | 'ganjil' | 'genap' | 'penting'>('semua');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  // Filter activities based on tab and search query
  const matchesSearch = (text: string, query: string) => {
    return text.toLowerCase().includes(query.toLowerCase());
  };

  const getFilteredKegiatan = (kegiatan: KegiatanItem[], type: 'ganjil' | 'genap') => {
    return kegiatan.map((item, index) => ({ ...item, type, index })).filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        matchesSearch(item.kegiatan, q) ||
        matchesSearch(item.tanggal, q) ||
        (item.keterangan ? matchesSearch(item.keterangan, q) : false)
      );
    });
  };

  const getFilteredPenting = (kegiatan: KegiatanPenting[]) => {
    return kegiatan.map((item, index) => ({ ...item, type: 'penting', index })).filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        matchesSearch(item.nama, q) ||
        matchesSearch(item.tanggal, q) ||
        (item.keterangan ? matchesSearch(item.keterangan, q) : false)
      );
    });
  };

  const ganjilEvents = getFilteredKegiatan(data.semesterGanjil.kegiatan, 'ganjil');
  const genapEvents = getFilteredKegiatan(data.semesterGenap.kegiatan, 'genap');
  const pentingEvents = getFilteredPenting(data.kegiatanPenting);

  const hasNoResults =
    (activeSemester === 'semua' && ganjilEvents.length === 0 && genapEvents.length === 0 && pentingEvents.length === 0) ||
    (activeSemester === 'ganjil' && ganjilEvents.length === 0) ||
    (activeSemester === 'genap' && genapEvents.length === 0) ||
    (activeSemester === 'penting' && pentingEvents.length === 0);

  return (
    <article className="py-10 sm:py-12 space-y-8">
      {/* Upper Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-navy/5 text-brand-navy rounded-xl">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tahun Akademik</p>
            <p className="text-sm font-bold text-brand-navy">{data.tahunAkademik}</p>
          </div>
        </div>

        {data.pdfUrl && (
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 shadow-md sm:w-auto"
          >
            <Download size={14} aria-hidden="true" />
            Unduh PDF Resmi
          </a>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-xs sm:text-sm font-semibold leading-relaxed">
          Jadwal dapat berubah sewaktu-waktu sesuai kebijakan institusi dan keputusan hari libur nasional.
          Selalu pantau pengumuman di SIAKAD untuk update jadwal terbaru.
        </p>
      </div>

      {/* Main Filter dashboard */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 rounded-xl" role="tablist">
            {(['semua', 'ganjil', 'genap', 'penting'] as const).map((sem) => (
              <button
                key={sem}
                role="tab"
                aria-selected={activeSemester === sem}
                onClick={() => setActiveSemester(sem)}
                className={`px-4 py-2 text-xs font-bold transition-all rounded-lg ${
                  activeSemester === sem ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-brand-navy'
                }`}
              >
                {sem === 'semua' ? 'Semua Jadwal' : sem === 'ganjil' ? 'Ganjil' : sem === 'genap' ? 'Genap' : 'Penting'}
              </button>
            ))}
          </div>

          {/* Grid/List & Search Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex border border-gray-200 rounded-xl p-1 bg-white">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-navy text-white' : 'text-gray-400 hover:text-brand-navy'}`}
                title="Tampilan List"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-brand-navy text-white' : 'text-gray-400 hover:text-brand-navy'}`}
                title="Tampilan Tabel"
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari kegiatan akademik (contoh: UTS, UAS, Libur, KRS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all"
            aria-label="Cari Jadwal Kegiatan"
          />
        </div>
      </div>

      {/* Events Container */}
      <div className="mt-6">
        <AnimatePresence mode="popLayout">
          {hasNoResults ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-premium border border-dashed border-gray-200 p-12 text-center bg-white"
            >
              <Sparkles className="mx-auto text-gray-300 mb-3" size={24} />
              <p className="text-gray-400 font-semibold text-sm">Tidak ada kegiatan akademik yang cocok dengan pencarian Anda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveSemester('semua');
                }}
                className="mt-4 text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="space-y-10">
              {/* Semester Ganjil Section */}
              {(activeSemester === 'semua' || activeSemester === 'ganjil') && ganjilEvents.length > 0 && (
                <motion.div
                  key="ganjil"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SectionCard title={data.semesterGanjil.label} eyebrow="SEMESTER GANJIL">
                    {viewMode === 'table' ? (
                      <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white">
                        <table className="min-w-[640px] w-full text-sm">
                          <thead>
                            <tr className="bg-brand-navy text-white">
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider w-16">No</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Kegiatan</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Tanggal</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Keterangan</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {ganjilEvents.map((item, idx) => (
                              <tr key={idx} className={`hover:bg-brand-mist/20 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-brand-mist/5'}`}>
                                <td className="px-5 py-4 text-gray-400 font-bold text-xs">{idx + 1}</td>
                                <td className="px-5 py-4 font-bold text-brand-navy">{item.kegiatan}</td>
                                <td className="px-5 py-4 text-gray-600 font-semibold">{item.tanggal}</td>
                                <td className="px-5 py-4 text-gray-400 font-semibold text-xs">{item.keterangan || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ganjilEvents.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-brand-navy/15 hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-[9px] font-bold text-brand-navy/60 bg-brand-navy/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Kegiatan {idx + 1}
                              </span>
                              <h4 className="font-bold text-brand-navy text-sm md:text-base leading-snug mt-2.5">{item.kegiatan}</h4>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100/50 flex flex-col gap-2">
                              <p className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar size={12} />
                                {item.tanggal}
                              </p>
                              {item.keterangan && item.keterangan !== '-' && (
                                <p className="text-gray-400 text-xs font-semibold flex items-center gap-1.5">
                                  <Info size={12} className="text-gray-300" />
                                  {item.keterangan}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </motion.div>
              )}

              {/* Semester Genap Section */}
              {(activeSemester === 'semua' || activeSemester === 'genap') && genapEvents.length > 0 && (
                <motion.div
                  key="genap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SectionCard title={data.semesterGenap.label} eyebrow="SEMESTER GENAP">
                    {viewMode === 'table' ? (
                      <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white">
                        <table className="min-w-[640px] w-full text-sm">
                          <thead>
                            <tr className="bg-brand-navy text-white">
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider w-16">No</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Kegiatan</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Tanggal</th>
                              <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Keterangan</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {genapEvents.map((item, idx) => (
                              <tr key={idx} className={`hover:bg-brand-mist/20 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-brand-mist/5'}`}>
                                <td className="px-5 py-4 text-gray-400 font-bold text-xs">{idx + 1}</td>
                                <td className="px-5 py-4 font-bold text-brand-navy">{item.kegiatan}</td>
                                <td className="px-5 py-4 text-gray-600 font-semibold">{item.tanggal}</td>
                                <td className="px-5 py-4 text-gray-400 font-semibold text-xs">{item.keterangan || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {genapEvents.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-brand-navy/15 hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-[9px] font-bold text-brand-navy/60 bg-brand-navy/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Kegiatan {idx + 1}
                              </span>
                              <h4 className="font-bold text-brand-navy text-sm md:text-base leading-snug mt-2.5">{item.kegiatan}</h4>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100/50 flex flex-col gap-2">
                              <p className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar size={12} />
                                {item.tanggal}
                              </p>
                              {item.keterangan && item.keterangan !== '-' && (
                                <p className="text-gray-400 text-xs font-semibold flex items-center gap-1.5">
                                  <Info size={12} className="text-gray-300" />
                                  {item.keterangan}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </motion.div>
              )}

              {/* Kegiatan Penting Section */}
              {(activeSemester === 'semua' || activeSemester === 'penting') && pentingEvents.length > 0 && (
                <motion.div
                  key="penting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SectionCard title="Kegiatan Penting Lainnya" eyebrow="OTHER KEY EVENTS">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pentingEvents.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-brand-navy/15 hover:shadow-premium transition-all duration-300"
                        >
                          <div className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <Calendar size={18} className="text-brand-navy" />
                          </div>
                          <div>
                            <p className="font-bold text-brand-navy text-sm sm:text-base leading-snug">{item.nama}</p>
                            <p className="text-brand-gold text-xs font-bold mt-1.5 uppercase tracking-wider">{item.tanggal}</p>
                            {item.keterangan && <p className="text-gray-400 text-xs font-semibold mt-1">{item.keterangan}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
