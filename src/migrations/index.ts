import * as migration_20260419_145313 from './20260419_145313';
import * as migration_20260420_085628 from './20260420_085628';
import * as migration_20260420_101626_add_logo_to_settings from './20260420_101626_add_logo_to_settings';

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
];
