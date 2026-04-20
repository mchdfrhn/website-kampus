import Link from 'next/link';
import type { Dosen } from '@/lib/data/dosen';
import { dosenList as staticDosenList } from '@/lib/data/dosen';
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
  const list = dosenList ?? staticDosenList;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-8">
        STTPU Jakarta didukung oleh tenaga pengajar berpengalaman dan berkualifikasi tinggi —
        doktor dan master dari universitas terkemuka dalam dan luar negeri — yang aktif dalam
        penelitian dan pengabdian masyarakat.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Daftar dosen STTPU">
        {list.map((dosen) => (
          <li key={dosen.slug}>
            <Link
              href={`/akademik/dosen/${dosen.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1E3A5F] hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 bg-[#F0F4F8] border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-[#1E3A5F]/30"
                  aria-hidden="true"
                >
                  {dosen.nama.charAt(dosen.nama.indexOf('.') + 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#1E3A5F] transition-colors line-clamp-2">
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
                  <span key={k} className="inline-block bg-[#F0F4F8] text-[#1E3A5F] text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200">
                    {k}
                  </span>
                ))}
                {dosen.bidangKeahlian.length > 2 && (
                  <span className="inline-block text-gray-400 text-[10px] px-1">
                    +{dosen.bidangKeahlian.length - 2}
                  </span>
                )}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={12} aria-hidden="true" />
                  {dosen.publikasi.length} publikasi
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={12} aria-hidden="true" />
                  <span className="truncate max-w-32">{dosen.email}</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
