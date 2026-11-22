import { WritingIndex } from '@/components/writing-index'
import { copy } from '@/lib/copy'
import { pageMetadata } from '@/lib/seo'
import { getWritingPosts } from '@/lib/writing'

export const metadata = pageMetadata({
  locale: 'en',
  path: '/writing',
  title: copy.en.writingSeoTitle,
  description: copy.en.writingSeoDescription,
})

export default function Page() {
  return <WritingIndex locale="en" posts={getWritingPosts()} />
}
