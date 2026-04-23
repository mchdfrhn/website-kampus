'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { formatGaleriTanggal, type Album } from '@/lib/data/galeri';
import { getKategoriSoftBadgeClass } from '@/lib/data/kategori';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function AlbumDetailContent({ album }: { album: Album }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImage = useCallback(() => {
    if (selectedIndex === null || !album.foto) return;
    setSelectedIndex((prev) => (prev! + 1) % album.foto!.length);
  }, [selectedIndex, album.foto]);

  const prevImage = useCallback(() => {
    if (selectedIndex === null || !album.foto) return;
    setSelectedIndex((prev) => (prev! - 1 + album.foto!.length) % album.foto!.length);
  }, [selectedIndex, album.foto]);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${album.slug}-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (selectedIndex !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm border ${getKategoriSoftBadgeClass(album.kategori.warna, 'navy')}`}>
            {album.kategori.nama}
          </span>
          {album.tanggal && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <Calendar size={14} className="text-brand-gold" />
              <span>{formatGaleriTanggal(album.tanggal)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <ImageIcon size={14} className="text-brand-gold" />
            <span>{album.jumlahFoto} Foto</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-6 leading-tight">
          {album.judul}
        </h1>

        {album.deskripsi && (
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl font-medium">
            {album.deskripsi}
          </p>
        )}
      </motion.div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {album.foto?.map((foto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 cursor-pointer"
          >
            <Image
              src={foto.url}
              alt={foto.keterangan || album.judul}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                  <ImageIcon className="text-white" size={20} />
               </div>
            </div>
            {foto.keterangan && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-white text-xs font-medium leading-relaxed">
                  {foto.keterangan}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && album.foto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-3xl flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 sm:p-6">
              <div className="text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">
                  {album.judul}
                </p>
                <p className="text-[10px] font-medium text-white/40">
                  Foto {selectedIndex + 1} dari {album.foto.length}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(album.foto![selectedIndex].url, selectedIndex)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all"
                  title="Download Foto"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex items-center justify-center p-4">
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all sm:left-10"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative w-full h-full max-w-5xl max-h-[70vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={album.foto[selectedIndex].url}
                      alt={album.foto[selectedIndex].keterangan || album.judul}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all sm:right-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            {album.foto[selectedIndex].keterangan && (
              <div className="p-6 sm:p-10 text-center">
                <p className="text-white/80 text-sm font-medium max-w-2xl mx-auto">
                  {album.foto[selectedIndex].keterangan}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {album.foto?.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <ImageIcon size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-bold">Belum ada foto di album ini</p>
        </div>
      )}
    </div>
  );
}
