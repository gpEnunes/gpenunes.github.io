<template>
  <NuxtLink
    :to="to"
    class="group block p-5 rounded-xl border transition-all hover:border-white/20"
    style="background: var(--card); border-color: var(--border)"
  >
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xs" style="color: var(--muted)">{{ section }}</span>
      <span style="color: rgba(255,255,255,0.15)">•</span>
      <span class="text-xs" style="color: var(--muted)">{{ date }}</span>
      <span v-if="readTime" style="color: rgba(255,255,255,0.15)">•</span>
      <span v-if="readTime" class="text-xs" style="color: var(--muted)">{{ readTime }}</span>
    </div>
    <h3 class="text-base font-medium text-white mb-2 group-hover:text-white/80 transition-colors leading-snug">
      {{ title }}
    </h3>
    <p class="text-sm leading-relaxed line-clamp-2" style="color: var(--muted)">{{ description }}</p>
    <div v-if="tags?.length" class="flex flex-wrap gap-1.5 mt-3">
      <span
        v-for="tag in tags"
        :key="tag"
        class="px-2 py-0.5 rounded-full text-xs"
        style="background: rgba(255,255,255,0.06); color: var(--muted)"
      >{{ tag }}</span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to:          { type: String,  required: true },
  title:       { type: String,  required: true },
  description: { type: String,  required: true },
  date:        { type: String,  required: true },
  section:     { type: String,  default: '' },
  readTime:    { type: String,  default: '' },
  tags:        { type: Array,   default: () => [] },
})
</script>
