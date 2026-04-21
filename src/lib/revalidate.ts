import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

export const publicPagePaths = [
  '/',
  '/tentang',
  '/tentang/sejarah',
  '/tentang/visi-misi',
  '/tentang/pimpinan',
  '/tentang/akreditasi',
  '/tentang/struktur-organisasi',
  '/tentang/fasilitas',
  '/akademik/program-studi',
  '/akademik/dosen',
  '/akademik/kalender',
  '/akademik/beasiswa',
  '/kemahasiswaan',
  '/kemahasiswaan/organisasi',
  '/kemahasiswaan/ukm',
  '/kemahasiswaan/prestasi',
  '/kemahasiswaan/layanan',
  '/kemahasiswaan/mahasiswa-baru',
  '/penelitian',
  '/penelitian/unit',
  '/penelitian/publikasi',
  '/penelitian/hibah',
  '/berita',
  '/galeri',
  '/kontak',
  '/portal',
] as const

const performRevalidate = (paths: string[], doc: Record<string, unknown>) => {
  paths.forEach((path) => {
    // Jika path mengandung [slug], ganti dengan doc.slug
    const finalPath = path.includes('[slug]') && typeof doc.slug === 'string'
      ? path.replace('[slug]', doc.slug) 
      : path
    
    // Next.js 15: Revalidate the specific path and also the layout to be safe
    try {
      revalidatePath(finalPath, 'page')
      // Also revalidate the main layout to ensure globals like Navbar/Footer are updated
      revalidatePath('/', 'layout')
      console.log(`[Revalidate] Success for path: ${finalPath} and layout /`)
    } catch (error) {
      console.warn(`[Revalidate] Failed for path: ${finalPath}`, error)
    }
  })
}

export const revalidateCollection = (paths: string[]): CollectionAfterChangeHook => {
  return ({ doc }) => {
    performRevalidate(paths, doc)
    return doc
  }
}

export const revalidateDelete = (paths: string[]): CollectionAfterDeleteHook => {
  return ({ doc }) => {
    performRevalidate(paths, doc)
    return doc
  }
}

export const revalidateGlobal = (paths: string[]): GlobalAfterChangeHook => {
  return ({ doc }) => {
    performRevalidate(paths, doc)
    return doc
  }
}

