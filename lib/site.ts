export const SITE = 'https://gpenunes.github.io'

export type Locale = 'en' | 'pt'

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') return normalized
  return normalized === '/' ? '/pt' : `/pt${normalized}`
}

export function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE}${normalized.endsWith('/') ? normalized : `${normalized}/`}`
}

export function absoluteAsset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE}${normalized}`
}
