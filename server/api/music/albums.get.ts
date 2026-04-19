import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async () => {
  if (import.meta.dev) {
    try {
      return JSON.parse(readFileSync(join(process.cwd(), 'data', 'music-albums.json'), 'utf-8'))
    } catch {
      return { shelves: [] }
    }
  }

  const data = await useStorage('assets:data').getItem('music-albums.json')
  return data ?? { shelves: [] }
})
