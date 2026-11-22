import type { MetadataRoute } from 'next'
import { absoluteUrl, localePath } from '@/lib/site'
import { getWritingPosts } from '@/lib/writing'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/writing', ...getWritingPosts().map((post) => `/writing/${post.slug}`)]
  return paths.flatMap((path) =>
    (['en', 'pt'] as const).map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
    })),
  )
}
