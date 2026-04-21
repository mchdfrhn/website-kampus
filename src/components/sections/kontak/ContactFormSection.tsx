'use client';

import { type ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const schema = z.object({
  nama: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().optional(),
  unit: z.string().min(1, 'Pilih unit tujuan'),
  subjek: z.string().min(5, 'Subjek minimal 5 karakter'),
  pesan: z.string().min(20, 'Pesan minimal 20 karakter'),
  privasi: z.literal(true, {
    error: () => ({ message: 'Anda harus menyetujui kebijakan privasi' }),
  }),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'border border-gray-100 bg-gray-50 rounded-[1.25rem] px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white transition-all w-full placeholder:text-gray-400';

const defaultOtherChannels = [
  {
    icon: 'whatsapp',
    label: 'WhatsApp Official',
    desc: '+62 812-3456-7890',
    href: 'https://wa.me/6281234567890',
    external: true,
  },
  {
    icon: 'email',
    label: 'Email Institusi',
    desc: 'info@sttpu.ac.id',
    href: 'mailto:info@sttpu.ac.id',
    external: false,
  },
  {
    icon: 'phone',
    label: 'Saluran Telepon',
    desc: '(021) 555-1234',
    href: 'tel:+62215551234',
    external: false,
  },
  {
    icon: 'map',
    label: 'Lokasi Kampus',
    desc: 'Lihat Peta & Petunjuk',
    href: '#peta',
    external: false,
  },
];

const defaultFaqLinks = [
  { label: 'Prosedur pendaftaran mahasiswa baru', href: '/akademik/program-studi' },
  { label: 'Daftar program studi & akreditasi', href: '/akademik/program-studi' },
  { label: 'Akses SIAKAD & Portal Mahasiswa', href: '/portal' },
  { label: 'Jadwal & tata cara pembayaran SPP', href: '/portal' },
  { label: 'Pengajuan surat keterangan akademik', href: '/portal' },
];

type UnitOption = { label: string; value: string }
type ChannelItem = {
  icon: string
  label: string
  desc: string
  href: string
  external?: boolean
}
type FaqItem = { label: string; href: string }

const defaultUnitOptions: UnitOption[] = [
  { label: 'Bagian Akademik', value: 'Bagian Akademik' },
  { label: 'Bagian Keuangan', value: 'Bagian Keuangan' },
  { label: 'Bagian Kemahasiswaan', value: 'Bagian Kemahasiswaan' },
  { label: 'Unit IT / Helpdesk', value: 'Unit IT / Helpdesk' },
  { label: 'Perpustakaan', value: 'Perpustakaan' },
  { label: 'Umum / Lainnya', value: 'Umum / Lainnya' },
]

const channelStyles: Record<string, { icon: ReactElement; bg: string; color: string }> = {
  whatsapp: { icon: <MessageCircle size={20} />, bg: 'bg-green-50', color: 'text-[#25D366]' },
  email: { icon: <Mail size={20} />, bg: 'bg-brand-navy/5', color: 'text-brand-navy' },
  phone: { icon: <Phone size={20} />, bg: 'bg-brand-gold/5', color: 'text-brand-gold' },
  map: { icon: <MapPin size={20} />, bg: 'bg-gray-100', color: 'text-gray-600' },
}

export default function ContactFormSection({
  formTitle = 'Kirim Pesan',
  unitOptions = defaultUnitOptions,
  otherChannels = defaultOtherChannels,
  faqLinks = defaultFaqLinks,
}: {
  formTitle?: string
  unitOptions?: UnitOption[]
  otherChannels?: ChannelItem[]
  faqLinks?: FaqItem[]
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch('/api/v1/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: values.nama,
          email: values.email,
          telepon: values.telepon || undefined,
          unit: values.unit,
          subjek: values.subjek,
          pesan: values.pesan,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errs = data.errors as Record<string, string> | undefined;
        if (errs) {
          Object.entries(errs).forEach(([field, msg]) => {
            if (field === '_') {
              setServerError(msg);
            } else {
              setError(field as keyof FormValues, { message: msg });
            }
          });
        } else {
          setServerError('Terjadi kesalahan. Silakan coba lagi.');
        }
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError('Gagal menghubungi server. Periksa koneksi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-brand-navy font-bold text-3xl tracking-tight">{formTitle}</h2>
          <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            {submitted && (
              <div className="mb-10 bg-green-50 border border-green-100 text-green-800 text-[11px] font-bold uppercase tracking-wider px-8 py-6 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                   <Send size={16} className="text-green-600" />
                </div>
                Pesan Anda telah terkirim! Kami akan merespons dalam 1–2 hari kerja.
              </div>
            )}
            {serverError && (
              <div className="mb-10 bg-red-50 border border-red-100 text-red-700 text-[11px] font-bold uppercase tracking-wider px-8 py-6 rounded-2xl">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Nama Lengkap <span className="text-brand-gold">*</span>
                  </label>
                  <input type="text" {...register('nama')} className={inputClass} placeholder="Masukkan nama Anda" />
                  {errors.nama && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.nama.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Alamat Email <span className="text-brand-gold">*</span>
                  </label>
                  <input type="email" {...register('email')} className={inputClass} placeholder="email@institusi.com" />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Nomor Telepon
                  </label>
                  <input type="tel" {...register('telepon')} className={inputClass} placeholder="08xxxxxxxxxx (opsional)" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Unit Tujuan <span className="text-brand-gold">*</span>
                  </label>
                  <select {...register('unit')} className={cn(inputClass, 'appearance-none')} defaultValue="">
                    <option value="" disabled>
                      Pilih unit kerja tujuan
                    </option>
                    {unitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.unit && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.unit.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Subjek Pesan <span className="text-brand-gold">*</span>
                </label>
                <input type="text" {...register('subjek')} className={inputClass} placeholder="Apa yang bisa kami bantu?" />
                {errors.subjek && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.subjek.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Detail Pesan <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  {...register('pesan')}
                  className={inputClass}
                  style={{ minHeight: '160px' }}
                  placeholder="Tuliskan detail pertanyaan atau aspirasi Anda di sini..."
                />
                {errors.pesan && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.pesan.message}</p>
                )}
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('privasi')}
                    className="mt-1 w-5 h-5 rounded border-gray-200 text-brand-navy focus:ring-brand-navy transition-all"
                  />
                  <span className="text-xs text-gray-500 font-medium leading-relaxed">
                    Saya menyetujui{' '}
                    <Link href="/kebijakan-privasi" className="text-brand-navy font-bold hover:text-brand-gold underline transition-colors">
                      Kebijakan Privasi
                    </Link>{' '}
                    STTPU Jakarta dan bersedia dihubungi melalui data yang saya lampirkan.
                  </span>
                </label>
                {errors.privasi && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-3">{errors.privasi.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-brand-navy text-white text-[11px] font-bold uppercase tracking-wider px-12 py-5 rounded-xl hover:bg-brand-navy/90 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-brand-navy/10 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 lg:p-10 shadow-sm">
              <h3 className="font-bold text-brand-navy text-sm mb-8 uppercase tracking-wider">Saluran Langsung</h3>
              <div className="space-y-4">
                {otherChannels.map((ch) => (
                  (() => {
                    const style = channelStyles[ch.icon] || channelStyles.map
                    return (
                      <a
                        key={ch.label}
                        href={ch.href}
                        target={ch.external ? '_blank' : undefined}
                        rel={ch.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-2xl hover:border-brand-gold hover:shadow-premium-hover hover:-translate-x-1.5 transition-all duration-300 group"
                      >
                        <div className={`${style.bg} ${style.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {style.icon}
                        </div>
                        <div>
                          <p className="font-bold text-brand-navy text-[11px] uppercase tracking-wider">{ch.label}</p>
                          <p className="text-gray-400 font-bold text-xs mt-1">{ch.desc}</p>
                        </div>
                      </a>
                    )
                  })()
                ))}
              </div>
            </div>

            <div className="bg-brand-navy text-white rounded-2xl p-8 lg:p-10 shadow-2xl shadow-brand-navy/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="font-bold text-brand-gold text-[11px] mb-6 uppercase tracking-wider">Pusat Informasi</h3>
              <ul className="space-y-5">
                {faqLinks.map((faq) => (
                  <li key={faq.label}>
                    <Link
                      href={faq.href}
                      className="text-xs font-medium text-white/60 hover:text-brand-gold leading-relaxed flex gap-3 group transition-colors"
                    >
                      <span className="text-brand-gold font-bold group-hover:translate-x-1 transition-transform">›</span>
                      {faq.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
