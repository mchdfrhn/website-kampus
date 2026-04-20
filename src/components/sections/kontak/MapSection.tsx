import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function MapSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {/* Map placeholder — ganti dengan <iframe> Google Maps saat go-live */}
      <div className="lg:col-span-2 h-80 lg:h-[400px] bg-gray-200 flex flex-col items-center justify-center gap-3 text-gray-500">
        <MapPin size={48} className="text-gray-400" />
        <span className="text-sm font-medium">Google Maps — Lokasi STTPU Jakarta</span>
      </div>

      <div className="bg-white p-7 border-l border-gray-200">
        <h2 className="font-bold text-[#1E3A5F] text-base mb-5">Informasi Kontak</h2>

        <div className="flex gap-3 items-start mb-4">
          <MapPin size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Alamat</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Jl. Pelajar Pejuang 45 No. 1, Kelurahan Babakan Ciparay, Kota Bandung, Jawa Barat
              40264
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start mb-4">
          <Phone size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">
              Telepon
            </p>
            <div className="flex flex-col gap-0.5">
              <a
                href="tel:+62215551234"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                (021) 555-1234 — Kantor Pusat
              </a>
              <a
                href="tel:+62215551235"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                (021) 555-1235 — PMB
              </a>
              <a
                href="tel:+62215551236"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                (021) 555-1236 — Akademik
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-start mb-4">
          <Mail size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Email</p>
            <div className="flex flex-col gap-0.5">
              <a
                href="mailto:info@sttpu.ac.id"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                info@sttpu.ac.id — Umum
              </a>
              <a
                href="mailto:pmb@sttpu.ac.id"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                pmb@sttpu.ac.id — Pendaftaran
              </a>
              <a
                href="mailto:akademik@sttpu.ac.id"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                akademik@sttpu.ac.id
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-start mb-4">
          <Clock size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">
              Jam Operasional
            </p>
            <table className="text-sm text-gray-700">
              <tbody>
                <tr>
                  <td className="pr-3 py-0.5">Senin – Jumat</td>
                  <td className="py-0.5">08.00 – 16.00 WIB</td>
                </tr>
                <tr>
                  <td className="pr-3 py-0.5">Sabtu</td>
                  <td className="py-0.5">08.00 – 12.00 WIB</td>
                </tr>
                <tr>
                  <td className="pr-3 py-0.5 text-gray-500">Minggu &amp; Libur</td>
                  <td className="py-0.5 text-gray-500">Tutup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <MessageCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#25D366' }} />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">
              WhatsApp
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
            >
              +62 812-3456-7890
            </a>
            <p className="text-gray-400 text-xs mt-0.5">Responsif Mon–Fri</p>
          </div>
        </div>
      </div>
    </div>
  );
}
