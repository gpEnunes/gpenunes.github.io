<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <!-- Faded 3D profile -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div style="transform: perspective(1000px) rotateY(-5deg)">
          <img
            src="/hero-profile.png"
            alt=""
            class="w-[280px] sm:w-[360px] md:w-[440px] object-cover object-top"
            style="
              opacity: 0.18;
              mask-image: radial-gradient(ellipse 70% 80% at center, black 20%, transparent 80%);
              -webkit-mask-image: radial-gradient(ellipse 70% 80% at center, black 20%, transparent 80%);
            "
          />
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-4xl">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl font-semibold mb-5 leading-tight"
          style="background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.4)); -webkit-background-clip: text; background-clip: text; color: transparent"
        >
          Rock. Create. Live.
        </h1>
        <p class="text-lg sm:text-xl text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
          Developer, writer, musician, cook, thinker.
          Welcome to my corner of the internet.
        </p>
        <NuxtLink
          to="/about"
          class="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-all hover:scale-105"
        >
          Get to know me
          <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <h2 class="text-3xl font-medium mb-10 text-center">Explore</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.path"
          :to="cat.path"
          class="group relative overflow-hidden rounded-2xl border aspect-[4/3] hover:border-white/20 transition-all"
          style="border-color: var(--border); background: var(--card)"
        >
          <img
            :src="cat.image"
            :alt="cat.title"
            class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <div class="flex items-center gap-2 mb-1">
              <component :is="cat.icon" :size="18" />
              <h3 class="text-lg font-medium">{{ cat.title }}</h3>
            </div>
            <p class="text-sm text-white/60">{{ cat.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Latest -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-medium">Latest</h2>
        <NuxtLink to="/thoughts" class="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
          View all <ArrowRight :size="14" />
        </NuxtLink>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        <ContentCard
          v-for="post in latest"
          :key="post._path"
          :to="post._path"
          :title="post.title"
          :description="post.description"
          :date="formatDate(post.date)"
          :section="post._section"
          :tags="post.tags"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, Music, Coffee, Pen, Code, Heart } from 'lucide-vue-next'

useSeoMeta({
  title: 'Emerson Nunes | Full-Stack Developer — Laravel, Nuxt & TypeScript',
  description: 'Developer, writer, musician, cook, thinker. Welcome to my corner of the internet.',
  ogTitle: 'Emerson Nunes | Full-Stack Developer — Laravel, Nuxt & TypeScript',
  ogDescription: 'Developer, writer, musician, cook, thinker. Welcome to my corner of the internet.',
  ogImage: 'https://enunes.net/og-image.png',
  ogUrl: 'https://enunes.net/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://enunes.net/og-image.png',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://enunes.net/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Emerson Nunes',
      jobTitle: 'Full-Stack Developer',
      description: 'Full-Stack Developer with 5+ years building Laravel APIs, Vue.js and Nuxt.js frontends, and marketing automation systems. Based in Portugal, open to relocation across Europe.',
      image: 'https://enunes.net/og-image.png',
      url: 'https://enunes.net',
      sameAs: ['https://www.linkedin.com/in/emerson-nunes5', 'https://github.com/gpEnunes'],
      address: { '@type': 'PostalAddress', addressCountry: 'PT', addressRegion: 'Portugal' },
    }),
  }],
})

const categories = [
  { title: 'Music',         description: "Rock n' roll is in my blood",    path: '/music',    icon: Music,  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
  { title: 'Cooking',       description: 'Experiments in the kitchen',      path: '/cooking',  icon: Coffee, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' },
  { title: 'Writing',       description: 'Thoughts put into words',          path: '/writing',  icon: Pen,    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80' },
  { title: 'Dev Life',      description: 'Code, coffee, repeat',             path: '/dev',      icon: Code,   image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
  { title: 'Daily Thoughts',description: 'Life as it happens',               path: '/thoughts', icon: Heart,  image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80' },
]

const { data: cookingPosts }  = await useAsyncData('home-cooking',  () => queryCollection('cooking').order('date', 'DESC').limit(1).all())
const { data: thoughtsPosts } = await useAsyncData('home-thoughts', () => queryCollection('thoughts').order('date', 'DESC').limit(1).all())

const latest = computed(() => {
  const items = [
    ...(cookingPosts.value  || []).map(p => ({ ...p, _section: 'Cooking' })),
    ...(thoughtsPosts.value || []).map(p => ({ ...p, _section: 'Thoughts' })),
  ]
  return items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2)
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
