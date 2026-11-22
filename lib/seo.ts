import type { Metadata } from 'next'
import { absoluteAsset, absoluteUrl, localePath, type Locale } from '@/lib/site'

const OG_IMAGE = absoluteAsset('/og-image.png')

export function pageMetadata(options: {
  locale: Locale
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
}): Metadata {
  const en = absoluteUrl(localePath('en', options.path))
  const pt = absoluteUrl(localePath('pt', options.path))
  const canonical = options.locale === 'pt' ? pt : en

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical,
      languages: { en, pt, 'x-default': en },
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
      siteName: 'Emerson Nunes',
      type: options.type ?? 'website',
      locale: options.locale === 'pt' ? 'pt_PT' : 'en_GB',
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [OG_IMAGE],
    },
  }
}
