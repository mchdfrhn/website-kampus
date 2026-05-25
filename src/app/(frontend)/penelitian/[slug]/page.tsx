import { redirect } from 'next/navigation';

const redirectMap: Record<string, string> = {
  unit: '/lppm/unit-penelitian',
  publikasi: '/lppm/publikasi',
  hibah: '/lppm/pedoman',
};

export default async function PenelitianSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(redirectMap[slug] || '/lppm/unit-penelitian');
}
