import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { copy } from '@/lib/copy'
import { localePath, type Locale } from '@/lib/site'
import type { WritingPost } from '@/lib/types'

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function WritingIndex({ locale, posts }: { locale: Locale; posts: WritingPost[] }) {
  const t = copy[locale]
  return (
    <>
      <SiteHeader locale={locale} path="/writing" writing />
      <main id="content" className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">{t.writingLabel}</p>
        <h1 className="mt-3 font-serif text-5xl text-white">{t.writingTitle}</h1>
        <p className="mt-4 text-lg text-white/60">{t.writingSubtitle}</p>
        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={localePath(locale, `/writing/${post.slug}`)} className="block py-6 hover:bg-white/[0.03]">
                <p className="text-xs text-white/45">
                  {post.category ? `${post.category} · ` : ''}
                  {formatDate(post.date, locale)}
                  {post.readTime ? ` · ${post.readTime}` : ''}
                </p>
                <h2 className="mt-2 text-2xl text-white">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}

export function WritingArticle({
  locale,
  post,
  html,
  others,
}: {
  locale: Locale
  post: WritingPost
  html: string
  others: WritingPost[]
}) {
  const t = copy[locale]
  return (
    <>
      <SiteHeader locale={locale} path={`/writing/${post.slug}`} writing />
      <main id="content" className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <Link href={localePath(locale, '/writing')} className="text-sm text-white/55 hover:text-white">
          {t.writingBack}
        </Link>
        <p className="mt-8 text-xs text-white/45">
          {post.category ? `${post.category} · ` : ''}
          {formatDate(post.date, locale)}
          {post.readTime ? ` · ${post.readTime}` : ''}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-white/65">{post.description}</p>
        {post.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/55">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <article className="prose-writing mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        {others.length > 0 ? (
          <section className="mt-16 border-t border-white/10 pt-8">
            <h2 className="text-xl text-white">{t.writingMore}</h2>
            <ul className="mt-4 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={localePath(locale, `/writing/${other.slug}`)} className="text-white/70 hover:text-white">
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  )
}
