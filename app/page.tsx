import { HomePage } from '@/components/home-page'
import { copy } from '@/lib/copy'
import { getProjects } from '@/lib/projects'
import { pageMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

export const metadata = pageMetadata({
  locale: 'en',
  path: '/',
  title: copy.en.seoTitle,
  description: copy.en.seoDescription,
})

export default function Page() {
  const projects = getProjects()
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emerson Nunes',
    jobTitle: 'Fullstack Developer',
    url: absoluteUrl('/'),
    image: 'https://gpenunes.github.io/og-image.png',
    sameAs: ['https://www.linkedin.com/in/emerson-nunes5', 'https://github.com/gpEnunes'],
    address: { '@type': 'PostalAddress', addressCountry: 'PT' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <HomePage locale="en" projects={projects} />
    </>
  )
}
