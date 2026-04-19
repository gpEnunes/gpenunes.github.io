import { assertType, assertSlug, deleteEntry } from '~/server/utils/markdown'

export default defineEventHandler((event) => {
  const type = getRouterParam(event, 'type')!
  const slug = getRouterParam(event, 'slug')!
  assertType(type)
  assertSlug(slug)

  deleteEntry(type, slug)
  return { ok: true }
})
