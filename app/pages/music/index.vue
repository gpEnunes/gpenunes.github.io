<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Sounds</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Music
    </h1>
    <p class="text-lg mb-10" style="color: var(--muted)">Albums that matter, for every state of mind.</p>

    <!-- Shelf tabs -->
    <div class="overflow-x-auto pb-1 mb-10 scrollbar-none">
      <div class="flex gap-1 p-1 rounded-xl w-fit" style="background: var(--card); border: 1px solid var(--border)">
        <button
          v-for="shelf in shelves"
          :key="shelf.id"
          @click="selectShelf(shelf.id)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
          :class="activeShelf === shelf.id ? 'bg-white text-black' : 'text-white/50 hover:text-white'"
        >
          {{ shelf.label }}
        </button>
      </div>
    </div>

    <!-- Album grid -->
    <template v-if="currentAlbums.length">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <button
          v-for="album in currentAlbums"
          :key="album.spotifyId"
          @click="toggleAlbum(album)"
          class="group text-left rounded-2xl overflow-hidden border transition-all duration-200"
          :style="{
            borderColor: activeAlbum?.spotifyId === album.spotifyId ? 'rgba(255,255,255,0.5)' : 'var(--border)',
            background: 'var(--card)',
          }"
        >
          <div class="aspect-square overflow-hidden bg-white/5">
            <img
              v-if="album.cover"
              :src="album.cover"
              :alt="album.title"
              class="w-full h-full object-cover transition-all duration-500"
              :class="activeAlbum?.spotifyId === album.spotifyId ? 'opacity-100 scale-105' : 'opacity-75 group-hover:opacity-100 group-hover:scale-105'"
            />
          </div>
          <div class="p-3">
            <p class="text-white text-sm font-medium leading-snug line-clamp-1">{{ album.title }}</p>
            <p class="text-xs mt-0.5 line-clamp-1" style="color: var(--muted)">{{ album.artist }} · {{ album.year }}</p>
          </div>
        </button>
      </div>
    </template>
    <p v-else class="text-white/30 text-sm mb-6">No albums on this shelf yet.</p>

    <!-- Player zone -->
    <Transition name="player">
      <div
        v-if="activeAlbum"
        class="rounded-2xl overflow-hidden border"
        style="border-color: var(--border); background: var(--card)"
      >
        <div class="p-5 flex items-start justify-between gap-4 border-b" style="border-color: var(--border)">
          <div>
            <p class="text-white font-semibold">{{ activeAlbum.title }}</p>
            <p class="text-sm mt-0.5" style="color: var(--muted)">{{ activeAlbum.artist }} · {{ activeAlbum.year }}</p>
            <p class="text-sm mt-3 leading-relaxed" style="color: rgba(255,255,255,0.45)">{{ activeAlbum.note }}</p>
          </div>
          <button @click="activeAlbum = null" class="mt-0.5 shrink-0 text-white/30 hover:text-white/70 transition-colors">
            <X :size="18" />
          </button>
        </div>
        <iframe
          :src="`https://open.spotify.com/embed/album/${activeAlbum.spotifyId}?utm_source=generator&theme=0`"
          width="100%"
          height="352"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          class="block"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

useSeoMeta({ title: 'Music — Emerson Nunes', description: 'Albums that matter, for every state of mind.' })

const { data } = await useAsyncData('music-albums', () => $fetch('/api/music/albums'))

const shelves = computed(() => data.value?.shelves ?? [])

const activeShelf = ref(shelves.value[0]?.id ?? '')
const activeAlbum = ref(null)

const currentAlbums = computed(() =>
  shelves.value.find(s => s.id === activeShelf.value)?.albums ?? []
)

function selectShelf(id) {
  activeShelf.value = id
  activeAlbum.value = null
}

function toggleAlbum(album) {
  activeAlbum.value = activeAlbum.value?.spotifyId === album.spotifyId ? null : album
}
</script>

<style scoped>
.scrollbar-none { scrollbar-width: none; }
.scrollbar-none::-webkit-scrollbar { display: none; }

.player-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.player-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.player-enter-from { opacity: 0; transform: translateY(10px); }
.player-leave-to { opacity: 0; transform: translateY(6px); }
</style>
