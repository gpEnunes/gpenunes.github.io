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
    'Fullstack Developer with 5+ years in Laravel, Vue.js and Nuxt.js. Specialised in marketing automation and B2B applications. Based in Portugal, open to relocation within Europe.',
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
        jobTitle: 'Full-Stack Developer',
        description: 'Full-Stack Developer with 5+ years of experience building Laravel APIs, Vue.js and Nuxt.js frontends, and marketing automation systems. Based in Portugal, open to relocation across Europe.',
        image: 'https://enunes.net/og-image.png',
        url: 'https://enunes.net',
        email: 'emersonunes500@gmail.com',
        sameAs: [
          'https://www.linkedin.com/in/emerson-nunes5',
          'https://github.com/gpEnunes',
        ],
        knowsAbout: [
          'Laravel', 'PHP', 'Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript',
          'MySQL', 'REST APIs', 'Marketing Automation', 'Event-Driven Architecture',
          'Redis', 'WebSockets', 'CRM Integrations', 'B2B Applications',
          'Unit Testing', 'CI/CD', 'Agile',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PT',
          addressRegion: 'Portugal',
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Full-Stack Developer',
          description: 'Builds scalable web applications and marketing automation platforms using Laravel, Vue.js, Nuxt.js and TypeScript.',
          skills: 'Laravel, PHP, Vue.js, Nuxt.js, TypeScript, MySQL, REST APIs, Redis, Marketing Automation',
          occupationLocation: {
            '@type': 'Country',
            name: 'Portugal',
          },
        },
      }),
    },
  ],
})
</script>
