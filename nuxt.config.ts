import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-29',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxthq/studio'],

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
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
