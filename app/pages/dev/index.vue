<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">Dev Life</p>
    <h1 class="text-4xl font-semibold text-white mb-3">Dev</h1>
    <p class="mb-10" style="color: var(--muted)">Code, coffee, repeat.</p>

    <!-- Tabs -->
    <div class="flex items-center gap-1 mb-10 p-1 rounded-xl w-fit" style="background: var(--card); border: 1px solid var(--border)">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="activeTab === tab.id
          ? 'bg-white text-black'
          : 'text-white/50 hover:text-white'"
      >
        <component :is="tab.icon" :size="15" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Posts tab -->
    <div v-if="activeTab === 'posts'">
      <div v-if="posts?.length" class="space-y-4">
        <ContentCard
          v-for="post in posts"
          :key="post._path"
          :to="post._path"
          :title="post.title"
          :description="post.description"
          :date="formatDate(post.date)"
          section="Dev"
          :read-time="post.readTime"
          :tags="post.tags"
        />
      </div>
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
import { FileText, Briefcase } from 'lucide-vue-next'

useSeoMeta({
  title: 'Dev — Emerson Nunes',
  description: 'Dev posts and open source projects by Emerson Nunes.',
})

const activeTab = ref('posts')
const activeProject = ref(null)

const tabs = [
  { id: 'posts',    label: 'Posts',    icon: FileText },
  { id: 'projects', label: 'Projects', icon: Briefcase },
]

const { data: posts } = await useAsyncData('dev', () =>
  queryCollection('dev').order('date', 'DESC').all()
)

const projects = [
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
