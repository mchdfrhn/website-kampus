import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

process.env.BUILD_SKIP_DB = process.env.BUILD_SKIP_DB || '1'
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'dbdiagram-generator'

const rootDir = process.cwd()
const outputFile = path.join(rootDir, 'dbdiagram.dbml')
const configModule = await import(pathToFileURL(path.join(rootDir, 'payload.config.ts')).href)
const config = await Promise.resolve(configModule.default)

const tables = new Map()
const refs = []
const enums = new Map()
const slugToTable = new Map()

const snakeCase = (value) =>
  String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()

const safeEnumValue = (value) => {
  const raw = String(value).replace(/'/g, '')
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(raw) ? raw : `"${raw}"`
}

const dbmlType = (field, enumName) => {
  if (enumName) return enumName

  switch (field.type) {
    case 'checkbox':
      return 'boolean'
    case 'date':
      return 'timestamptz'
    case 'email':
    case 'text':
    case 'select':
    case 'upload':
    case 'relationship':
      return 'varchar'
    case 'number':
      return 'numeric'
    case 'textarea':
      return 'text'
    case 'json':
    case 'richText':
      return 'jsonb'
    default:
      return 'jsonb'
  }
}

const addEnum = (tableName, columnName, field) => {
  if (field.type !== 'select' || !Array.isArray(field.options)) return null

  const values = field.options
    .map((option) => (typeof option === 'string' ? option : option.value))
    .filter(Boolean)

  if (!values.length) return null

  const enumName = `enum_${tableName}_${columnName}`
  enums.set(enumName, values)
  return enumName
}

const addColumn = (table, name, type, attrs = []) => {
  if (!name) return
  if (table.columns.some((column) => column.name === name)) return
  table.columns.push({ name, type, attrs })
}

const addTimestampColumns = (table) => {
  addColumn(table, 'updated_at', 'timestamptz', ['not null'])
  addColumn(table, 'created_at', 'timestamptz', ['not null'])
}

const ensureTable = (name, note) => {
  if (!tables.has(name)) {
    tables.set(name, {
      name,
      note,
      columns: [],
      indexes: [],
    })
  }

  return tables.get(name)
}

const resolveRelationTable = (relationTo) => {
  if (Array.isArray(relationTo)) return null
  return slugToTable.get(relationTo) || snakeCase(relationTo)
}

const walkContainer = (fields, table, context) => {
  for (const field of fields || []) {
    if (!field || !field.type) continue

    if (field.type === 'tabs') {
      for (const tab of field.tabs || []) walkContainer(tab.fields, table, context)
      continue
    }

    if (field.type === 'row' || field.type === 'collapsible') {
      walkContainer(field.fields, table, context)
      continue
    }

    if (field.type === 'group') {
      walkContainer(field.fields, table, {
        ...context,
        prefix: [...context.prefix, snakeCase(field.name)],
      })
      continue
    }

    if (field.type === 'array') {
      addArrayTable(field, context)
      continue
    }

    if (!field.name) continue

    const columnBase = [...context.prefix, snakeCase(field.name)].filter(Boolean).join('_')

    if (field.type === 'upload' || field.type === 'relationship') {
      if (field.hasMany) {
        addHasManyRelation(field, context, columnBase)
      } else {
        const columnName = `${columnBase}_id`
        addColumn(table, columnName, 'integer', field.required ? ['not null'] : [])
        const toTable = resolveRelationTable(field.relationTo)
        if (toTable) refs.push({ from: `${table.name}.${columnName}`, to: `${toTable}.id` })
      }
      continue
    }

    const enumName = addEnum(table.name, columnBase, field)
    addColumn(table, columnBase, dbmlType(field, enumName), field.required ? ['not null'] : [])

    if (field.unique) table.indexes.push({ columns: [columnBase], unique: true })
  }
}

const addArrayTable = (field, context) => {
  const tableName = [...context.tablePath, snakeCase(field.name)].join('_')
  const table = ensureTable(tableName, `Array field: ${context.parentTable}.${field.name}`)
  const parentIdType = context.parentIsArray ? 'varchar' : 'integer'

  addColumn(table, '_order', 'integer', ['not null'])
  addColumn(table, '_parent_id', parentIdType, ['not null'])
  addColumn(table, 'id', 'varchar', ['pk', 'not null'])
  table.indexes.push({ columns: ['_order'] })
  table.indexes.push({ columns: ['_parent_id'] })
  refs.push({ from: `${tableName}._parent_id`, to: `${context.parentTable}.id` })

  walkContainer(field.fields, table, {
    parentTable: tableName,
    parentIsArray: true,
    tablePath: [...context.tablePath, snakeCase(field.name)],
    prefix: [],
  })
}

const addHasManyRelation = (field, context, columnBase) => {
  const relTableName = `${context.parentTable}_rels`
  const table = ensureTable(relTableName, `Payload relationship table for ${context.parentTable}`)
  const relationColumn = `${columnBase}_id`

  if (!table.columns.some((column) => column.name === 'id')) {
    addColumn(table, 'id', 'serial', ['pk', 'not null'])
    addColumn(table, 'order', 'integer')
    addColumn(table, 'parent_id', 'integer', ['not null'])
    addColumn(table, 'path', 'varchar', ['not null'])
    table.indexes.push({ columns: ['parent_id'] })
    refs.push({ from: `${relTableName}.parent_id`, to: `${context.parentTable}.id` })
  }

  if (!table.columns.some((column) => column.name === relationColumn)) {
    addColumn(table, relationColumn, 'integer')
    const toTable = resolveRelationTable(field.relationTo)
    if (toTable) refs.push({ from: `${relTableName}.${relationColumn}`, to: `${toTable}.id` })
  }
}

for (const collection of config.collections || []) {
  slugToTable.set(collection.slug, snakeCase(collection.slug))
}

for (const global of config.globals || []) {
  slugToTable.set(global.slug, snakeCase(global.slug))
}

for (const collection of config.collections || []) {
  const tableName = snakeCase(collection.slug)
  const table = ensureTable(tableName, `Payload collection: ${collection.slug}`)
  addColumn(table, 'id', 'serial', ['pk', 'not null'])
  walkContainer(collection.fields, table, {
    parentTable: tableName,
    parentIsArray: false,
    tablePath: [tableName],
    prefix: [],
  })
  addTimestampColumns(table)
}

for (const global of config.globals || []) {
  const tableName = snakeCase(global.slug)
  const table = ensureTable(tableName, `Payload global: ${global.slug}`)
  addColumn(table, 'id', 'serial', ['pk', 'not null'])
  walkContainer(global.fields, table, {
    parentTable: tableName,
    parentIsArray: false,
    tablePath: [tableName],
    prefix: [],
  })
  addTimestampColumns(table)
}

const addPayloadInternalTables = () => {
  const kv = ensureTable('payload_kv', 'Payload internal key-value storage')
  addColumn(kv, 'id', 'serial', ['pk', 'not null'])
  addColumn(kv, 'key', 'varchar', ['not null'])
  addColumn(kv, 'data', 'jsonb', ['not null'])
  kv.indexes.push({ columns: ['key'], unique: true })

  const migrations = ensureTable('payload_migrations', 'Payload internal migration history')
  addColumn(migrations, 'id', 'serial', ['pk', 'not null'])
  addColumn(migrations, 'name', 'varchar')
  addColumn(migrations, 'batch', 'numeric')
  addTimestampColumns(migrations)

  const lockedDocuments = ensureTable('payload_locked_documents', 'Payload internal document locks')
  addColumn(lockedDocuments, 'id', 'serial', ['pk', 'not null'])
  addColumn(lockedDocuments, 'global_slug', 'varchar')
  addTimestampColumns(lockedDocuments)

  const lockedRels = ensureTable('payload_locked_documents_rels', 'Payload internal lock relationships')
  addColumn(lockedRels, 'id', 'serial', ['pk', 'not null'])
  addColumn(lockedRels, 'order', 'integer')
  addColumn(lockedRels, 'parent_id', 'integer', ['not null'])
  addColumn(lockedRels, 'path', 'varchar', ['not null'])
  lockedRels.indexes.push({ columns: ['parent_id'] })
  refs.push({ from: 'payload_locked_documents_rels.parent_id', to: 'payload_locked_documents.id' })

  for (const collection of config.collections || []) {
    const tableName = snakeCase(collection.slug)
    const columnName = `${tableName}_id`
    addColumn(lockedRels, columnName, 'integer')
    refs.push({ from: `payload_locked_documents_rels.${columnName}`, to: `${tableName}.id` })
  }

  const preferences = ensureTable('payload_preferences', 'Payload internal admin preferences')
  addColumn(preferences, 'id', 'serial', ['pk', 'not null'])
  addColumn(preferences, 'key', 'varchar')
  addColumn(preferences, 'value', 'jsonb')
  addTimestampColumns(preferences)

  const preferenceRels = ensureTable('payload_preferences_rels', 'Payload internal admin preference relationships')
  addColumn(preferenceRels, 'id', 'serial', ['pk', 'not null'])
  addColumn(preferenceRels, 'order', 'integer')
  addColumn(preferenceRels, 'parent_id', 'integer', ['not null'])
  addColumn(preferenceRels, 'path', 'varchar', ['not null'])
  addColumn(preferenceRels, 'users_id', 'integer')
  preferenceRels.indexes.push({ columns: ['parent_id'] })
  refs.push({ from: 'payload_preferences_rels.parent_id', to: 'payload_preferences.id' })
  refs.push({ from: 'payload_preferences_rels.users_id', to: 'users.id' })
}

addPayloadInternalTables()

const renderAttrs = (attrs) => (attrs.length ? ` [${attrs.join(', ')}]` : '')

const lines = [
  '// DBML untuk dbdiagram.io',
  '// Generated from Payload collection/global config.',
  '// Jalankan ulang: npm run dbdiagram',
  '',
]

for (const [enumName, values] of [...enums.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  lines.push(`Enum ${enumName} {`)
  for (const value of values) lines.push(`  ${safeEnumValue(value)}`)
  lines.push('}', '')
}

for (const table of [...tables.values()].sort((a, b) => a.name.localeCompare(b.name))) {
  lines.push(`Table ${table.name} {`)
  if (table.note) lines.push(`  Note: '${table.note.replace(/'/g, "\\'")}'`)
  for (const column of table.columns) {
    lines.push(`  ${column.name} ${column.type}${renderAttrs(column.attrs)}`)
  }
  if (table.indexes.length) {
    lines.push('', '  indexes {')
    for (const index of table.indexes) {
      const attrs = index.unique ? ' [unique]' : ''
      lines.push(`    (${index.columns.join(', ')})${attrs}`)
    }
    lines.push('  }')
  }
  lines.push('}', '')
}

const uniqueRefs = new Map()
for (const ref of refs) uniqueRefs.set(`${ref.from}>${ref.to}`, ref)

for (const ref of [...uniqueRefs.values()].sort((a, b) => a.from.localeCompare(b.from))) {
  lines.push(`Ref: ${ref.from} > ${ref.to}`)
}

fs.writeFileSync(outputFile, `${lines.join('\n')}\n`)
console.log(`DBML written to ${path.relative(rootDir, outputFile)}`)
console.log(`${tables.size} tables, ${uniqueRefs.size} relations, ${enums.size} enums`)
