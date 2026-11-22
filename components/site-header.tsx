import Link from 'next/link'
import { copy } from '@/lib/copy'
import { localePath, type Locale } from '@/lib/site'

export function SiteHeader({ locale, path, writing }: { locale: Locale; path: string; writing?: boolean }) {
  const t = copy[locale]
  const home = localePath(locale, '/')
  const homeHref = home.endsWith('/') ? home : `${home}/`
  const writingHref = localePath(locale, '/writing')

  const links = (
    <>
      <a href={`${homeHref}#work`} className="text-sm text-white/70 hover:text-white">
        {t.work}
      </a>
      <a href={`${homeHref}#about`} className="text-sm text-white/70 hover:text-white">
        {t.about}
      </a>
      <Link
        href={writingHref}
        className="text-sm text-white/70 hover:text-white"
        aria-current={writing ? 'page' : undefined}
      >
        {t.writing}
      </Link>
      <span className="flex items-center gap-2 text-xs uppercase tracking-wider">
        <Link href={localePath('en', path)} hrefLang="en" aria-current={locale === 'en' ? 'true' : undefined} className={locale === 'en' ? 'text-white' : 'text-white/40 hover:text-white'}>
          EN
        </Link>
        <Link href={localePath('pt', path)} hrefLang="pt" aria-current={locale === 'pt' ? 'true' : undefined} className={locale === 'pt' ? 'text-white' : 'text-white/40 hover:text-white'}>
          PT
        </Link>
      </span>
    </>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#07080d]/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label={t.navLabel}>
        <Link href={home} className="text-sm text-white">
          Emerson Nunes
        </Link>
        <div className="hidden items-center gap-6 md:flex">{links}</div>
        <details className="nav-menu relative md:hidden">
          <summary className="cursor-pointer text-sm text-white/80">{t.menu}</summary>
          <div className="absolute right-0 mt-3 flex w-44 flex-col gap-3 rounded-xl border border-white/10 bg-[#12141b] p-4">
            {links}
          </div>
        </details>
      </nav>
    </header>
  )
}
