import { getPayload } from 'payload'
import config from '../payload.config'

async function checkVideoLink() {
  try {
    const payload = await getPayload({ config })
    const halamanUtama = await payload.findGlobal({
      slug: 'halaman-utama',
      depth: 1,
    })
    
    console.log('--- DATA VIDEO SAAT INI ---')
    console.log('Judul:', halamanUtama.videoJudul)
    console.log('URL Video:', halamanUtama.videoUrl)
    console.log('Thumbnail:', halamanUtama.videoThumbnail ? 'ADA' : 'TIDAK ADA')
    console.log('---------------------------')
  } catch (err) {
    console.error('Error fetching data:', err)
  }
  
  process.exit(0)
}

checkVideoLink()
