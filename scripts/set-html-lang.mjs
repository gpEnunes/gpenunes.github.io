import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function htmlFiles(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) htmlFiles(path, found)
    else if (name.endsWith('.html')) found.push(path)
  }
  return found
}

const out = 'out'
for (const file of htmlFiles(out)) {
  const normalized = file.split('\\').join('/')
  const lang = normalized.includes('/pt/') ? 'pt' : 'en'
  const html = readFileSync(file, 'utf8').replace(/<html\b([^>]*)>/, (_match, attrs) => {
    const next = /\blang=/.test(attrs)
      ? attrs.replace(/\blang="[^"]*"/, `lang="${lang}"`)
      : ` lang="${lang}"${attrs}`
    return `<html${next}>`
  })
  writeFileSync(file, html)
}
