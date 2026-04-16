<template>
  <div>
    <Navbar />
    <Hero />
    <About />
    <Experience />
    <Portfolio />
    <Contacts />
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
  title: 'Emerson Nunes — Fullstack Developer',
  description:
    'Fullstack Developer with 5+ years in Laravel, Vue.js and Nuxt.js. Specialised in marketing automation and B2B applications. Based in Portugal, open to relocation within Europe.',

  // Open Graph
  ogTitle: 'Emerson Nunes — Fullstack Developer',
  ogDescription:
    'Fullstack Developer with 5+ years in Laravel, Vue.js and Nuxt.js. Open to relocation within Europe.',
  ogUrl: 'https://enunes.net/',
  ogType: 'website',
  ogSiteName: 'Emerson Nunes',

  // Twitter / X
  twitterCard: 'summary',
  twitterTitle: 'Emerson Nunes — Fullstack Developer',
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
        seeks: {
          '@type': 'JobPosting',
          description:
            'Mid-senior Fullstack, Backend or Frontend Developer role in Europe',
        },
      }),
    },
  ],
})
</script>
