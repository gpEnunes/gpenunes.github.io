import type { Locale } from '@/lib/site'

export type Copy = {
  navLabel: string
  menu: string
  work: string
  about: string
  writing: string
  heroLabel: string
  heroStack: string
  portfolioLabel: string
  portfolioSubtitle: string
  viewDemo: string
  privateRepo: string
  aboutLabel: string
  aboutSubtitle: string
  bios: [string, string, string]
  writingLabel: string
  writingTitle: string
  writingSubtitle: string
  writingBack: string
  writingMore: string
  seoTitle: string
  seoDescription: string
  writingSeoTitle: string
  writingSeoDescription: string
}

export const copy: Record<Locale, Copy> = {
  en: {
    navLabel: 'Primary',
    menu: 'Menu',
    work: 'Portfolio',
    about: 'About',
    writing: 'Writing',
    heroLabel: 'Fullstack Developer',
    heroStack: 'Vue.js · Nuxt.js · TypeScript · Laravel · Redis · WebSocket',
    portfolioLabel: 'Portfolio',
    portfolioSubtitle: 'Real production projects',
    viewDemo: 'View demo',
    privateRepo: 'Private repository',
    aboutLabel: 'About',
    aboutSubtitle: 'Full-Stack Developer. Based in Portugal.',
    bios: [
      "I'm a Full-Stack Developer with 8+ years of experience building Laravel APIs, Vue.js and Nuxt.js frontends, and marketing automation systems. Based in Portugal, open to relocation across Europe.",
      "I write code with an eye for clean, maintainable systems, but I'm also pragmatic about tools and shortcuts. I gravitate towards Laravel on the backend and Vue/Nuxt on the frontend, and I've worked across enough stacks to know that the right tool matters less than a solid architecture and clear abstractions.",
      "I'm available for senior fullstack roles and freelance projects across Europe. If you're building something with Vue, Nuxt, or Laravel and need someone who ships, let's talk.",
    ],
    writingLabel: 'Writing',
    writingTitle: 'Writing',
    writingSubtitle: 'Essays, notes and things I felt like putting into words.',
    writingBack: 'Back to writing',
    writingMore: 'More writing',
    seoTitle: 'Emerson Nunes · Fullstack Developer',
    seoDescription:
      'Fullstack Developer with 8+ years, specialised in Vue.js, Nuxt.js, Laravel and real-time dashboards. Portfolio with DevStats and LeadFlow.',
    writingSeoTitle: 'Writing — Emerson Nunes',
    writingSeoDescription:
      'Essays, notes and things worth putting into words. Ideas about code, life and everything in between.',
  },
  pt: {
    navLabel: 'Principal',
    menu: 'Menu',
    work: 'Portfolio',
    about: 'Sobre',
    writing: 'Escrita',
    heroLabel: 'Fullstack Developer',
    heroStack: 'Vue.js · Nuxt.js · TypeScript · Laravel · Redis · WebSocket',
    portfolioLabel: 'Portfolio',
    portfolioSubtitle: 'Projetos reais em produção',
    viewDemo: 'Ver demo',
    privateRepo: 'Repositório privado',
    aboutLabel: 'Sobre',
    aboutSubtitle: 'Fullstack Developer. Estabelecido em Portugal.',
    bios: [
      'Sou Fullstack Developer com 8+ anos de experiência a construir APIs Laravel, frontends Vue.js e Nuxt.js, e sistemas de automação de marketing. Baseado em Portugal, disponível para recolocação na Europa.',
      'Escrevo código com foco em sistemas limpos e fáceis de manter, mas também sou pragmático com ferramentas e atalhos. Prefiro Laravel no backend e Vue/Nuxt no frontend, e já trabalhei em stacks suficientes para perceber que a ferramenta certa importa menos do que uma arquitectura sólida e abstrações claras.',
      'Disponível para posições senior fullstack e projectos freelance na Europa. Se estás a construir algo com Vue, Nuxt ou Laravel e precisas de alguém que entrega, fala comigo.',
    ],
    writingLabel: 'Escrita',
    writingTitle: 'Escrita',
    writingSubtitle: 'Ensaios, notas e coisas que quis pôr em palavras.',
    writingBack: 'Voltar',
    writingMore: 'Mais textos',
    seoTitle: 'Emerson Nunes · Fullstack Developer',
    seoDescription:
      'Fullstack Developer com 8+ anos, especializado em Vue.js, Nuxt.js, Laravel e dashboards em tempo real. Portfolio com DevStats e LeadFlow.',
    writingSeoTitle: 'Escrita — Emerson Nunes',
    writingSeoDescription:
      'Ensaios, notas e coisas que valem a pena pôr em palavras. Ideias sobre código, vida e tudo o resto.',
  },
}
