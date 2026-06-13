import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export async function getPayloadClient(): Promise<Payload> {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: configPromise })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}

