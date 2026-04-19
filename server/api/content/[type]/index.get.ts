import { assertType, listEntries } from '../../../utils/markdown'

export default defineEventHandler((event) => {
  const type = getRouterParam(event, 'type')!
  assertType(type)
  return listEntries(type)
})
