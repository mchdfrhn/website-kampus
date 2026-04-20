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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <article className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${kategoriColor[artikel.kategori]}`}
            >
              {kategoriLabel[artikel.kategori]}
            </span>
            {artikel.isPinned && (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                <Pin size={11} aria-hidden="true" />
                Disematkan
              </span>
            )}
          </div>

          <h1 className="font-extrabold text-2xl text-gray-900 leading-snug mb-5">
            {artikel.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} aria-hidden="true" />
              {formatTanggal(artikel.tanggalTerbit)}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={13} aria-hidden="true" />
              {artikel.penulis}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} aria-hidden="true" />
              {artikel.readingTime} menit baca
            </span>
          </div>

          <div className="h-64 bg-[#F0F4F8] border border-gray-200 rounded-xl overflow-hidden relative mb-8">
            {artikel.thumbnailUrl ? (
              <Image src={artikel.thumbnailUrl} alt={artikel.judul} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-sm italic">Foto Artikel</p>
              </div>
            )}
          </div>

          <div
            className="space-y-3"
            dangerouslySetInnerHTML={{
              __html: artikel.kontenHtml ?? parseMarkdown(artikel.konten),
            }}
          />

          {artikel.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-200">
              <Tag size={14} className="text-gray-400" aria-hidden="true" />
              {artikel.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#F0F4F8] text-[#1E3A5F] text-xs px-2.5 py-1 rounded-lg border border-gray-200 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm text-[#1E3A5F] font-semibold hover:text-[#F5A623] transition-colors"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Kembali ke Berita
            </Link>
            <button
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors"
              aria-label="Bagikan artikel ini"
            >
              <Share2 size={15} aria-hidden="true" />
              Bagikan
            </button>
          </div>
        </article>

        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
          {terkait.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-[#F0F4F8] px-4 py-3 border-b border-gray-200">
                <p className="font-bold text-[#1E3A5F] text-xs uppercase tracking-wide">
                  Berita Terkait
                </p>
              </div>
              <ul>
                {terkait.map((a) => (
                  <li key={a.slug} className="border-b border-gray-100 last:border-0">
                    <Link
                      href={`/berita/${a.slug}`}
                      className="flex items-start gap-3 p-4 hover:bg-[#F0F4F8] transition-colors group"
                    >
                      <div
                        className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-[#1E3A5F] transition-colors leading-snug line-clamp-2">
                          {a.judul}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">{formatTanggal(a.tanggalTerbit)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-[#1E3A5F] rounded-xl p-5 text-white">
            <p className="font-bold text-sm mb-2">Butuh bantuan?</p>
            <p className="text-white/75 text-xs mb-4 leading-relaxed">
              Ada pertanyaan tentang informasi dalam berita ini? Hubungi kami langsung.
            </p>
            <Link
              href="/kontak"
              className="block w-full text-center bg-[#F5A623] text-[#1E3A5F] font-bold text-sm py-2.5 rounded-lg hover:bg-[#e09615] transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-bold text-gray-900 text-sm mb-3">Kategori Berita</p>
            <ul className="space-y-1.5">
              {(Object.keys(kategoriLabel) as Artikel['kategori'][]).map((k) => (
                <li key={k}>
                  <Link
                    href={`/berita?kategori=${k}`}
                    className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#1E3A5F] transition-colors group"
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                        k === 'pengumuman'
                          ? 'bg-red-400'
                          : k === 'akademik'
                            ? 'bg-blue-400'
                            : k === 'kemahasiswaan'
                              ? 'bg-green-400'
                              : k === 'penelitian'
                                ? 'bg-purple-400'
                                : k === 'kerjasama'
                                  ? 'bg-orange-400'
                                  : 'bg-yellow-400'
                      }`}
                      aria-hidden="true"
                    />
                    {kategoriLabel[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/berita"
              className="flex-1 text-center text-sm border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors font-medium flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Semua Berita
            </Link>
            <Link
              href="/berita"
              className="flex-1 text-center text-sm border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors font-medium flex items-center justify-center gap-1.5"
            >
              Berikutnya
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
