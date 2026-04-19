<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p
      class="text-xs font-semibold uppercase tracking-widest mb-4"
      style="color: rgba(255, 255, 255, 0.4)"
    >
      About
    </p>
    <h1
      class="text-5xl sm:text-6xl font-bold mb-6 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
    >
      Emerson Nunes
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">
      Full-Stack Developer. Based in Portugal.
    </p>

    <!-- 2-image grid -->
    <div class="grid grid-cols-2 gap-3 mb-14">
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="/banner-1.jpg"
          alt="City"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="/banner-2.jpg"
          alt="Nature"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
    </div>

    <!-- Bio -->
    <div
      class="space-y-5 mb-10 text-lg leading-relaxed"
      style="color: var(--muted)"
    >
      <p>
        I'm a Full-Stack Developer with 5+ years of experience building Laravel
        APIs, Vue.js and Nuxt.js frontends, and marketing automation systems.
        Based in Portugal, open to relocation across Europe.
      </p>
      <p>
        I write code with an eye for clean, maintainable systems, but I’m also
        pragmatic about tools and shortcuts. I gravitate towards Laravel on the
        backend and Vue/Nuxt on the frontend, and I’ve worked across enough
        stacks to know that the right tool matters less than a solid
        architecture and clear abstractions.
      </p>
      <p>
        Outside of code I'm into metal, cooking, writing, and spending too
        much time thinking about things I should probably just write down. This
        site is where most of that ends up.
      </p>
    </div>

    <!-- Blockquote -->
    <blockquote
      class="border-l-2 pl-6 py-1 mb-14"
      style="border-color: rgba(255, 255, 255, 0.15)"
    >
      <p
        class="text-xl italic leading-relaxed"
        style="color: rgba(255, 255, 255, 0.5)"
      >
        "Ship things that matter. Delete everything else."
      </p>
    </blockquote>

    <!-- CV Download -->
    <button
      @click="modalOpen = true"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
      style="background: white; color: black"
    >
      <Download :size="15" />
      Request CV
    </button>

    <CVRequestModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<script setup>
import { Download } from 'lucide-vue-next'

useSeoMeta({
  title: 'About — Emerson Nunes',
  description:
    'Full-Stack Developer based in Portugal. Laravel, Vue.js, Nuxt.js. Open to relocation across Europe.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/about' }] })

const modalOpen = ref(false)
</script>
