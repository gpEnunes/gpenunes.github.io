import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import type { WritingPost } from '@/lib/types'

function asString(value: unknown, field: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Writing frontmatter is missing ${field}`)
  }
  return value.trim()
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function readPost(slug: string): WritingPost {
  const raw = readFileSync(join(process.cwd(), 'content', 'blog', `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: asString(data.title, `${slug} title`),
    description: asString(data.description, `${slug} description`),
    date: asString(data.date, `${slug} date`),
    image: asOptionalString(data.image),
    readTime: asOptionalString(data.readTime),
    category: asOptionalString(data.category),
    tags: asTags(data.tags),
    body: content.trim(),
  }
}

export function getWritingPosts(): WritingPost[] {
  const dir = join(process.cwd(), 'content', 'blog')
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readPost(name.replace(/\.md$/, '')))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getWritingPost(slug: string): WritingPost | undefined {
  return getWritingPosts().find((post) => post.slug === slug)
}

export function renderWriting(body: string): string {
  return marked.parse(body, { async: false }) as string
}
