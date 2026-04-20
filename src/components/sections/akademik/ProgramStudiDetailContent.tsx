import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { programStudiList } from '@/lib/data/program-studi';
import { ShieldCheck, BookOpen, Briefcase, GraduationCap, Clock, Hash, ChevronRight } from 'lucide-react';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-100 text-green-800 border-green-300',
  'Baik Sekali': 'bg-blue-100 text-blue-800 border-blue-300',
  Baik: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export default function ProgramStudiDetailContent({ prodi }: { prodi: ProgramStudi }) {
  const others = programStudiList.filter((p) => p.slug !== prodi.slug);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0 space-y-10">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#1E3A5F]/20">
            {prodi.jenjang}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${akreditasiColor[prodi.akreditasi] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            <ShieldCheck size={11} className="inline mr-1" aria-hidden="true" />
            Akreditasi {prodi.akreditasi}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: 'Masa Studi', value: prodi.masaStudi },
            { icon: Hash, label: 'Total SKS', value: `${prodi.jumlahSKS} SKS` },
            { icon: GraduationCap, label: 'Gelar', value: 'S.Tr.T.' },
            { icon: ShieldCheck, label: 'SK Akreditasi', value: `Berlaku s/d ${prodi.berlakuHingga}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-[#F0F4F8] rounded-xl p-4 text-center border border-gray-200">
              <Icon size={18} className="text-[#F5A623] mx-auto mb-1.5" aria-hidden="true" />
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">{label}</p>
              <p className="font-bold text-gray-900 text-sm leading-tight">{value}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-lg font-bold text-[#1E3A5F] mb-3">Tentang Program Studi</h2>
          {prodi.deskripsiHtml ? (
            <div
              className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: prodi.deskripsiHtml }}
            />
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed">{prodi.deskripsi}</p>
          )}
        </section>

        <section className="bg-[#1E3A5F] rounded-xl p-6 text-white">
          <h2 className="font-bold text-base mb-3">Visi</h2>
          <p className="text-white/90 text-sm leading-relaxed">{prodi.visi}</p>
          <div className="mt-5">
            <h3 className="font-semibold text-sm text-[#F5A623] mb-3">Misi</h3>
            <ol className="space-y-2">
              {prodi.misi.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white font-bold text-[10px] flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-[#F5A623]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1E3A5F]">Kompetensi Lulusan</h2>
          </div>
          <ul className="space-y-2.5">
            {prodi.kompetensiLulusan.map((k, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F5A623]/20 text-[#1E3A5F] font-bold text-[10px] flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={18} className="text-[#F5A623]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1E3A5F]">Prospek Karir</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prodi.prospekKarir.map((k, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0 mt-2" aria-hidden="true" />
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={18} className="text-[#F5A623]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1E3A5F]">Kurikulum</h2>
          </div>
          <div className="space-y-4">
            {prodi.kurikulum.map((sem) => (
              <details
                key={sem.semester}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group"
                open={sem.semester <= 2}
              >
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer select-none hover:bg-[#F0F4F8] transition-colors list-none">
                  <span className="font-semibold text-gray-900 text-sm">
                    Semester {sem.semester}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                  <ul className="space-y-1.5">
                    {sem.mataKuliah.map((mk, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]/40 flex-shrink-0" aria-hidden="true" />
                        {mk}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Kurikulum dapat berubah sesuai kebijakan institusi.{' '}
            <button className="text-[#1E3A5F] underline hover:text-[#F5A623] transition-colors">
              Unduh kurikulum lengkap (PDF)
            </button>
          </p>
        </section>
      </article>

      <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div className="bg-[#1E3A5F] rounded-xl p-5 text-white">
          <p className="font-bold text-sm mb-1">Berminat mendaftar?</p>
          <p className="text-white/75 text-xs mb-4 leading-relaxed">
            Informasi penerimaan mahasiswa baru tersedia di website PMB STTPU.
          </p>
          <a
            href="https://pmb.sttpu.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#F5A623] text-[#1E3A5F] font-bold text-sm py-2.5 rounded-lg hover:bg-[#e09615] transition-colors"
          >
            Website PMB →
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-[#F0F4F8] px-4 py-3 border-b border-gray-200">
            <p className="font-bold text-[#1E3A5F] text-xs uppercase tracking-wide">Program Studi Lain</p>
          </div>
          <ul>
            {others.map((p) => (
              <li key={p.slug} className="border-b border-gray-100 last:border-0">
                <Link
                  href={`/akademik/program-studi/${p.slug}`}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F4F8] hover:text-[#1E3A5F] transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]/50 group-hover:bg-[#F5A623] flex-shrink-0 transition-colors" aria-hidden="true" />
                  {p.nama}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900 text-sm mb-2">Ada pertanyaan?</p>
          <p className="text-gray-500 text-xs mb-3 leading-relaxed">
            Hubungi Bagian Akademik STTPU untuk informasi lebih lanjut tentang program ini.
          </p>
          <Link
            href="/kontak"
            className="block w-full text-center border border-[#1E3A5F] text-[#1E3A5F] font-semibold text-sm py-2 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </aside>
    </div>
  );
}
