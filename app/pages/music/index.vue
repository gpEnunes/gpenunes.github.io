<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Sounds</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Music
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">Rock n' roll is in my blood.</p>

    <!-- Hero image -->
    <div class="relative rounded-2xl overflow-hidden mb-14 aspect-[21/9]">
      <img
        src="https://images.unsplash.com/photo-1772597228269-08d5d509e16f?w=1200&q=80"
        alt="Music"
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)"></div>
      <div class="absolute bottom-0 left-0 p-8">
        <p class="text-white/50 text-sm mb-1">Currently into</p>
        <p class="text-white text-2xl font-bold">Led Zeppelin, Radiohead, Arctic Monkeys</p>
      </div>
    </div>

    <!-- Playlists -->
    <div class="mb-14">
      <h2 class="text-xl font-semibold text-white mb-6">Playlists</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <a
          v-for="playlist in playlists"
          :key="playlist.title"
          :href="playlist.url"
          target="_blank"
          rel="noopener"
          class="group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:border-white/20"
          style="border-color: var(--border); background: var(--card)"
        >
          <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img :src="playlist.image" :alt="playlist.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-white text-sm group-hover:text-white/80 truncate">{{ playlist.title }}</p>
            <p class="text-xs mt-0.5 truncate" style="color: var(--muted)">{{ playlist.subtitle }}</p>
          </div>
          <ExternalLink :size="14" class="shrink-0 opacity-30 group-hover:opacity-60 transition-opacity" />
        </a>
      </div>
    </div>

    <!-- Writing about music -->
    <div>
      <h2 class="text-xl font-semibold text-white mb-6">Writing About Music</h2>
      <div v-if="posts?.length" class="grid sm:grid-cols-2 gap-5">
        <NuxtLink
          v-for="post in posts"
          :key="post._path"
          :to="post._path"
          class="group block rounded-2xl border overflow-hidden transition-all hover:border-white/20"
          style="border-color: var(--border); background: var(--card)"
        >
          <div v-if="post.image" class="aspect-[16/9] overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="post.genre" class="text-xs px-2 py-0.5 rounded-full" style="background: rgba(255,255,255,0.06); color: var(--muted)">{{ post.genre }}</span>
              <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
            </div>
            <h3 class="font-semibold text-white mb-1 group-hover:text-white/80 transition-colors line-clamp-1">{{ post.title }}</h3>
            <p v-if="post.artist" class="text-sm mb-1" style="color: var(--muted)">{{ post.artist }}</p>
            <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="text-white/40">No posts yet. Coming soon.</p>
    </div>
  </div>
</template>

<script setup>
import { ExternalLink } from 'lucide-vue-next'

useSeoMeta({ title: 'Music — Emerson Nunes', description: 'Rock music, albums and sounds.' })

const { data: posts } = await useAsyncData('music', () =>
  queryCollection('music').order('date', 'DESC').all()
)

const playlists = [
  {
    title: 'Late Night Rock',
    subtitle: '48 tracks · 3h 20min',
    url: '#',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=100&q=80',
  },
  {
    title: 'Monday Morning Focus',
    subtitle: '32 tracks · 2h 10min',
    url: '#',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&q=80',
  },
  {
    title: 'Cooking Beats',
    subtitle: '25 tracks · 1h 45min',
    url: '#',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=100&q=80',
  },
  {
    title: 'Road Trip Mix',
    subtitle: '60 tracks · 4h 05min',
    url: '#',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80',
  },
]

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
