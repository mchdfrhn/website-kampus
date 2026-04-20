import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCollection = (paths: string[]): CollectionAfterChangeHook => {
  return ({ doc }) => {
    paths.forEach((path) => {
      // Jika path mengandung [slug], ganti dengan doc.slug
      const finalPath = path.includes('[slug]') && doc.slug 
        ? path.replace('[slug]', doc.slug) 
        : path
      
      try {
        revalidatePath(finalPath)
        console.log(`[Revalidate] Success for path: ${finalPath}`)
      } catch (err) {
        console.error(`[Revalidate] Failed for path: ${finalPath}`, err)
      }
    })
    
    // Selalu revalidate homepage karena biasanya ada konten global/terbaru di sana
    try {
      revalidatePath('/')
    } catch (err) {
      // Ignore
    }

    return doc
  }
}
