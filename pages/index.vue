<template>
  <div>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Contacts />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
import About from '~/components/About.vue'
import Experience from '~/components/Experience.vue'
import Portfolio from '~/components/Portfolio.vue'
import Contacts from '~/components/Contacts.vue'
import Footer from '~/components/Footer.vue'

// ── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'Emerson Nunes | Full-Stack Developer — Laravel, Nuxt & TypeScript',
  description:
    'Fullstack Developer with 5+ years in Laravel, Vue.js and Nuxt.js. Specialised in marketing automation and B2B applications. Based in Portugal, open to relocation within Europe.',

  // Open Graph
  ogTitle: 'Emerson Nunes | Full-Stack Developer — Laravel, Nuxt & TypeScript',
  ogDescription:
    'Fullstack Developer with 5+ years in Laravel, Vue.js and Nuxt.js. Specialised in marketing automation and B2B applications. Based in Portugal, open to relocation within Europe.',
  ogUrl: 'https://enunes.net/',
  ogType: 'website',
  ogSiteName: 'Emerson Nunes',
  ogImage: 'https://enunes.net/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',

  twitterImage: 'https://enunes.net/og-image.png',

  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: 'Emerson Nunes | Full-Stack Developer — Laravel, Nuxt & TypeScript',
  twitterDescription:
    'Fullstack Developer (Laravel, Vue.js, Nuxt.js) based in Portugal. Open to relocation within Europe.',
})

// ── JSON-LD Person schema ─────────────────────────────────────────────────────
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Emerson Nunes',
        jobTitle: 'Fullstack Developer',
        url: 'https://enunes.net',
        email: 'emersonunes500@gmail.com',
        sameAs: [
          'https://linkedin.com/in/emerson-nunes5',
          'https://github.com/gpEnunes',
        ],
        knowsAbout: [
          'Laravel',
          'PHP',
          'Vue.js',
          'Nuxt.js',
          'JavaScript',
          'TypeScript',
          'MySQL',
          'REST APIs',
          'Marketing Automation',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PT',
        },
      }),
    },
  ],
})
</script>
