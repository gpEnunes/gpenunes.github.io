import { notFound } from 'next/navigation'
import { WritingArticle } from '@/components/writing-index'
import { pageMetadata } from '@/lib/seo'
import { getWritingPost, getWritingPosts, renderWriting } from '@/lib/writing'

export function generateStaticParams() {
  return getWritingPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getWritingPost(slug)
  if (!post) return {}
  return pageMetadata({
    locale: 'en',
    path: `/writing/${post.slug}`,
    title: `${post.title} — Emerson Nunes`,
    description: post.description,
    type: 'article',
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getWritingPost(slug)
  if (!post) notFound()
  const others = getWritingPosts().filter((item) => item.slug !== post.slug)
  return <WritingArticle locale="en" post={post} html={renderWriting(post.body)} others={others} />
}
