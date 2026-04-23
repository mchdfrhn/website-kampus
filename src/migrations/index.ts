import * as migration_20260419_145313 from './20260419_145313';
import * as migration_20260420_085628 from './20260420_085628';
import * as migration_20260420_101626_add_logo_to_settings from './20260420_101626_add_logo_to_settings';
import * as migration_20260423_111500_add_urutan_to_program_studi from './20260423_111500_add_urutan_to_program_studi';
import * as migration_20260423_113500_add_accent_color_to_program_studi from './20260423_113500_add_accent_color_to_program_studi';

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
];
