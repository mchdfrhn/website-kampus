import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { defaultSections } from '../src/lib/akademik-navigation';
import {
  resolveKemahasiswaanSections,
  resolvePenelitianSections,
  resolveTentangSections,
  type PayloadSectionMeta,
} from '../src/lib/frontend-section-routing';

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

async function main() {
  const payload = await getPayload({ config: configPromise });

  const [dosen, programStudi, berita, tentangGlobal, kemahasiswaanGlobal, penelitianGlobal, akademikGlobal] = await Promise.all([
    payload.find({
      collection: 'dosen',
      limit: 500,
      depth: 0,
      select: { id: true, nama: true, slug: true },
    }),
    payload.find({
      collection: 'program-studi',
      limit: 200,
      depth: 0,
      select: { id: true, nama: true, slug: true },
    }),
    payload.find({
      collection: 'berita',
      limit: 1000,
      depth: 0,
      select: { id: true, judul: true, slug: true, status: true },
    }),
    payload.findGlobal({ slug: 'tentang-kami' }),
    payload.findGlobal({ slug: 'kemahasiswaan-page' as never }),
    payload.findGlobal({ slug: 'penelitian-page' as never }),
    payload.findGlobal({ slug: 'akademik-page' as never }),
  ]);

  const dosenMissingSlug = dosen.docs.filter((doc) => !doc.slug).map((doc) => doc.nama || `ID ${doc.id}`);
  const programStudiMissingSlug = programStudi.docs.filter((doc) => !doc.slug).map((doc) => doc.nama || `ID ${doc.id}`);
  const beritaMissingSlug = berita.docs.filter((doc) => !doc.slug).map((doc) => doc.judul || `ID ${doc.id}`);

  const tentangSections = resolveTentangSections(
    ((tentangGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
  );
  const kemahasiswaanSections = resolveKemahasiswaanSections(
    ((kemahasiswaanGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
  );
  const penelitianSections = resolvePenelitianSections(
    ((penelitianGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
  );

  const akademikSections = (((akademikGlobal as { sections?: { slug?: string | null }[] })?.sections) || []).map((section) => section.slug || '');
  const invalidAkademikSections = akademikSections.filter(
    (slug) => slug && !defaultSections.some((section) => section.slug === slug),
  );

  const dynamicRouteSummary = {
    tentang: unique(tentangSections.map((section) => section.slug)),
    kemahasiswaan: unique(kemahasiswaanSections.map((section) => section.slug)),
    penelitian: unique(penelitianSections.map((section) => section.slug)),
    akademik: unique(defaultSections.map((section) => section.slug)),
  };

  console.log('=== SLUG AUDIT REPORT ===');
  console.log('');
  console.log(`Dosen tanpa slug: ${dosenMissingSlug.length}`);
  if (dosenMissingSlug.length > 0) {
    dosenMissingSlug.forEach((name) => console.log(`- ${name}`));
  }
  console.log('');
  console.log(`Program Studi tanpa slug: ${programStudiMissingSlug.length}`);
  if (programStudiMissingSlug.length > 0) {
    programStudiMissingSlug.forEach((name) => console.log(`- ${name}`));
  }
  console.log('');
  console.log(`Berita tanpa slug: ${beritaMissingSlug.length}`);
  if (beritaMissingSlug.length > 0) {
    beritaMissingSlug.forEach((title) => console.log(`- ${title}`));
  }
  console.log('');
  console.log(`Akademik sections invalid: ${invalidAkademikSections.length}`);
  if (invalidAkademikSections.length > 0) {
    invalidAkademikSections.forEach((slug) => console.log(`- ${slug}`));
  }
  console.log('');
  console.log('Resolved dynamic section slugs:');
  console.log(JSON.stringify(dynamicRouteSummary, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
