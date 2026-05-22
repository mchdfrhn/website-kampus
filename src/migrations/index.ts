import * as migration_20260419_145313 from './20260419_145313';
import * as migration_20260420_085628 from './20260420_085628';
import * as migration_20260420_101626_add_logo_to_settings from './20260420_101626_add_logo_to_settings';
import * as migration_20260423_111500_add_urutan_to_program_studi from './20260423_111500_add_urutan_to_program_studi';
import * as migration_20260423_113500_add_accent_color_to_program_studi from './20260423_113500_add_accent_color_to_program_studi';
import * as migration_20260423_154500_add_managed_categories from './20260423_154500_add_managed_categories';
import * as migration_20260507_000000_add_portal_technical_support from './20260507_000000_add_portal_technical_support';
import * as migration_20260507_010000_add_mitra_home_section from './20260507_010000_add_mitra_home_section';
import * as migration_20260507_020000_add_portal_categories from './20260507_020000_add_portal_categories';
import * as migration_20260507_030000_add_why_sttpu_home_section from './20260507_030000_add_why_sttpu_home_section';
import * as migration_20260507_031000_add_why_item_backgrounds from './20260507_031000_add_why_item_backgrounds';
import * as migration_20260521_000000_add_home_carousel_order from './20260521_000000_add_home_carousel_order';
import * as migration_20260522_000000_add_lpmi_documents from './20260522_000000_add_lpmi_documents';

export const migrations = [
  {
    up: migration_20260419_145313.up,
    down: migration_20260419_145313.down,
    name: '20260419_145313',
  },
  {
    up: migration_20260420_085628.up,
    down: migration_20260420_085628.down,
    name: '20260420_085628',
  },
  {
    up: migration_20260420_101626_add_logo_to_settings.up,
    down: migration_20260420_101626_add_logo_to_settings.down,
    name: '20260420_101626_add_logo_to_settings'
  },
  {
    up: migration_20260423_111500_add_urutan_to_program_studi.up,
    down: migration_20260423_111500_add_urutan_to_program_studi.down,
    name: '20260423_111500_add_urutan_to_program_studi',
  },
  {
    up: migration_20260423_113500_add_accent_color_to_program_studi.up,
    down: migration_20260423_113500_add_accent_color_to_program_studi.down,
    name: '20260423_113500_add_accent_color_to_program_studi',
  },
  {
    up: migration_20260423_154500_add_managed_categories.up,
    down: migration_20260423_154500_add_managed_categories.down,
    name: '20260423_154500_add_managed_categories',
  },
  {
    up: migration_20260507_000000_add_portal_technical_support.up,
    down: migration_20260507_000000_add_portal_technical_support.down,
    name: '20260507_000000_add_portal_technical_support',
  },
  {
    up: migration_20260507_010000_add_mitra_home_section.up,
    down: migration_20260507_010000_add_mitra_home_section.down,
    name: '20260507_010000_add_mitra_home_section',
  },
  {
    up: migration_20260507_020000_add_portal_categories.up,
    down: migration_20260507_020000_add_portal_categories.down,
    name: '20260507_020000_add_portal_categories',
  },
  {
    up: migration_20260507_030000_add_why_sttpu_home_section.up,
    down: migration_20260507_030000_add_why_sttpu_home_section.down,
    name: '20260507_030000_add_why_sttpu_home_section',
  },
  {
    up: migration_20260507_031000_add_why_item_backgrounds.up,
    down: migration_20260507_031000_add_why_item_backgrounds.down,
    name: '20260507_031000_add_why_item_backgrounds',
  },
  {
    up: migration_20260521_000000_add_home_carousel_order.up,
    down: migration_20260521_000000_add_home_carousel_order.down,
    name: '20260521_000000_add_home_carousel_order',
  },
  {
    up: migration_20260522_000000_add_lpmi_documents.up,
    down: migration_20260522_000000_add_lpmi_documents.down,
    name: '20260522_000000_add_lpmi_documents',
  },
];
