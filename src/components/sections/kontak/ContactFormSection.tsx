'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const UNIT_OPTIONS = [
  { label: 'Bagian Akademik', value: 'akademik' },
  { label: 'Bagian Keuangan', value: 'keuangan' },
  { label: 'Bagian Kemahasiswaan', value: 'kemahasiswaan' },
  { label: 'Unit IT / Helpdesk', value: 'it' },
  { label: 'Perpustakaan', value: 'perpustakaan' },
  { label: 'Umum / Lainnya', value: 'umum' },
] as const;

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
  'border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent w-full';

const otherChannels = [
  {
    icon: <MessageCircle size={20} />,
    bg: 'bg-green-100',
    color: 'text-green-700',
    label: 'WhatsApp',
    desc: '+62 812-3456-7890',
    href: 'https://wa.me/6281234567890',
    external: true,
  },
  {
    icon: <Mail size={20} />,
    bg: 'bg-blue-100',
    color: 'text-blue-700',
    label: 'Email',
    desc: 'info@sttpu.ac.id',
    href: 'mailto:info@sttpu.ac.id',
    external: false,
  },
  {
    icon: <Phone size={20} />,
    bg: 'bg-orange-100',
    color: 'text-orange-700',
    label: 'Telepon',
    desc: '(021) 555-1234',
    href: 'tel:+62215551234',
    external: false,
  },
  {
    icon: <MapPin size={20} />,
    bg: 'bg-purple-100',
    color: 'text-purple-700',
    label: 'Kunjungi',
    desc: 'Lihat peta & petunjuk arah',
    href: '#peta',
    external: false,
  },
];

const faqLinks = [
  { label: 'Bagaimana cara mendaftar sebagai mahasiswa baru?', href: '/akademik/program-studi' },
  { label: 'Apa saja program studi yang tersedia?', href: '/akademik/program-studi' },
  { label: 'Bagaimana cara mengakses SIAKAD?', href: '/portal' },
  { label: 'Kapan jadwal pembayaran SPP semester ini?', href: '/portal' },
  { label: 'Bagaimana cara mengajukan surat keterangan aktif?', href: '/portal' },
];

export default function ContactFormSection() {
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
    <section className="bg-gray-50 py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[#1E3A5F] font-extrabold text-2xl">Kirim Pesan</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-lg">
                Pesan Anda telah terkirim! Kami akan merespons dalam 1–2 hari kerja.
              </div>
            )}
            {serverError && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input type="text" {...register('nama')} className={inputClass} placeholder="Nama lengkap Anda" />
                {errors.nama && (
                  <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" {...register('email')} className={inputClass} placeholder="email@contoh.com" />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nomor Telepon / HP
                </label>
                <input type="tel" {...register('telepon')} className={inputClass} placeholder="08xxxxxxxxxx (opsional)" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Unit Tujuan <span className="text-red-500">*</span>
                </label>
                <select {...register('unit')} className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Pilih unit yang ingin dihubungi
                  </option>
                  {UNIT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Subjek <span className="text-red-500">*</span>
                </label>
                <input type="text" {...register('subjek')} className={inputClass} placeholder="Subjek pesan Anda" />
                {errors.subjek && (
                  <p className="text-red-500 text-xs mt-1">{errors.subjek.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('pesan')}
                  className={inputClass}
                  style={{ minHeight: '120px' }}
                  placeholder="Tuliskan pesan Anda di sini..."
                />
                {errors.pesan && (
                  <p className="text-red-500 text-xs mt-1">{errors.pesan.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('privasi')}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F]"
                  />
                  <span className="text-sm text-gray-600">
                    Saya menyetujui{' '}
                    <Link href="/kebijakan-privasi" className="text-[#1E3A5F] underline hover:text-[#F5A623]">
                      kebijakan privasi
                    </Link>{' '}
                    STTPU dan bersedia dihubungi terkait pesan ini.
                  </span>
                </label>
                {errors.privasi && (
                  <p className="text-red-500 text-xs mt-1">{errors.privasi.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#1E3A5F] text-white font-bold px-7 py-3 rounded-lg hover:bg-[#162d4a] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-[#1E3A5F] text-sm mb-4">Pilihan Kontak Lainnya</h3>
              <div className="space-y-3">
                {otherChannels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`${ch.bg} ${ch.color} p-2 rounded-lg flex-shrink-0`}>
                      {ch.icon}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${ch.color}`}>{ch.label}</p>
                      <p className="text-gray-500 text-xs">{ch.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-[#1E3A5F] text-sm mb-4">FAQ Cepat</h3>
              <ul className="space-y-2.5">
                {faqLinks.map((faq) => (
                  <li key={faq.label}>
                    <Link
                      href={faq.href}
                      className="text-sm text-gray-600 hover:text-[#1E3A5F] leading-snug flex gap-2 group"
                    >
                      <span className="text-[#F5A623] font-bold flex-shrink-0">›</span>
                      <span className="group-hover:underline">{faq.label}</span>
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
