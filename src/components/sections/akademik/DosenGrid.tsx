import Link from 'next/link';
import type { Dosen } from '@/lib/data/dosen';
import { Mail, BookOpen } from 'lucide-react';

const jabatanLabel: Record<string, string> = {
  Profesor: 'Profesor',
  'Lektor Kepala': 'Lektor Kepala',
  Lektor: 'Lektor',
  'Asisten Ahli': 'Asisten Ahli',
};

const jabatanColor: Record<string, string> = {
  Profesor: 'bg-purple-100 text-purple-800 border-purple-200',
  'Lektor Kepala': 'bg-blue-100 text-blue-800 border-blue-200',
  Lektor: 'bg-green-100 text-green-800 border-green-200',
  'Asisten Ahli': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function DosenGrid({ dosenList }: { dosenList?: Dosen[] }) {
  const list = dosenList ?? [];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-8">
        STTPU Jakarta didukung oleh tenaga pengajar berpengalaman dan berkualifikasi tinggi —
        doktor dan master dari universitas terkemuka dalam dan luar negeri — yang aktif dalam
        penelitian dan pengabdian masyarakat.
      </p>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Data dosen belum tersedia.
        </div>
      ) : (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" aria-label="Daftar dosen STTPU">
        {list.map((dosen) => (
          <li key={dosen.slug || dosen.email || dosen.nama}>
            {dosen.slug ? (
              <Link
                href={`/akademik/dosen/${dosen.slug}`}
                className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-brand-navy hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 bg-brand-mist border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-brand-navy/30"
                    aria-hidden="true"
                  >
                    {dosen.nama.charAt(dosen.nama.indexOf('.') + 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-brand-navy transition-colors line-clamp-2">
                      {dosen.nama}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">NIDN {dosen.nidn}</p>
                  </div>
                </div>

                <span
                  className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${jabatanColor[dosen.jabatanFungsional] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
                >
                  {jabatanLabel[dosen.jabatanFungsional] ?? dosen.jabatanFungsional}
                </span>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dosen.bidangKeahlian.slice(0, 2).map((k) => (
                    <span key={k} className="inline-block bg-brand-mist text-brand-navy text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200">
                      {k}
                    </span>
                  ))}
                  {dosen.bidangKeahlian.length > 2 && (
                    <span className="inline-block text-gray-400 text-[10px] px-1">
                      +{dosen.bidangKeahlian.length - 2}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <BookOpen size={12} aria-hidden="true" />
                    {dosen.publikasi.length} publikasi
                  </span>
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Mail size={12} aria-hidden="true" />
                    <span className="truncate max-w-32">{dosen.email}</span>
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 opacity-80">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 bg-brand-mist border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-brand-navy/30"
                    aria-hidden="true"
                  >
                    {dosen.nama.charAt(dosen.nama.indexOf('.') + 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
                      {dosen.nama}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">NIDN {dosen.nidn}</p>
                  </div>
                </div>

                <span
                  className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${jabatanColor[dosen.jabatanFungsional] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
                >
                  {jabatanLabel[dosen.jabatanFungsional] ?? dosen.jabatanFungsional}
                </span>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dosen.bidangKeahlian.slice(0, 2).map((k) => (
                    <span key={k} className="inline-block bg-brand-mist text-brand-navy text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200">
                      {k}
                    </span>
                  ))}
                  {dosen.bidangKeahlian.length > 2 && (
                    <span className="inline-block text-gray-400 text-[10px] px-1">
                      +{dosen.bidangKeahlian.length - 2}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <BookOpen size={12} aria-hidden="true" />
                    {dosen.publikasi.length} publikasi
                  </span>
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Mail size={12} aria-hidden="true" />
                    <span className="truncate max-w-32">{dosen.email}</span>
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}
