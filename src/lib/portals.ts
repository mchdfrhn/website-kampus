export const portals = {
  siakad: {
    mahasiswa: process.env.NEXT_PUBLIC_PORTAL_SIAKAD_MHS ?? '#',
    orangTua:  process.env.NEXT_PUBLIC_PORTAL_SIAKAD_ORTU ?? '#',
    dosen:     process.env.NEXT_PUBLIC_PORTAL_SIAKAD_DOSEN ?? '#',
  },
  lms: {
    mahasiswa: process.env.NEXT_PUBLIC_PORTAL_LMS_MHS ?? '#',
    dosen:     process.env.NEXT_PUBLIC_PORTAL_LMS_DOSEN ?? '#',
  },
  pmb:     process.env.NEXT_PUBLIC_PORTAL_PMB ?? '#',
  sipekad: process.env.NEXT_PUBLIC_PORTAL_SIPEKAD ?? '#',
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}`,
} as const;
