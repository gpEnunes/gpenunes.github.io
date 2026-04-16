<template>
  <section id="portfolio" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="space-y-12">
      <!-- Heading -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--accent2)">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">Projects</h2>
      </div>

      <!-- Project cards grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.title"
          class="group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02]"
          style="border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.03)"
          :style="{ '--glow': project.accentColor }"
        >
          <!-- Hover glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            :style="{ boxShadow: `0 0 30px -8px ${project.accentColor}` }"
            aria-hidden="true"
          ></div>

          <!-- Header: icon + title -->
          <div class="relative flex items-center gap-4 mb-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
              :style="{ borderColor: `${project.accentColor}33`, background: `${project.accentColor}14` }"
            >
              <img
                v-if="project.favicon"
                :src="project.favicon"
                :alt="`${project.title} icon`"
                class="h-7 w-7 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-white leading-snug">{{ project.title }}</h3>
          </div>

          <!-- Description -->
          <p class="relative text-sm leading-relaxed mb-5 flex-1" style="color: var(--muted)">
            {{ project.description }}
          </p>

          <!-- Tech tags -->
          <div class="relative flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style="background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.08)"
            >{{ tag }}</span>
          </div>

          <!-- Links -->
          <div class="relative flex items-center gap-3">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              :style="{ background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }"
            >
              <!-- External link icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live
            </a>
            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style="border: 1px solid rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
            >
              <!-- GitHub icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'LeadFlow',
    description:
      'Marketing automation platform built on Event-Driven Architecture. Handles lead ingestion, atomic score calculation via Redis queues, and a real-time dashboard with WebSocket updates.',
    favicon: '/leadflow-favicon.svg',
    tags: ['Laravel 13', 'Vue.js 3', 'Redis', 'MySQL', 'WebSockets', 'PHP 8.4'],
    url: 'https://leadflow.enunes.net',
    repo: 'https://github.com/gpEnunes/leadflow',
    accentColor: '#4F46E5',
  },
]
</script>
