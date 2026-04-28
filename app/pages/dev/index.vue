<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">{{ $t('dev.label') }}</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Dev
    </h1>
    <p class="text-lg mb-16" style="color: var(--muted)">{{ $t('dev.subtitle') }}</p>

    <!-- Projects -->
    <div class="space-y-5 mb-20">
      <div
        v-for="project in projects"
        :key="project.key"
        class="group relative rounded-2xl border p-6 sm:p-8 transition-all duration-300"
        style="border-color: var(--border); background: var(--card)"
      >
        <div
          class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          :style="{ boxShadow: `0 0 40px -12px ${project.accentColor}` }"
          aria-hidden="true"
        />

        <!-- Header -->
        <div class="relative flex items-start gap-4 mb-5">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border mt-0.5"
            :style="{ borderColor: `${project.accentColor}33`, background: `${project.accentColor}14` }"
          >
            <img :src="project.favicon" :alt="`${project.title} icon`" class="h-7 w-7 object-contain" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-xl font-semibold text-white">{{ project.title }}</h2>
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                @click="trackDemo(project.title)"
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all hover:scale-105"
                :style="{ background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }"
              >
                <ExternalLink :size="11" />
                {{ project.url.replace('https://', '') }}
              </a>
            </div>
            <p class="text-sm mt-0.5" :style="{ color: project.accentColor + 'cc' }">{{ project.type }}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="relative mb-5">
          <p class="text-sm leading-relaxed" style="color: var(--muted)">{{ project.description }}</p>
        </div>

        <!-- Highlights -->
        <div class="relative mb-5">
          <ul class="space-y-1">
            <li
              v-for="h in project.highlights"
              :key="h"
              class="flex items-start gap-2 text-sm"
              style="color: var(--muted)"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" :style="{ background: project.accentColor }" />
              {{ h }}
            </li>
          </ul>
        </div>

        <!-- Stack -->
        <div class="relative flex flex-wrap gap-1.5 mb-5">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.08)"
          >{{ tag }}</span>
        </div>

        <!-- Actions -->
        <div class="relative flex items-center gap-2">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackDemo(project.title)"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
            :style="{ background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }"
          >
            <ExternalLink :size="13" />
            {{ $t('dev.view_demo') }}
          </a>
          <button
            @click="openModal(project)"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer border"
            style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
          >
            <Lock :size="13" />
            {{ $t('dev.request_repo') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stack -->
    <div>
      <h2 class="text-xl font-semibold text-white mb-6">{{ $t('dev.stack_heading') }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="tool in stack"
          :key="tool.name"
          class="flex items-center gap-3 p-3.5 rounded-xl border"
          style="border-color: var(--border); background: var(--card)"
        >
          <img :src="`https://cdn.simpleicons.org/${tool.icon}/${tool.color}`" :alt="tool.name" class="w-6 h-6 shrink-0" />
          <div>
            <p class="text-sm font-medium text-white">{{ tool.name }}</p>
            <p class="text-xs" style="color: var(--muted)">{{ tool.type }}</p>
          </div>
        </div>
      </div>
    </div>

    <RequestAccessModal :project="activeProject" @close="activeProject = null" />
  </div>
</template>

<script setup>
import { ExternalLink, Lock } from 'lucide-vue-next'

const { t, tm, rt } = useI18n()

useSeoMeta({
  title: computed(() => t('dev.seo_title')),
  description: computed(() => t('dev.seo_description')),
  ogTitle: computed(() => t('dev.seo_title')),
  ogDescription: computed(() => t('dev.seo_description')),
  ogImage: 'https://enunes.net/og-image.png',
  ogUrl: 'https://enunes.net/dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://enunes.net/og-image.png',
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/dev' }] })

const activeProject = ref(null)

const projects = computed(() => [
  {
    key: 'devstats',
    title: 'DevStats',
    type: t('dev.projects.devstats.type'),
    description: t('dev.projects.devstats.description'),
    highlights: tm('dev.projects.devstats.highlights').map(i => rt(i)),
    favicon: '/devstats-favicon.svg',
    tags: ['Laravel 13', 'Nuxt 4', 'TypeScript', 'Redis', 'WebSocket', 'MySQL', 'PHP 8.3', 'Vercel', 'Railway'],
    url: 'https://devstats.enunes.net',
    privateRepo: true,
    accentColor: '#6366f1',
  },
  {
    key: 'leadflow',
    title: 'LeadFlow',
    type: t('dev.projects.leadflow.type'),
    description: t('dev.projects.leadflow.description'),
    highlights: tm('dev.projects.leadflow.highlights').map(i => rt(i)),
    favicon: '/leadflow-favicon.svg',
    tags: ['Laravel 13', 'Vue.js 3', 'TypeScript', 'Redis', 'WebSocket', 'MySQL', 'PHP 8.4', 'Vercel', 'Railway'],
    url: 'https://leadflow.enunes.net',
    privateRepo: true,
    accentColor: '#4F46E5',
  },
])

const stack = [
  { icon: 'laravel',    color: 'FF2D20', name: 'Laravel',    type: 'Backend'   },
  { icon: 'vuedotjs',   color: '4FC08D', name: 'Vue.js',     type: 'Frontend'  },
  { icon: 'nuxt',       color: '00DC82', name: 'Nuxt',       type: 'Framework' },
  { icon: 'typescript', color: '3178C6', name: 'TypeScript', type: 'Language'  },
  { icon: 'mysql',      color: '4479A1', name: 'MySQL',      type: 'Database'  },
  { icon: 'redis',      color: 'DC382D', name: 'Redis',      type: 'Cache'     },
  { icon: 'railway',    color: 'ffffff', name: 'Railway',    type: 'DevOps'    },
  { icon: 'vercel',     color: 'ffffff', name: 'Vercel',     type: 'Hosting'   },
]

function openModal(project) {
  activeProject.value = project
  if (typeof gtag !== 'undefined') {
    gtag('event', 'repo_access_request_open', { project_title: project.title })
  }
}

function trackDemo(title) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'demo_click', { project_title: title, location: 'dev_page' })
  }
}
</script>
