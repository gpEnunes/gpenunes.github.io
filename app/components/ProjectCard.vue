<template>
  <div
    class="group relative flex flex-col rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02]"
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
        <img v-if="project.favicon" :src="project.favicon" :alt="`${project.title} icon`" class="h-6 w-6 object-contain" />
      </div>
      <h3 class="font-medium text-white">{{ project.title }}</h3>
    </div>

    <p class="relative text-sm leading-relaxed mb-4 flex-1" style="color: var(--muted)">
      {{ project.description }}
    </p>

    <div class="relative flex flex-wrap gap-1.5 mb-5">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="px-2 py-0.5 rounded-full text-xs"
        style="background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.08)"
      >{{ tag }}</span>
    </div>

    <div class="relative flex items-center gap-2">
      <a
        v-if="project.url"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
        :style="{ background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }"
      >
        <ExternalLink :size="12" />
        Live
      </a>

      <button
        v-if="project.privateRepo"
        @click="$emit('request', project)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer border"
        style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
      >
        <Lock :size="12" />
        Request Repository Access
      </button>

      <a
        v-else-if="project.repo"
        :href="project.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 border"
        style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
      >
        <Github :size="12" />
        Repo
      </a>
    </div>
  </div>
</template>

<script setup>
import { ExternalLink, Lock, Github } from 'lucide-vue-next'

defineProps({ project: { type: Object, required: true } })
defineEmits(['request'])
</script>
