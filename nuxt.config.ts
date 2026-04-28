import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-29',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
  },

  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['javascript', 'typescript', 'vue', 'php', 'bash', 'sh', 'json', 'css', 'html', 'sql', 'yaml', 'markdown'],
    },
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    public: {
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
    },
  },

$production: {
    routeRules: {
      '/**': { isr: true },
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s',
      meta: [
        { name: 'author', content: 'Emerson Nunes' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'description', content: 'Fullstack Developer com 5+ anos, especializado em Vue.js, Nuxt.js, Laravel e dashboards em tempo real. Portfolio com DevStats e LeadFlow.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  typescript: { shim: false },
  components: true,
  ssr: true,
})
