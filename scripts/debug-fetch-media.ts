import 'dotenv/config';

async function main() {
  const url = 'http://localhost:3000/api/media/file/thumbnail_sertijab_ypp_2026-small.jpg';
  console.log(`Fetching: ${url}`);
  try {
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    console.log(`Headers:`, Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    console.log(`Body (first 500 chars):`, text.slice(0, 500));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
