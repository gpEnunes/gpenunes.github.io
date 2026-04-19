import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), 'content')
const ALLOWED_TYPES = ['cooking', 'writing', 'dev', 'thoughts']

export function assertType(type: string) {
  if (!ALLOWED_TYPES.includes(type)) {
    throw createError({ statusCode: 400, message: 'Invalid content type' })
  }
}

export function assertSlug(slug: string) {
  if (!slug || slug.includes('/') || slug.includes('..') || slug.includes('\0')) {
    throw createError({ statusCode: 400, message: 'Invalid slug' })
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {}
  const lines = yaml.split('\n')
  let currentKey: string | null = null

  for (const line of lines) {
    if (line.trim() === '') continue

    if (line.startsWith('  - ')) {
      if (currentKey && Array.isArray(result[currentKey])) {
        result[currentKey].push(line.slice(4).trim())
      }
      continue
    }

    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue

    const key = line.slice(0, colonIdx).trim()
    const rawValue = line.slice(colonIdx + 1).trim()
    currentKey = key

    if (rawValue === '') {
      result[key] = []
    } else if (rawValue === 'true') {
      result[key] = true
    } else if (rawValue === 'false') {
      result[key] = false
    } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      result[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else if (!isNaN(Number(rawValue)) && rawValue !== '') {
      result[key] = Number(rawValue)
    } else {
      result[key] = rawValue
    }
  }

  return result
}

function serializeYaml(meta: Record<string, any>): string {
  const BLOCK_ARRAYS = ['ingredients', 'instructions']

  return Object.entries(meta)
    .filter(([, v]) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        if (BLOCK_ARRAYS.includes(k)) {
          return `${k}:\n${v.map(item => `  - ${item}`).join('\n')}`
        }
        return `${k}: [${v.join(', ')}]`
      }
      if (typeof v === 'number') return `${k}: ${v}`
      if (typeof v === 'boolean') return `${k}: ${v}`
      if (typeof v === 'object') return null
      return `${k}: ${v}`
    })
    .filter(Boolean)
    .join('\n')
}

export function listEntries(type: string) {
  const dir = join(CONTENT_DIR, type)
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace('.md', '')
      const entry = readEntry(type, slug)
      return entry ? { slug, ...entry } : null
    })
    .filter(Boolean)
    .sort((a: any, b: any) => (b.meta.date ?? '').localeCompare(a.meta.date ?? ''))
}

export function readEntry(type: string, slug: string) {
  const path = join(CONTENT_DIR, type, `${slug}.md`)
  if (!existsSync(path)) return null

  const raw = readFileSync(path, 'utf-8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw.trim() }

  return {
    meta: parseYaml(match[1]),
    body: match[2].trim(),
  }
}

export function writeEntry(type: string, slug: string, meta: Record<string, any>, body: string) {
  const path = join(CONTENT_DIR, type, `${slug}.md`)
  // JSON round-trip strips Vue reactive proxies and any non-serializable values
  const cleanMeta = JSON.parse(JSON.stringify(meta))
  writeFileSync(path, `---\n${serializeYaml(cleanMeta)}\n---\n\n${body}\n`)
}

export function deleteEntry(type: string, slug: string) {
  const path = join(CONTENT_DIR, type, `${slug}.md`)
  if (existsSync(path)) unlinkSync(path)
}
