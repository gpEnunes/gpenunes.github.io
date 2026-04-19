import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const file = readFileSync(join(process.cwd(), 'public', 'cv-emerson-nunes.pdf'))

  setHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="cv-emerson-nunes.pdf"',
    'Content-Length': String(file.length),
  })

  return file
})
