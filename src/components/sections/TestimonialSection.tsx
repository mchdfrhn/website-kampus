const testimonials = [
  {
    teks: 'Kuliah di STTPU membuka banyak peluang karir di bidang konstruksi. Ilmu yang diajarkan sangat aplikatif dan langsung relevan dengan dunia kerja. Sekarang saya bekerja di salah satu BUMN konstruksi terbesar di Indonesia.',
    nama: 'Ahmad Fauzi',
    prodi: 'D4 Teknik Konstruksi Gedung, Angkatan 2018',
  },
  {
    teks: 'Program Teknologi Informasi di STTPU benar-benar mempersiapkan saya untuk industri digital. Dosen-dosennya berpengalaman dan fasilitas lab-nya lengkap. Saya berhasil meraih beasiswa dan kini bekerja di perusahaan startup teknologi.',
    nama: 'Sari Dewi Lestari',
    prodi: 'D4 Teknologi Informasi, Angkatan 2019',
  },
  {
    teks: 'Sebagai lulusan Teknik Arsitektur STTPU, saya bangga dengan kualitas pendidikan yang diterima. Kurikulum yang terus diperbarui membuat kami siap bersaing di tingkat nasional maupun regional ASEAN.',
    nama: 'Budi Santoso',
    prodi: 'D4 Teknik Arsitektur, Angkatan 2017',
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#1E3A5F] font-extrabold text-3xl">Kata Alumni</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mx-auto mt-3" />
          <p className="text-gray-500 mt-4 text-base">
            Pengalaman nyata dari alumni yang telah membuktikan kualitas STTPU.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.nama} className="border border-gray-200 rounded-lg p-6 relative">
              <span className="text-6xl text-gray-200 absolute top-2 left-4 leading-none font-serif select-none">
                &ldquo;
              </span>
              <p className="pt-8 text-sm text-gray-700 leading-relaxed italic mb-5">{item.teks}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs font-bold">
                    {item.nama
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#1E3A5F] text-sm">{item.nama}</p>
                  <p className="text-gray-500 text-xs">{item.prodi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
