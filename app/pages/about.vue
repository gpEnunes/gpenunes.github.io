<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">About</p>
    <h1 class="text-4xl sm:text-5xl font-semibold text-white mb-10 leading-tight">Emerson Nunes</h1>

    <div class="prose prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
      <p>
        Full-Stack Developer with 5+ years of experience building Laravel APIs, Vue.js and Nuxt.js frontends,
        and marketing automation systems. Based in Portugal, open to relocation across Europe.
      </p>
      <p>
        Outside of code I'm into rock music, cooking, writing, and spending too much time thinking
        about things I should probably just write down.
      </p>
    </div>

    <!-- Stack -->
    <div class="mt-14">
      <h2 class="text-xl font-medium text-white mb-6">Tech Stack</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="stack in stacks" :key="stack.label" class="p-4 rounded-xl border" style="border-color: var(--border); background: var(--card)">
          <h3 class="text-sm font-medium text-white mb-3">{{ stack.label }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in stack.items"
              :key="item"
              class="px-2.5 py-0.5 rounded-full text-xs"
              style="background: rgba(255,255,255,0.06); color: var(--muted)"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CV -->
    <div class="mt-12">
      <a
        href="/cv-emerson-nunes.pdf"
        download="cv-emerson-nunes.pdf"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
      >
        <Download :size="15" />
        Download CV
      </a>
    </div>
  </div>
</template>

<script setup>
import { Download } from 'lucide-vue-next'

useSeoMeta({
  title: 'About — Emerson Nunes',
  description: 'Full-Stack Developer based in Portugal. Laravel, Vue.js, Nuxt.js. Open to relocation across Europe.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/about' }] })

const stacks = [
  { label: 'Backend',  items: ['Laravel', 'PHP 8.4', 'MySQL', 'Redis', 'REST APIs'] },
  { label: 'Frontend', items: ['Vue.js 3', 'Nuxt.js 4', 'TypeScript', 'Tailwind CSS'] },
  { label: 'DevOps',   items: ['Git', 'CI/CD', 'Linux', 'Vercel', 'Railway'] },
  { label: 'Other',    items: ['Scrum', 'Figma', 'Pest', 'Vitest'] },
]
</script>
