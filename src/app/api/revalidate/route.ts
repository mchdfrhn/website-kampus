import { NextResponse } from 'next/server'
import { publicPagePaths, revalidatePublicPaths } from '@/lib/revalidate'

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ message: 'REVALIDATE_SECRET is not configured' }, { status: 500 })
  }

  const providedSecret = request.headers.get('x-revalidate-secret')

  if (providedSecret !== secret) {
    return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 })
  }

  revalidatePublicPaths([...publicPagePaths])

  return NextResponse.json({
    revalidated: true,
    paths: publicPagePaths.length,
    timestamp: new Date().toISOString(),
  })
}
