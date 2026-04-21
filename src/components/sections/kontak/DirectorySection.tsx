import { MessageCircle, Phone, Mail, User2, BookOpen, CreditCard, Users, Database, Globe, Megaphone } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type UnitItem = {
  unit: string
  kepala?: string
  telepon?: string
  telHref?: string
  email?: string
  tugas?: string
}

const icons: Record<string, any> = {
  'Bagian Akademik': BookOpen,
  'Bagian Keuangan': CreditCard,
  'PMB': User2,
  'Bagian Kemahasiswaan': Users,
  'Unit Teknologi Informasi': Database,
  'LPPM': Globe,
  'Humas & Marketing': Megaphone,
}

const defaults: UnitItem[] = [
  { unit: 'Bagian Akademik', kepala: 'Dra. Sri Mulyani, M.Pd.', telepon: '(021) 555-1236', telHref: '+62215551236', email: 'akademik@sttpu.ac.id', tugas: 'KRS, jadwal kuliah, nilai, kalender akademik, surat keterangan aktif' },
  { unit: 'Bagian Keuangan', kepala: 'Ir. Hadi Santoso, M.M.', telepon: '(021) 555-1237', telHref: '+62215551237', email: 'keuangan@sttpu.ac.id', tugas: 'Pembayaran SPP, tagihan, cicilan, konfirmasi pembayaran' },
  { unit: 'PMB', kepala: 'Dr. Anisa Putri, M.T.', telepon: '(021) 555-1235', telHref: '+62215551235', email: 'pmb@sttpu.ac.id', tugas: 'Pendaftaran baru, jalur masuk, persyaratan, biaya, jadwal seleksi' },
  { unit: 'Bagian Kemahasiswaan', kepala: 'Bapak Ridwan Arifin, S.Sos.', telepon: '(021) 555-1238', telHref: '+62215551238', email: 'kemahasiswaan@sttpu.ac.id', tugas: 'Beasiswa, organisasi mahasiswa, kegiatan ekstrakurikuler, magang' },
  { unit: 'Unit Teknologi Informasi', kepala: 'Edi Purnomo, S.Kom., M.T.', telepon: '(021) 555-1239', telHref: '+62215551239', email: 'it@sttpu.ac.id', tugas: 'Akun SIAKAD/LMS, reset password, gangguan sistem, jaringan internet' },
  { unit: 'LPPM', kepala: 'Prof. Dr. Bambang Wibowo', telepon: '(021) 555-1240', telHref: '+62215551240', email: 'lppm@sttpu.ac.id', tugas: 'Proposal riset, hibah penelitian, PKM, kerjasama industri, jurnal' },
  { unit: 'Humas & Marketing', kepala: 'Ibu Dewi Kartika, S.Sos., M.M.', telepon: '(021) 555-1241', telHref: '+62215551241', email: 'humas@sttpu.ac.id', tugas: 'Media, publikasi, kerjasama media, event, dokumentasi kegiatan' },
]

export default async function DirectorySection() {
  let units = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'unit-kontak',
      sort: 'urutan',
      limit: 50,
    })
    if (result.docs.length > 0) {
      units = result.docs as unknown as UnitItem[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-brand-navy font-bold text-3xl tracking-tight">Direktori Unit Kerja</h2>
          <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
          <p className="mt-6 text-gray-600 font-medium max-w-2xl leading-relaxed">
            Silakan hubungi unit terkait di bawah ini untuk bantuan administratif, akademik, atau layanan informasi lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((row) => {
            const Icon = icons[row.unit] || Users;
            return (
              <div
                key={row.unit}
                className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 flex flex-col h-full hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-500 group"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-300">
                    <Icon size={24} className="text-brand-navy group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg leading-tight group-hover:text-brand-gold transition-colors">{row.unit}</h3>
                    <p className="text-brand-gold text-[10px] font-bold uppercase tracking-wider mt-1">Layanan Unit</p>
                  </div>
                </div>

                <div className="flex-1 mb-10 space-y-6">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Kepala Unit</p>
                    <p className="text-brand-navy font-bold text-sm leading-relaxed">{row.kepala}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Tugas Pokok</p>
                    <p className="text-gray-500 font-medium text-xs leading-relaxed">{row.tugas}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-wrap gap-3">
                  {row.telHref && (
                    <a
                      href={`https://wa.me/${row.telHref.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-green-500/10"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  )}
                  {row.email && (
                    <a
                      href={`mailto:${row.email}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-navy/90 transition-all shadow-lg shadow-brand-navy/10"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  )}
                  {row.telHref && (
                    <a
                      href={`tel:${row.telHref}`}
                      className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider py-4 rounded-xl hover:border-brand-gold hover:text-brand-gold hover:bg-gray-50 transition-all"
                    >
                      <Phone size={14} />
                      {row.telepon}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
