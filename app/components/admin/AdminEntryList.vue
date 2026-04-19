<template>
  <div v-if="entries.length" class="rounded-2xl border overflow-hidden" style="border-color: var(--border)">
    <div
      v-for="entry in entries"
      :key="entry.slug"
      class="flex items-center gap-4 px-4 py-3 border-b last:border-b-0"
      style="border-color: var(--border); background: var(--card)"
    >
      <div class="flex-1 min-w-0">
        <p class="text-white text-sm font-medium line-clamp-1">{{ entry.meta.title }}</p>
        <p class="text-xs mt-0.5" style="color: var(--muted)">
          {{ entry.meta.date }}
          <span v-if="entry.meta.category"> · {{ entry.meta.category }}</span>
          <span v-if="entry.meta.mood"> · {{ entry.meta.mood }}</span>
          <span v-if="entry.meta.time"> · {{ entry.meta.time }}</span>
        </p>
      </div>
      <button @click="$emit('edit', entry)" class="text-xs px-3 py-1.5 rounded-lg transition-colors hover:text-white" style="color: var(--muted); background: rgba(255,255,255,0.05)">
        Edit
      </button>
      <button @click="$emit('delete', entry)" class="shrink-0 text-white/20 hover:text-red-400 transition-colors">
        <Trash2 :size="15" />
      </button>
    </div>
  </div>
  <p v-else class="text-sm" style="color: rgba(255,255,255,0.2)">No entries yet.</p>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
defineProps<{ entries: any[] }>()
defineEmits(['edit', 'delete'])
</script>
