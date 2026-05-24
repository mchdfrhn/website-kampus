import 'dotenv/config';

async function main() {
  const url = 'http://localhost:3000/api/media/file/thumbnail_sertijab_ypp_2026-small.jpg';
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Search for error messages, component stack, or next-error content
    console.log('HTML Length:', html.length);
    
    // Look for error message strings inside Next.js error script or elements
    const errorMatch = html.match(/("message"\s*:\s*"[^"]+"|message\s*=\s*"[^"]+")/);
    if (errorMatch) {
      console.log('Found error message:', errorMatch[0]);
    }
    
    // Also save HTML to a file so we can inspect it if needed
    const fs = await import('fs/promises');
    await fs.writeFile('scripts/error.html', html);
    console.log('Saved full error HTML to scripts/error.html');
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
