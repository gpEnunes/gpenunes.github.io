<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: rgba(255,255,255,0.3)">Admin</p>
    <h1 class="text-3xl font-bold text-white mb-10">Music Shelf</h1>

    <!-- Add album form -->
    <div class="rounded-2xl border p-6 mb-10" style="border-color: var(--border); background: var(--card)">
      <h2 class="text-sm font-semibold uppercase tracking-widest mb-5" style="color: rgba(255,255,255,0.4)">Add Album</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-xs mb-1.5" style="color: var(--muted)">Spotify Album URL or ID</label>
          <input
            v-model="form.spotifyInput"
            type="text"
            placeholder="https://open.spotify.com/album/... or just the ID"
            class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-white/20"
            style="background: rgba(255,255,255,0.05); border: 1px solid var(--border)"
            @keydown.enter="fetchPreview"
          />
        </div>

        <div class="flex gap-3">
          <div class="flex-1">
            <label class="block text-xs mb-1.5" style="color: var(--muted)">Shelf</label>
            <select
              v-model="form.shelf"
              class="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
              style="background: rgba(255,255,255,0.05); border: 1px solid var(--border)"
            >
              <option v-for="shelf in shelves" :key="shelf.id" :value="shelf.id">{{ shelf.label }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="fetchPreview"
              :disabled="!form.spotifyInput.trim() || fetching"
              class="px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
              style="background: rgba(255,255,255,0.1); color: white"
            >
              {{ fetching ? 'Fetching…' : 'Preview' }}
            </button>
          </div>
        </div>

        <!-- Error -->
        <p v-if="fetchError" class="text-sm" style="color: #f87171">{{ fetchError }}</p>

        <!-- Preview -->
        <div v-if="preview" class="flex gap-4 p-4 rounded-xl border" style="border-color: var(--border); background: rgba(255,255,255,0.03)">
          <img v-if="preview.cover" :src="preview.cover" :alt="preview.title" class="w-16 h-16 rounded-lg object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-white font-medium">{{ preview.title }}</p>
            <p class="text-sm mt-0.5" style="color: var(--muted)">{{ preview.artist }} · {{ preview.year }}</p>
          </div>
        </div>

        <div v-if="preview">
          <label class="block text-xs mb-1.5" style="color: var(--muted)">One-liner note</label>
          <input
            v-model="form.note"
            type="text"
            placeholder="Why this album is on this shelf…"
            class="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-white/20"
            style="background: rgba(255,255,255,0.05); border: 1px solid var(--border)"
            @keydown.enter="save"
          />
        </div>

        <button
          v-if="preview"
          @click="save"
          :disabled="!form.note.trim() || saving"
          class="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30"
          style="background: white; color: black"
        >
          {{ saving ? 'Saving…' : 'Add to shelf' }}
        </button>
      </div>
    </div>

    <!-- Shelf listing -->
    <div v-for="shelf in shelves" :key="shelf.id" class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-white">{{ shelf.label }}</h2>
        <span class="text-xs" style="color: var(--muted)">{{ shelf.albums.length }} album{{ shelf.albums.length !== 1 ? 's' : '' }}</span>
      </div>

      <div v-if="shelf.albums.length" class="rounded-2xl border overflow-hidden" style="border-color: var(--border)">
        <div
          v-for="album in shelf.albums"
          :key="album.spotifyId"
          class="flex items-center gap-4 px-4 py-3 border-b last:border-b-0"
          style="border-color: var(--border); background: var(--card)"
        >
          <img v-if="album.cover" :src="album.cover" :alt="album.title" class="w-10 h-10 rounded-lg object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium line-clamp-1">{{ album.title }}</p>
            <p class="text-xs mt-0.5 line-clamp-1" style="color: var(--muted)">{{ album.artist }} · {{ album.year }}</p>
            <p v-if="album.note" class="text-xs mt-1 line-clamp-1" style="color: rgba(255,255,255,0.3)">{{ album.note }}</p>
          </div>
          <button
            @click="remove(shelf.id, album)"
            class="shrink-0 text-white/20 hover:text-red-400 transition-colors"
            title="Remove"
          >
            <Trash2 :size="15" />
          </button>
        </div>
      </div>
      <p v-else class="text-xs" style="color: rgba(255,255,255,0.2)">Empty shelf</p>
    </div>
  </div>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next'

if (import.meta.server && process.env.NODE_ENV === 'production') {
  throw createError({ statusCode: 404 })
}

useSeoMeta({ title: 'Music Admin' })

const { data, refresh } = await useAsyncData('admin-music-albums', () => $fetch('/api/music/albums'))
const shelves = computed(() => data.value?.shelves ?? [])

const form = reactive({ spotifyInput: '', shelf: shelves.value[0]?.id ?? '', note: '' })
const preview = ref(null)
const fetching = ref(false)
const saving = ref(false)
const fetchError = ref('')

function parseId(input) {
  if (input.includes('spotify.com/album/')) {
    return input.split('spotify.com/album/')[1].split('?')[0].trim()
  }
  return input.trim()
}

async function fetchPreview() {
  const id = parseId(form.spotifyInput)
  if (!id) return
  fetching.value = true
  fetchError.value = ''
  preview.value = null
  try {
    preview.value = await $fetch(`/api/spotify/album?id=${id}`)
  } catch (e) {
    fetchError.value = e?.data?.message ?? 'Could not fetch album from Spotify.'
  } finally {
    fetching.value = false
  }
}

async function save() {
  if (!preview.value || !form.note.trim()) return
  saving.value = true
  try {
    await $fetch('/api/music/albums', {
      method: 'POST',
      body: { ...preview.value, shelf: form.shelf, note: form.note.trim() },
    })
    form.spotifyInput = ''
    form.note = ''
    preview.value = null
    await refresh()
  } finally {
    saving.value = false
  }
}

async function remove(shelfId, album) {
  if (!confirm(`Remove "${album.title}" from ${shelfId}?`)) return
  await $fetch('/api/music/albums', {
    method: 'DELETE',
    body: { shelf: shelfId, spotifyId: album.spotifyId },
  })
  await refresh()
}
</script>
