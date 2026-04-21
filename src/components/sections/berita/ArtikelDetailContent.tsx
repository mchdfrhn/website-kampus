import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User, Tag, ArrowLeft, ArrowRight, Share2, Pin } from 'lucide-react';
import type { Artikel } from '@/lib/data/berita';
import { kategoriLabel, kategoriColor, formatTanggal } from '@/lib/data/berita';

function parseMarkdown(text: string): string {
  return text
    .split('\n\n')
    .map((para) => {
      if (para.startsWith('**') && para.endsWith('**') && !para.slice(2, -2).includes('\n')) {
        return `<h3 class="font-bold text-gray-900 text-base mt-6 mb-2">${para.slice(2, -2)}</h3>`;
      }
      const withBold = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (para.startsWith('- ') || para.startsWith('1. ')) {
        const items = withBold.split('\n').filter(Boolean);
        const tag = para.startsWith('1. ') ? 'ol' : 'ul';
        const listClass = tag === 'ol' ? 'list-decimal' : 'list-disc';
        return `<${tag} class="${listClass} pl-5 space-y-1 my-3 text-gray-700 text-sm">${items
          .map((i) => `<li>${i.replace(/^[-\d]+\.\s/, '')}</li>`)
          .join('')}</${tag}>`;
      }
      return `<p class="text-gray-700 text-sm leading-relaxed mb-0">${withBold}</p>`;
    })
    .join('\n');
}

export default function ArtikelDetailContent({
  artikel,
  artikelTerkait = [],
}: {
  artikel: Artikel;
  artikelTerkait?: Artikel[];
}) {
  const terkait = artikelTerkait;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        <article className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span
              className={`text-[9px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider bg-white shadow-sm ${kategoriColor[artikel.kategori]}`}
            >
              {kategoriLabel[artikel.kategori]}
            </span>
            {artikel.isPinned && (
              <span className="flex items-center gap-2 text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                <Pin size={12} aria-hidden="true" />
                Highlight
              </span>
            )}
          </div>

          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy leading-[1.2] mb-8 tracking-tight">
            {artikel.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-12 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-2 group cursor-default">
              <Calendar size={14} className="text-brand-gold" aria-hidden="true" />
              {formatTanggal(artikel.tanggalTerbit)}
            </span>
            <span className="flex items-center gap-2 group cursor-default">
              <User size={14} className="text-brand-gold" aria-hidden="true" />
              {artikel.penulis}
            </span>
            <span className="flex items-center gap-2 group cursor-default">
              <Clock size={14} className="text-brand-gold" aria-hidden="true" />
              {artikel.readingTime} Menit Baca
            </span>
          </div>

          <div className="aspect-[21/9] bg-gray-50 rounded-2xl overflow-hidden relative mb-12 shadow-2xl shadow-brand-navy/5">
            {artikel.thumbnailUrl ? (
              <Image src={artikel.thumbnailUrl} alt={artikel.judul} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-brand-navy/10 text-xs font-bold uppercase tracking-widest italic">STTPU News</p>
              </div>
            )}
          </div>

          <div
            className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-brand-navy prose-strong:font-bold"
            dangerouslySetInnerHTML={{
              __html: artikel.kontenHtml ?? parseMarkdown(artikel.konten),
            }}
          />

          {artikel.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-16 pt-8 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
              {artikel.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-50 text-brand-navy text-[10px] px-3 py-1.5 rounded-lg border border-gray-100 font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/berita"
              className="group flex items-center gap-3 text-xs text-brand-navy font-bold uppercase tracking-wider hover:text-brand-gold transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                <ArrowLeft size={16} aria-hidden="true" />
              </div>
              Kembali
            </Link>
            <button
              className="group flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-wider hover:text-brand-navy transition-all"
              aria-label="Bagikan artikel ini"
            >
              Share
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all">
                <Share2 size={16} aria-hidden="true" />
              </div>
            </button>
          </div>
        </article>

        <aside className="w-full lg:w-80 flex-shrink-0 space-y-10">
          {terkait.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-brand-navy/5">
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-100">
                <p className="font-bold text-brand-navy text-[11px] uppercase tracking-wider">
                  Berita Terkait
                </p>
              </div>
              <ul className="divide-y divide-gray-50">
                {terkait.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/berita/${a.slug}`}
                      className="flex items-start gap-4 p-6 hover:bg-gray-50 transition-all group"
                    >
                      <div
                        className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative"
                      >
                         {a.thumbnailUrl && <Image src={a.thumbnailUrl} alt={a.judul} fill className="object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-xs font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-relaxed line-clamp-2">
                          {a.judul}
                        </p>
                        <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-wider">{formatTanggal(a.tanggalTerbit)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-brand-navy rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20 group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all" />
            <p className="font-bold text-lg mb-3 tracking-tight">Butuh Informasi?</p>
            <p className="text-white/60 text-xs mb-8 leading-relaxed font-medium">
              Ada pertanyaan mengenai konten artikel ini? Tim Humas kami siap membantu Anda.
            </p>
            <Link
              href="/kontak"
              className="flex items-center justify-center w-full bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-brand-gold/10"
            >
              Hubungi Kami
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-brand-navy/5">
            <p className="font-bold text-brand-navy text-[11px] uppercase tracking-wider mb-6">Explore Kategori</p>
            <ul className="space-y-4">
              {(Object.keys(kategoriLabel) as Artikel['kategori'][]).map((k) => (
                <li key={k}>
                  <Link
                    href={`/berita?kategori=${k}`}
                    className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-brand-gold transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        k === 'pengumuman' ? 'bg-red-400' : 
                        k === 'akademik' ? 'bg-blue-400' : 
                        k === 'kemahasiswaan' ? 'bg-green-400' : 
                        k === 'penelitian' ? 'bg-purple-400' : 
                        k === 'kerjasama' ? 'bg-orange-400' : 'bg-yellow-400'
                      )} />
                      {kategoriLabel[k]}
                    </div>
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
