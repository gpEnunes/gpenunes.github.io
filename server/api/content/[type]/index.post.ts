import { assertType, slugify, writeEntry, listEntries } from '~/server/utils/markdown'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')!
  assertType(type)

  const { meta, body } = await readBody(event)
  if (!meta?.title) throw createError({ statusCode: 400, message: 'title is required' })

  let slug = slugify(meta.title)
  const base = slug
  let n = 1
  while (existsSync(join(process.cwd(), 'content', type, `${slug}.md`))) {
    slug = `${base}-${n++}`
  }

  writeEntry(type, slug, meta, body ?? '')
  return { slug }
})
