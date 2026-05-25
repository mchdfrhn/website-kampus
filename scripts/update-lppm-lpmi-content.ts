// @ts-nocheck
/* eslint-disable */
import 'dotenv/config'
import { getPayloadClient } from '../src/lib/payload'

async function main() {
  const payload = await getPayloadClient()

  const lppmSubpages = [
    {
      slug: 'unit-penelitian',
      title: 'Unit Penelitian',
      subtitle: 'Unit riset dan laboratorium aktif yang mendukung kegiatan penelitian terapan sivitas akademika STTPU.',
      breadcrumb: 'Unit Penelitian',
    },
    {
      slug: 'publikasi',
      title: 'Publikasi',
      subtitle: 'Kumpulan karya ilmiah dosen dan mahasiswa STTPU, meliputi jurnal, prosiding, dan buku.',
      breadcrumb: 'Publikasi',
    },
    {
      slug: 'pedoman',
      title: 'Pedoman',
      subtitle: 'Acuan kegiatan penelitian, pengabdian kepada masyarakat, publikasi, dan etika riset LPPM STTPU.',
      breadcrumb: 'Pedoman',
    },
  ]

  const lppm = await payload.findGlobal({ slug: 'lppm-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'lppm-page',
    data: {
      ...lppm,
      sidebarTitle: 'Menu LPPM',
      subpages: lppmSubpages,
      stats: [
        { value: '3', label: 'Ruang Layanan' },
        { value: '120+', label: 'Publikasi' },
        { value: '5+', label: 'Fokus Riset' },
        { value: '18', label: 'Hibah & Program' },
      ],
    },
  })

  const lpmi = await payload.findGlobal({ slug: 'lpmi-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'lpmi-page',
    data: {
      ...lpmi,
      stats: [
        { value: '5', label: 'Ruang Standar' },
        { value: 'PPEPP', label: 'Siklus Mutu' },
        { value: 'AMI', label: 'Audit Internal' },
        { value: 'SPMI', label: 'Sistem Mutu' },
      ],
    },
  })

  const menu = await payload.findGlobal({ slug: 'main-menu', depth: 0 })
  const lppmMenuChildren = [
    { label: 'Unit Penelitian', href: '/lppm/unit-penelitian' },
    { label: 'Publikasi', href: '/lppm/publikasi' },
    { label: 'Pedoman', href: '/lppm/pedoman' },
  ]
  const lpmiMenuChildren = [
    { label: 'Kebijakan', href: '/lpmi/kebijakan' },
    { label: 'Pedoman', href: '/lpmi/pedoman' },
    { label: 'Standar Pendidikan', href: '/lpmi/standar-pendidikan' },
    { label: 'Standar Penelitian', href: '/lpmi/standar-penelitian' },
    { label: 'Standar PKM', href: '/lpmi/standar-pkm' },
  ]
  const navItems = (menu.navItems || []).flatMap((item) => {
    const label = (item.label || '').trim().toLowerCase()
    const href = item.href || ''

    if (label === 'penelitian' || href === '/penelitian') {
      return [
        {
          label: 'LPPM',
          href: '/lppm',
          children: lppmMenuChildren,
        },
        { label: 'LPMI', href: '/lpmi', children: lpmiMenuChildren },
      ]
    }

    if (label === 'lppm' || href.startsWith('/lppm')) {
      return [{ ...item, href: '/lppm', children: lppmMenuChildren }]
    }

    if (label === 'lpmi' || href.startsWith('/lpmi')) {
      return [{ ...item, href: '/lpmi', children: lpmiMenuChildren }]
    }

    return [item]
  })

  const hasLppm = navItems.some((item) => (item.label || '').trim().toLowerCase() === 'lppm')
  const hasLpmi = navItems.some((item) => (item.label || '').trim().toLowerCase() === 'lpmi')

  if (!hasLppm) {
    navItems.splice(4, 0, {
      label: 'LPPM',
      href: '/lppm',
      children: lppmMenuChildren,
    })
  }

  if (!hasLpmi) {
    navItems.splice(5, 0, { label: 'LPMI', href: '/lpmi', children: lpmiMenuChildren })
  }

  await payload.updateGlobal({
    slug: 'main-menu',
    data: { ...menu, navItems },
  })

  const [updatedLppm, updatedLpmi, updatedMenu] = await Promise.all([
    payload.findGlobal({ slug: 'lppm-page', depth: 0 }),
    payload.findGlobal({ slug: 'lpmi-page', depth: 0 }),
    payload.findGlobal({ slug: 'main-menu', depth: 0 }),
  ])

  console.log(
    JSON.stringify(
      {
        lppmStats: updatedLppm.stats?.length || 0,
        lpmiStats: updatedLpmi.stats?.length || 0,
        nav: updatedMenu.navItems?.map((item) => ({ label: item.label, href: item.href })) || [],
      },
      null,
      2,
    ),
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
