import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const FILE = join(process.cwd(), 'data', 'music-albums.json')

export default defineEventHandler(async (event) => {
  const { spotifyId, shelf, note, title, artist, year, cover } = await readBody(event)

  if (!spotifyId || !shelf || !note) {
    throw createError({ statusCode: 400, message: 'spotifyId, shelf and note are required' })
  }

  const data = JSON.parse(readFileSync(FILE, 'utf-8'))
  const shelfObj = data.shelves.find((s: any) => s.id === shelf)

  if (!shelfObj) throw createError({ statusCode: 404, message: 'Shelf not found' })

  const idx = shelfObj.albums.findIndex((a: any) => a.spotifyId === spotifyId)
  const album = { spotifyId, note, title, artist, year, cover }

  if (idx >= 0) {
    shelfObj.albums[idx] = album
  } else {
    shelfObj.albums.push(album)
  }

  writeFileSync(FILE, JSON.stringify(data, null, 2))
  return { ok: true }
})
