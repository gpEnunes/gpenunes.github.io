import { WritingIndex } from '@/components/writing-index'
import { copy } from '@/lib/copy'
import { pageMetadata } from '@/lib/seo'
import { getWritingPosts } from '@/lib/writing'

export const metadata = pageMetadata({
  locale: 'pt',
  path: '/writing',
  title: copy.pt.writingSeoTitle,
  description: copy.pt.writingSeoDescription,
})

export default function Page() {
  return <WritingIndex locale="pt" posts={getWritingPosts()} />
}
