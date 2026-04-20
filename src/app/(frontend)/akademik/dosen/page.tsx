import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import DosenGrid from '@/components/sections/akademik/DosenGrid';
import { dosenList, mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';

export const metadata: Metadata = {
  title: 'Dosen | STTPU Jakarta',
  description:
    'Direktori dosen STTPU Jakarta — tenaga pengajar berpengalaman dan berkualifikasi tinggi di bidang teknik sipil, pengairan, lingkungan, dan manajemen konstruksi.',
};

async function fetchDosenList(): Promise<Dosen[]> {
  try {
    const { getPayloadClient } = await import('@/lib/payload');
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dosen',
      depth: 1,
      limit: 200,
    });
    if (result.docs.length === 0) return dosenList;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => mapPayloadToDosen(doc));
  } catch {
    return dosenList;
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
          { label: 'Akademik', href: '#' },
          { label: 'Dosen' },
        ]}
      />
      <DosenGrid dosenList={fetchedDosenList} />
    </>
  );
}
