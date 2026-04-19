import { assertType, assertSlug, readEntry } from '../../../utils/markdown'

export default defineEventHandler((event) => {
  const type = getRouterParam(event, 'type')!
  const slug = getRouterParam(event, 'slug')!
  assertType(type)
  assertSlug(slug)

  const entry = readEntry(type, slug)
  if (!entry) throw createError({ statusCode: 404, message: 'Entry not found' })
  return { slug, ...entry }
})
