import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const performRevalidate = (paths: string[], doc: any) => {
  paths.forEach((path) => {
    // Jika path mengandung [slug], ganti dengan doc.slug
    const finalPath = path.includes('[slug]') && doc.slug 
      ? path.replace('[slug]', doc.slug) 
      : path
    
    try {
      revalidatePath(finalPath)
      console.log(`[Revalidate] Success for path: ${finalPath}`)
    } catch (err) {
      // Silence errors when running from standalone scripts (seed)
    }
  })
  
  // Selalu revalidate homepage karena biasanya ada konten global/terbaru di sana
  try {
    revalidatePath('/')
  } catch (err) {
    // Ignore
  }
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

