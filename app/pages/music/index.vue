<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">Sounds</p>
    <h1 class="text-4xl font-semibold text-white mb-3">Music</h1>
    <p class="mb-12" style="color: var(--muted)">Rock n' roll is in my blood.</p>
    <div v-if="posts?.length" class="grid sm:grid-cols-2 gap-5">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="group block rounded-xl border overflow-hidden transition-all hover:border-white/20"
        style="border-color: var(--border); background: var(--card)"
      >
        <div v-if="post.image" class="aspect-square overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span v-if="post.genre" class="text-xs px-2 py-0.5 rounded-full" style="background: rgba(255,255,255,0.06); color: var(--muted)">{{ post.genre }}</span>
            <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
          </div>
          <h2 class="font-medium text-white mb-1 group-hover:text-white/80 transition-colors">{{ post.title }}</h2>
          <p v-if="post.artist" class="text-sm mb-1" style="color: var(--muted)">{{ post.artist }}</p>
          <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-white/40">No posts yet. Coming soon.</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Music — Emerson Nunes', description: 'Rock music, albums and sounds.' })
const { data: posts } = await useAsyncData('music', () => queryCollection('music').order('date', 'DESC').all())
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
