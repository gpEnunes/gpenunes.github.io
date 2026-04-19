import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const FILE = join(process.cwd(), 'data', 'music-albums.json')

export default defineEventHandler(async (event) => {
  const { spotifyId, shelf } = await readBody(event)

  if (!spotifyId || !shelf) {
    throw createError({ statusCode: 400, message: 'spotifyId and shelf are required' })
  }

  const data = JSON.parse(readFileSync(FILE, 'utf-8'))
  const shelfObj = data.shelves.find((s: any) => s.id === shelf)

  if (!shelfObj) throw createError({ statusCode: 404, message: 'Shelf not found' })

  shelfObj.albums = shelfObj.albums.filter((a: any) => a.spotifyId !== spotifyId)
  writeFileSync(FILE, JSON.stringify(data, null, 2))
  return { ok: true }
})
