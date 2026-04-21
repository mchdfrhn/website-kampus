import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import DosenGrid from '@/components/sections/akademik/DosenGrid';
import { mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';
import { getPayloadClient } from '@/lib/payload';

export const metadata: Metadata = {
  title: 'Dosen | STTPU Jakarta',
  description:
    'Direktori dosen STTPU Jakarta — tenaga pengajar berpengalaman dan berkualifikasi tinggi di bidang teknik sipil, pengairan, lingkungan, dan manajemen konstruksi.',
};

async function fetchDosenList(): Promise<Dosen[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dosen',
      depth: 1,
      limit: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => mapPayloadToDosen(doc));
  } catch {
    return [];
  }
}

export default async function DosenPage() {
  const fetchedDosenList = await fetchDosenList();

  return (
    <>
      <AkademikPageHeader
        title="Direktori Dosen"
        subtitle="Tenaga pengajar STTPU Jakarta yang berpengalaman, berkualifikasi tinggi, dan aktif dalam penelitian serta pengabdian masyarakat."
        breadcrumbs={[
          { label: 'Akademik' },
          { label: 'Dosen' },
        ]}
      />
      <DosenGrid dosenList={fetchedDosenList} />
    </>
  );
}
