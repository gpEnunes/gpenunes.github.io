import { readFileSync } from 'fs'
import { join } from 'path'
import prodData from '../../../data/music-albums.json'

export default defineEventHandler(() => {
  if (import.meta.dev) {
    try {
      return JSON.parse(readFileSync(join(process.cwd(), 'data', 'music-albums.json'), 'utf-8'))
    } catch {
      return { shelves: [] }
    }
  }

  return prodData
})
