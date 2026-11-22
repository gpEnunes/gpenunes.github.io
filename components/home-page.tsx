import { ScrollScene } from '@/components/scroll-scene'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/site'
import type { Project } from '@/lib/types'

function host(url: string) {
  return url.replace(/^https?:\/\//, '')
}

export function HomePage({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const t = copy[locale]

  return (
    <>
      <SiteHeader locale={locale} path="/" />
      <main id="content" className="pt-16">
        <ScrollScene label={t.heroLabel} name="Emerson Nunes" stack={t.heroStack} />

        <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
          <h2 className="font-serif text-4xl text-white">{t.portfolioLabel}</h2>
          <p className="mt-2 text-sm text-white/55">{t.portfolioSubtitle}</p>
          <div className="mt-10 space-y-6">
            {projects.map((project) => {
              const description = locale === 'pt' ? project.descriptionPt : project.description
              const highlights = locale === 'pt' ? project.highlightsPt : project.highlights
              const type = locale === 'pt' ? project.typePt : project.type
              return (
                <article key={project.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <img src={project.favicon} alt="" width={36} height={36} className="mt-1 h-9 w-9" />
                    <div>
                      <h3 className="text-2xl text-white">
                        <a href={project.url} className="hover:underline" target="_blank" rel="noreferrer noopener">
                          {project.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: project.accent }}>
                        {type}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-3xl leading-relaxed text-white/70">{description}</p>
                  <p className="mt-4 text-sm text-white/45">{t.privateRepo}</p>
                  <ul className="mt-4 space-y-2">
                    {highlights.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/65">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/55">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a href={project.url} className="mt-6 inline-flex text-sm text-white hover:underline" target="_blank" rel="noreferrer noopener">
                    {t.viewDemo}
                    <span className="sr-only"> {project.title}</span>
                    <span className="ml-2 text-white/45">{host(project.url)}</span>
                  </a>
                </article>
              )
            })}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-8 pb-24 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">{t.aboutLabel}</p>
          <h2 className="mt-3 font-serif text-4xl text-white">Emerson Nunes</h2>
          <p className="mt-3 text-white/55">{t.aboutSubtitle}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">
            {t.bios.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
