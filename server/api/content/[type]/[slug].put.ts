import { assertType, assertSlug, writeEntry } from '../../../utils/markdown'

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')!
  const slug = getRouterParam(event, 'slug')!
  assertType(type)
  assertSlug(slug)

  const { meta, body } = await readBody(event)
  if (!meta?.title) throw createError({ statusCode: 400, message: 'title is required' })

  writeEntry(type, slug, meta, body ?? '')
  return { ok: true }
})
