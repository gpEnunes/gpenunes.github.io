<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">About</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-6 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Emerson Nunes
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">Full-Stack Developer. Based in Portugal.</p>

    <!-- 2-image grid -->
    <div class="grid grid-cols-2 gap-3 mb-14">
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1757843298369-6e5503c14bfd?w=600&q=80"
          alt="City"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1667388455386-a5d0e19da85c?w=600&q=80"
          alt="Nature"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
    </div>

    <!-- Bio -->
    <div class="space-y-5 mb-10 text-lg leading-relaxed" style="color: var(--muted)">
      <p>
        I'm a Full-Stack Developer with 5+ years of experience building Laravel APIs, Vue.js and Nuxt.js frontends,
        and marketing automation systems. Based in Portugal, open to relocation across Europe.
      </p>
      <p>
        I write code the way I cook — with care, a healthy disregard for shortcuts, and an obsessive need to
        clean up after myself. My stack of choice is Laravel on the backend and Vue/Nuxt on the frontend,
        but I've shipped things across enough stacks to know the tool isn't the point.
      </p>
      <p>
        Outside of code I'm into rock music, cooking, writing, and spending too much time thinking
        about things I should probably just write down. This site is where most of that ends up.
      </p>
    </div>

    <!-- Blockquote -->
    <blockquote class="border-l-2 pl-6 py-1 mb-14" style="border-color: rgba(255,255,255,0.15)">
      <p class="text-xl italic leading-relaxed" style="color: rgba(255,255,255,0.5)">"Ship things that matter. Delete everything else."</p>
    </blockquote>

    <!-- 3-col cards -->
    <div class="grid sm:grid-cols-3 gap-4 mb-14">
      <div
        v-for="card in cards"
        :key="card.title"
        class="p-6 rounded-2xl border"
        style="border-color: var(--border); background: var(--card)"
      >
        <component :is="card.icon" :size="22" class="mb-4" style="color: rgba(255,255,255,0.5)" />
        <h3 class="font-semibold text-white mb-2">{{ card.title }}</h3>
        <p class="text-sm leading-relaxed" style="color: var(--muted)">{{ card.body }}</p>
      </div>
    </div>

    <!-- CV Download -->
    <a
      href="/cv-emerson-nunes.pdf"
      download="cv-emerson-nunes.pdf"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
      style="background: white; color: black"
    >
      <Download :size="15" />
      Download CV
    </a>
  </div>
</template>

<script setup>
import { Code2, Music, PenLine, Download } from 'lucide-vue-next'

useSeoMeta({
  title: 'About — Emerson Nunes',
  description: 'Full-Stack Developer based in Portugal. Laravel, Vue.js, Nuxt.js. Open to relocation across Europe.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/about' }] })

const cards = [
  {
    title: 'Developer',
    icon: Code2,
    body: 'Laravel APIs, Vue/Nuxt frontends, event-driven systems. 5+ years shipping production code across Europe.',
  },
  {
    title: 'Musician',
    icon: Music,
    body: 'Rock music runs in the blood. Led Zeppelin is correct. Everything else is debatable.',
  },
  {
    title: 'Creator',
    icon: PenLine,
    body: 'Cooking, writing and building things that last. Occasionally all three at the same time.',
  },
]
</script>
