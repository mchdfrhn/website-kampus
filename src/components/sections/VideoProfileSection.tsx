'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Info } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function VideoProfileSection({ data }: { data?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  // Helper function to ensure URL is in embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    
    let cleanUrl = url.trim();

    // If user pasted the whole <iframe> tag, extract only the src
    if (cleanUrl.startsWith('<iframe')) {
      const srcMatch = cleanUrl.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        cleanUrl = srcMatch[1];
      }
    }
    
    // If it's already an embed URL, return it
    if (cleanUrl.includes('youtube.com/embed/')) return cleanUrl;
    
    // Handle standard watch?v= format
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      const id = cleanUrl.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    
    // Handle youtu.be/ format
    if (cleanUrl.includes('youtu.be/')) {
      const id = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    
    return cleanUrl;
  };

  const videoUrl = getEmbedUrl(data?.videoUrl);
  const thumbnailUrl = data?.videoThumbnail?.url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop";
  const judul = data?.videoJudul || "Jelajahi Kampus Kami";
  const deskripsi = data?.videoDeskripsi || "Saksikan sekilas kehidupan akademik dan fasilitas unggulan di Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta.";

  // Lock scroll when video is open (including Lenis control)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4"
            >
              {judul}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              {deskripsi}
            </motion.p>
          </div>

          {/* Video Thumbnail Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Background Image */}
            <Image
              src={thumbnailUrl}
              alt={judul}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/20 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-full bg-brand-gold/40 animate-ping scale-150" />
                <div className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping scale-125" />
                
                <button className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <Play size={32} fill="currentColor" className="ml-1" />
                </button>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg sm:text-xl">{judul}</p>
                  <p className="text-white/60 text-xs sm:text-sm">Durasi: 3 Menit 45 Detik</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-10"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy transition-all"
            >
              <X size={24} />
            </button>

            {/* Video Player Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-3xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`}
                title="STTPU Video Profile"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
