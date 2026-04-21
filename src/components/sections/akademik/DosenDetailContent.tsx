import Link from 'next/link';
import type { Dosen } from '@/lib/data/dosen';
import { Mail, BookOpen, GraduationCap, Award, ExternalLink } from 'lucide-react';

const jabatanColor: Record<string, string> = {
  Profesor: 'bg-purple-100 text-purple-800 border-purple-200',
  'Lektor Kepala': 'bg-blue-100 text-blue-800 border-blue-200',
  Lektor: 'bg-green-100 text-green-800 border-green-200',
  'Asisten Ahli': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function DosenDetailContent({ dosen }: { dosen: Dosen }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div
            className="w-28 h-32 bg-brand-mist border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <span className="text-gray-400 text-xs">Foto Resmi</span>
          </div>
          <h2 className="font-bold text-gray-900 text-sm leading-snug mb-1">{dosen.nama}</h2>
          <p className="text-gray-500 text-xs mb-3">NIDN {dosen.nidn}</p>
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${jabatanColor[dosen.jabatanFungsional] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
          >
            {dosen.jabatanFungsional}
          </span>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href={`mailto:${dosen.email}`}
              className="flex items-center justify-center gap-2 text-xs text-brand-navy hover:text-brand-gold transition-colors"
            >
              <Mail size={13} aria-hidden="true" />
              {dosen.email}
            </a>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-brand-mist px-4 py-3 border-b border-gray-200">
            <p className="font-bold text-brand-navy text-xs uppercase tracking-wide">Program Studi</p>
          </div>
          <ul>
            {dosen.programStudi.map((ps) => (
              <li key={ps} className="px-4 py-2.5 border-b border-gray-100 last:border-0 text-sm text-gray-700">
                {ps}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/akademik/dosen"
          className="block text-center text-sm text-brand-navy font-medium hover:text-brand-gold transition-colors"
        >
          ← Kembali ke Direktori Dosen
        </Link>
      </aside>

      <article className="flex-1 min-w-0 space-y-8">
        <section>
          <h2 className="text-lg font-bold text-brand-navy mb-3">Biografi</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{dosen.bio}</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-brand-gold" aria-hidden="true" />
            <h2 className="text-lg font-bold text-brand-navy">Pendidikan</h2>
          </div>
          <p className="text-gray-700 text-sm">{dosen.pendidikanTerakhir}</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-brand-gold" aria-hidden="true" />
            <h2 className="text-lg font-bold text-brand-navy">Bidang Keahlian</h2>
          </div>
          <ul className="flex flex-wrap gap-2">
            {dosen.bidangKeahlian.map((k) => (
              <li
                key={k}
                className="bg-brand-navy/10 text-brand-navy text-sm font-medium px-3 py-1.5 rounded-lg border border-brand-navy/20"
              >
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={18} className="text-brand-gold" aria-hidden="true" />
            <h2 className="text-lg font-bold text-brand-navy">
              Publikasi ({dosen.publikasi.length})
            </h2>
          </div>
          <ul className="space-y-4">
            {dosen.publikasi.map((pub, idx) => (
              <li
                key={idx}
                className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-navy/30 transition-colors"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-gold/15 text-brand-navy font-bold text-sm flex items-center justify-center"
                  aria-hidden="true"
                >
                  {pub.tahun.toString().slice(2)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                    {pub.judul}
                  </p>
                  <p className="text-gray-500 text-xs">{pub.jurnal}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{pub.tahun}</p>
                </div>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Baca publikasi: ${pub.judul}`}
                    className="flex-shrink-0 text-brand-navy hover:text-brand-gold transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
