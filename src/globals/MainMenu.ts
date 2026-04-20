import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Menu Navigasi',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/'])],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Item Navigasi',
      fields: [
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'href', type: 'text', label: 'Link (URL)', required: true },
        {
          name: 'children',
          type: 'array',
          label: 'Sub-menu (Dropdown)',
          fields: [
            { name: 'label', type: 'text', label: 'Label', required: true },
            { name: 'href', type: 'text', label: 'Link (URL)', required: true },
          ],
        },
      ],
    },
  ],
}
