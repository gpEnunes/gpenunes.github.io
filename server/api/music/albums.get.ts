import { readFileSync } from 'fs'
import { join } from 'path'

const FILE = join(process.cwd(), 'data', 'music-albums.json')

export default defineEventHandler(() => {
  try {
    return JSON.parse(readFileSync(FILE, 'utf-8'))
  } catch {
    return { shelves: [] }
  }
})
