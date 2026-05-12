<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <ClientOnly>
        <HeroCanvas />
      </ClientOnly>

      <div class="relative z-10 max-w-4xl">
        <p class="text-xs font-semibold uppercase tracking-widest mb-6" style="color: rgba(255,255,255,0.4)">
          {{ $t('home.hero_label') }}
        </p>
        <h1
          class="text-5xl sm:text-7xl md:text-8xl font-semibold mb-5 leading-tight"
          style="background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.4)); -webkit-background-clip: text; background-clip: text; color: transparent"
        >
          Emerson Nunes
        </h1>
        <p class="text-base sm:text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed tracking-wide font-mono">
          {{ $t('home.hero_stack') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            :to="localePath('/dev')"
            @click="trackViewProjects"
            class="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-all hover:scale-105"
          >
            {{ $t('home.cta_projects') }}
            <ArrowRight :size="16" />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/about')"
            class="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
            style="border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7)"
          >
            {{ $t('home.cta_about') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <h2 class="text-3xl font-medium mb-2 text-center">{{ $t('home.portfolio_label') }}</h2>
      <p class="text-center text-sm mb-10" style="color: var(--muted)">{{ $t('home.portfolio_subtitle') }}</p>
      <div class="grid sm:grid-cols-2 gap-5 mb-10">
        <a
          v-for="project in featuredProjects"
          :key="project.key"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackProjectClick(project.title)"
          class="group relative flex flex-col rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          style="border-color: var(--border); background: var(--card)"
        >
          <div
            class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            :style="{ boxShadow: `0 0 28px -8px ${project.accentColor}` }"
            aria-hidden="true"
          />
          <div class="relative flex items-center gap-3 mb-4">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
              :style="{ borderColor: `${project.accentColor}33`, background: `${project.accentColor}14` }"
            >
              <img :src="project.favicon" :alt="`${project.title} icon`" class="h-6 w-6 object-contain" />
            </div>
            <div>
              <h3 class="font-medium text-white">{{ project.title }}</h3>
              <p class="text-xs" :style="{ color: project.accentColor }">{{ project.url.replace('https://', '') }}</p>
            </div>
            <ExternalLink :size="14" class="ml-auto opacity-30 group-hover:opacity-70 transition-opacity" style="color: white" />
          </div>
          <p class="relative text-sm leading-relaxed mb-4 flex-1" style="color: var(--muted)">
            {{ project.description }}
          </p>
          <div class="relative flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2 py-0.5 rounded-full text-xs"
              style="background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.08)"
            >{{ tag }}</span>
          </div>
        </a>
      </div>
      <div class="text-center">
        <NuxtLink
          :to="localePath('/dev')"
          @click="trackViewProjects"
          class="inline-flex items-center gap-2 text-sm transition-all hover:text-white"
          style="color: var(--muted)"
        >
          {{ $t('home.portfolio_cta') }}
          <ArrowRight :size="14" />
        </NuxtLink>
      </div>
    </section>

    <!-- Latest writing -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-medium">{{ $t('home.latest_heading') }}</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        <ContentCard
          v-for="post in latest"
          :key="post.path"
          :to="localePath(post.path)"
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
import { ArrowRight, ExternalLink } from 'lucide-vue-next'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: computed(() => t('home.seo_title')),
  description: computed(() => t('home.seo_description')),
  ogTitle: computed(() => t('home.seo_title')),
  ogDescription: computed(() => t('home.seo_description')),
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
      jobTitle: 'Fullstack Developer',
      description: 'Fullstack Developer with 8+ years building Laravel APIs, Vue.js and Nuxt.js frontends, and real-time dashboards. Based in Portugal, open to relocation across Europe.',
      image: 'https://enunes.net/og-image.png',
      url: 'https://enunes.net',
      sameAs: ['https://www.linkedin.com/in/emerson-nunes5', 'https://github.com/gpEnunes'],
      address: { '@type': 'PostalAddress', addressCountry: 'PT', addressRegion: 'Portugal' },
    }),
  }],
})

const featuredProjects = computed(() => [
  {
    key: 'devstats',
    title: 'DevStats',
    description: t('dev.projects.devstats.description'),
    favicon: '/devstats-favicon.svg',
    tags: ['Laravel 13', 'Nuxt 4', 'TypeScript', 'Redis', 'WebSocket', 'MySQL'],
    url: 'https://devstats.enunes.net',
    accentColor: '#6366f1',
  },
  {
    key: 'leadflow',
    title: 'LeadFlow',
    description: t('dev.projects.leadflow.description'),
    favicon: '/leadflow-favicon.svg',
    tags: ['Laravel 13', 'Vue.js 3', 'TypeScript', 'Redis', 'WebSocket', 'MySQL'],
    url: 'https://leadflow.enunes.net',
    accentColor: '#4F46E5',
  },
])

const { data: blogPosts } = await useAsyncData('home-blog', () =>
  queryCollection('blog').order('date', 'DESC').limit(2).all()
)

const latest = computed(() => (blogPosts.value || []).map(p => ({ ...p, _section: 'Blog' })))

function trackProjectClick(title) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'project_click', { project_title: title, location: 'homepage' })
  }
}

function trackViewProjects() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_all_projects_click', { location: 'homepage' })
  }
}

function formatDate(d) {
  const loc = locale.value === 'pt' ? 'pt-PT' : 'en-GB'
  return new Date(d).toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
