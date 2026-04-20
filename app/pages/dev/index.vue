<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Dev Life</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Dev
    </h1>
    <p class="text-lg mb-10" style="color: var(--muted)">Code, coffee, repeat.</p>

    <!-- Tabs -->
    <div class="flex items-center gap-1 mb-10 p-1 rounded-xl w-fit" style="background: var(--card); border: 1px solid var(--border)">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-white text-black' : 'text-white/50 hover:text-white'"
      >
        <component :is="tab.icon" :size="15" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Posts tab -->
    <div v-if="activeTab === 'posts'">
      <template v-if="posts?.length">
        <!-- Featured post -->
        <NuxtLink
          :to="featuredPost.path"
          class="group relative block rounded-2xl overflow-hidden mb-10"
        >
          <div class="aspect-[21/9] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566915896913-549d796d2166?w=1200&q=80"
              alt="Dev"
              class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in featuredPost.tags?.slice(0,3)"
                :key="tag"
                class="px-2.5 py-0.5 rounded-full text-xs"
                style="background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.8)"
              >{{ tag }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-white/90">{{ featuredPost.title }}</h2>
            <p class="text-sm line-clamp-2" style="color: rgba(255,255,255,0.6)">{{ featuredPost.description }}</p>
          </div>
        </NuxtLink>

        <!-- My Stack -->
        <div class="mb-12">
          <h2 class="text-xl font-semibold text-white mb-6">My Stack</h2>
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

        <!-- Latest posts -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-6">Latest Posts</h2>
          <div class="space-y-px rounded-2xl overflow-hidden border" style="border-color: var(--border)">
            <NuxtLink
              v-for="post in otherPosts"
              :key="post.path"
              :to="post.path"
              class="group flex items-start gap-5 p-5 transition-all hover:bg-white/5"
              style="background: var(--card)"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
                  <span v-if="post.readTime" class="text-xs" style="color: var(--muted)">{{ post.readTime }}</span>
                </div>
                <h3 class="font-semibold text-white mb-1 group-hover:text-white/80 transition-colors line-clamp-1">{{ post.title }}</h3>
                <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
              </div>
              <ArrowRight :size="16" class="mt-1 shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" />
            </NuxtLink>
          </div>
        </div>
      </template>
      <p v-else class="text-white/40">No posts yet. Coming soon.</p>
    </div>

    <!-- Projects tab -->
    <div v-if="activeTab === 'projects'">
      <div class="grid sm:grid-cols-2 gap-5">
        <ProjectCard
          v-for="project in projects"
          :key="project.title"
          :project="project"
          @request="openModal"
        />
      </div>
    </div>

    <RequestAccessModal :project="activeProject" @close="activeProject = null" />
  </div>
</template>

<script setup>
import { FileText, Briefcase, ArrowRight } from 'lucide-vue-next'

useSeoMeta({
  title: 'Dev — Emerson Nunes',
  description: 'Dev posts, open source projects and code experiments by Emerson Nunes. Laravel, Nuxt, TypeScript and more.',
  ogTitle: 'Dev — Emerson Nunes',
  ogDescription: 'Dev posts, open source projects and code experiments by Emerson Nunes. Laravel, Nuxt, TypeScript and more.',
  ogImage: 'https://enunes.net/og-image.png',
  ogUrl: 'https://enunes.net/dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://enunes.net/og-image.png',
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/dev' }] })

const activeTab = ref('posts')
const activeProject = ref(null)

const tabs = [
  { id: 'posts',    label: 'Posts',    icon: FileText },
  { id: 'projects', label: 'Projects', icon: Briefcase },
]

const { data: posts } = await useAsyncData('dev', () =>
  queryCollection('dev').order('date', 'DESC').all()
)

const featuredPost = computed(() => posts.value?.[0])
const otherPosts = computed(() => posts.value?.slice(1) ?? [])

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

const projects = [
  {
    title: 'DevStats',
    description: 'Developer activity dashboard aggregating GitHub, Linear, and Toggl into a single daily context. Generates standup drafts, tracks open PRs, and surfaces cycle progress — all from one place.',
    favicon: '/devstats-favicon.svg',
    tags: ['Laravel 13', 'Nuxt 4', 'MySQL', 'TypeScript', 'PHP 8.3'],
    url: 'https://devstats.enunes.net',
    repo: null,
    privateRepo: true,
    accentColor: '#6366f1',
  },
  {
    title: 'LeadFlow',
    description: 'Marketing automation platform built on Event-Driven Architecture. Handles lead ingestion, atomic score calculation via Redis queues, and a real-time dashboard with WebSocket updates.',
    favicon: '/leadflow-favicon.svg',
    tags: ['Laravel 13', 'Vue.js 3', 'Redis', 'MySQL', 'WebSockets', 'PHP 8.4'],
    url: 'https://leadflow.enunes.net',
    repo: null,
    privateRepo: true,
    accentColor: '#4F46E5',
  },
]

function openModal(project) {
  activeProject.value = project
  if (typeof gtag !== 'undefined') {
    gtag('event', 'repo_access_request_open', { project_title: project.title })
  }
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
