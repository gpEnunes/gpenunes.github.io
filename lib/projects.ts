import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import type { Project } from '@/lib/types'

function asString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Project frontmatter is missing ${field}`)
  }
  return value.trim()
}

function asStringList(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string')) {
    throw new Error(`Project frontmatter is missing ${field}`)
  }
  return value
}

export function getProjects(): Project[] {
  const dir = join(process.cwd(), 'content', 'projects')
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '')
      const raw = readFileSync(join(dir, name), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: asString(data.title, `${slug} title`),
        url: asString(data.url, `${slug} url`),
        accent: asString(data.accent, `${slug} accent`),
        favicon: asString(data.favicon, `${slug} favicon`),
        order: typeof data.order === 'number' ? data.order : 0,
        type: asString(data.type, `${slug} type`),
        typePt: asString(data.typePt, `${slug} typePt`),
        tags: asStringList(data.tags, `${slug} tags`),
        description: asString(data.description, `${slug} description`),
        descriptionPt: asString(data.descriptionPt, `${slug} descriptionPt`),
        highlights: asStringList(data.highlights, `${slug} highlights`),
        highlightsPt: asStringList(data.highlightsPt, `${slug} highlightsPt`),
      }
    })
    .sort((a, b) => a.order - b.order)
}
