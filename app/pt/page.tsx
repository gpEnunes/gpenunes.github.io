import { HomePage } from '@/components/home-page'
import { copy } from '@/lib/copy'
import { getProjects } from '@/lib/projects'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  locale: 'pt',
  path: '/',
  title: copy.pt.seoTitle,
  description: copy.pt.seoDescription,
})

export default function Page() {
  return <HomePage locale="pt" projects={getProjects()} />
}
