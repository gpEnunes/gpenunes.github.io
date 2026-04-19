import { assertType, listEntries } from '~/server/utils/markdown'

export default defineEventHandler((event) => {
  const type = getRouterParam(event, 'type')!
  assertType(type)
  return listEntries(type)
})
