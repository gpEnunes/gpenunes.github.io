<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Words</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Writing
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">Essays, notes and things I felt like putting into words.</p>

    <template v-if="posts?.length">
      <!-- Featured post -->
      <NuxtLink
        :to="featured._path"
        class="group relative block rounded-2xl overflow-hidden mb-10 transition-all"
      >
        <div class="aspect-[21/9] overflow-hidden">
          <img
            :src="featured.image || 'https://images.unsplash.com/photo-1601321268954-22646044f7d0?w=1200&q=80'"
            :alt="featured.title"
            class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="flex items-center gap-3 mb-3">
            <span v-if="featured.category" class="px-3 py-1 rounded-full text-xs font-semibold" style="background: white; color: black">
              {{ featured.category }}
            </span>
            <span class="text-xs" style="color: rgba(255,255,255,0.5)">{{ formatDate(featured.date) }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-white/90">{{ featured.title }}</h2>
          <p class="text-sm sm:text-base line-clamp-2" style="color: rgba(255,255,255,0.6)">{{ featured.description }}</p>
        </div>
      </NuxtLink>

      <!-- Rest of posts -->
      <div v-if="rest.length" class="space-y-px rounded-2xl overflow-hidden border" style="border-color: var(--border)">
        <NuxtLink
          v-for="post in rest"
          :key="post._path"
          :to="post._path"
          class="group flex items-start gap-5 p-5 transition-all hover:bg-white/5"
          style="background: var(--card)"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <span v-if="post.category" class="text-xs px-2 py-0.5 rounded-full" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6)">
                {{ post.category }}
              </span>
              <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
              <span v-if="post.readTime" class="text-xs" style="color: var(--muted)">{{ post.readTime }}</span>
            </div>
            <h3 class="font-semibold text-white mb-1 group-hover:text-white/80 transition-colors line-clamp-1">{{ post.title }}</h3>
            <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
          </div>
          <ArrowRight :size="16" class="mt-1 shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" />
        </NuxtLink>
      </div>
    </template>

    <p v-else class="text-white/40">No posts yet. Coming soon.</p>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

useSeoMeta({ title: 'Writing — Emerson Nunes', description: 'Essays and notes.' })

const { data: posts } = await useAsyncData('writing', () =>
  queryCollection('writing').order('date', 'DESC').all()
)

const featured = computed(() => posts.value?.[0])
const rest = computed(() => posts.value?.slice(1) ?? [])

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
