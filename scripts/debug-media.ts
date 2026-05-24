import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

async function main() {
  const payload = await getPayload({ config: configPromise });

  const media = await payload.find({
    collection: 'media',
    limit: 10,
  });

  console.log('=== MEDIA DATA IN DATABASE ===');
  media.docs.forEach((doc: any, i) => {
    console.log(`\nDoc #${i + 1}: ${doc.filename}`);
    console.log(`- alt: ${doc.alt}`);
    console.log(`- url: ${doc.url}`);
    console.log(`- sizes: ${JSON.stringify(doc.sizes, null, 2)}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
