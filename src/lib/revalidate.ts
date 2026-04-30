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
  '/tentang/kerjasama',
  '/akademik',
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
  '/berita/[slug]',
  '/galeri',
  '/galeri/[slug]',
  '/kontak',
  '/portal',
  '/akademik/program-studi/[slug]',
  '/akademik/dosen/[slug]',
  '/feed.xml',
  '/sitemap.xml',
] as const

export const tentangPagePaths = [
  '/tentang',
  '/tentang/[slug]',
  '/sitemap.xml',
] as const

export const kemahasiswaanPagePaths = [
  '/kemahasiswaan',
  '/kemahasiswaan/[slug]',
  '/sitemap.xml',
] as const

export const penelitianPagePaths = [
  '/penelitian',
  '/penelitian/[slug]',
  '/sitemap.xml',
] as const

export const akademikPagePaths = [
  '/akademik',
  '/akademik/program-studi',
  '/akademik/program-studi/[slug]',
  '/akademik/dosen',
  '/akademik/dosen/[slug]',
  '/akademik/kalender',
  '/akademik/beasiswa',
] as const

const collectionRoutePrefixes: Record<string, string> = {
  berita: '/berita',
  dosen: '/akademik/dosen',
  galeri: '/galeri',
  'program-studi': '/akademik/program-studi',
}

export const revalidatePublicPaths = (
  paths: string[],
  options: {
    doc?: Record<string, unknown>
    sourceCollection?: string
    previousDoc?: Record<string, unknown>
  } = {},
) => {
  const { doc = {}, sourceCollection, previousDoc } = options
  const pathsToRevalidate = new Set<string>()
  const routePrefix = sourceCollection ? collectionRoutePrefixes[sourceCollection] : undefined

  paths.forEach((path) => {
    pathsToRevalidate.add(path)

    if (
      routePrefix &&
      path.startsWith(routePrefix) &&
      path.includes('[slug]') &&
      typeof doc.slug === 'string'
    ) {
      pathsToRevalidate.add(path.replace('[slug]', doc.slug))
    }

    if (
      routePrefix &&
      path.startsWith(routePrefix) &&
      path.includes('[slug]') &&
      typeof previousDoc?.slug === 'string' &&
      previousDoc.slug !== doc.slug
    ) {
      pathsToRevalidate.add(path.replace('[slug]', previousDoc.slug))
    }
  })

  pathsToRevalidate.forEach((path) => {
    try {
      revalidatePath(path, 'page')
      console.log(`[Revalidate] Success for path: ${path}`)
    } catch (error) {
      console.warn(`[Revalidate] Failed for path: ${path}`, error)
    }
  })

  try {
    revalidatePath('/', 'layout')
    console.log('[Revalidate] Success for frontend layout')
  } catch (error) {
    console.warn('[Revalidate] Failed for frontend layout', error)
  }
}

export const revalidateCollection = (paths: string[]): CollectionAfterChangeHook => {
  return ({ doc, collection, previousDoc }) => {
    revalidatePublicPaths(paths, {
      doc,
      sourceCollection: collection.slug,
      previousDoc,
    })
    return doc
  }
}

export const revalidateDelete = (paths: string[]): CollectionAfterDeleteHook => {
  return ({ doc, collection }) => {
    revalidatePublicPaths(paths, {
      doc,
      sourceCollection: collection.slug,
    })
    return doc
  }
}

export const revalidateGlobal = (paths: string[]): GlobalAfterChangeHook => {
  return ({ doc }) => {
    revalidatePublicPaths(paths, { doc })
    return doc
  }
}
