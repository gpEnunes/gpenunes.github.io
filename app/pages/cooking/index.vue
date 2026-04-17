<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">Kitchen</p>
    <h1 class="text-4xl font-semibold text-white mb-3">Cooking</h1>
    <p class="mb-12" style="color: var(--muted)">Experiments, recipes and things I ate at 2am.</p>

    <div v-if="posts?.length" class="grid sm:grid-cols-2 gap-5">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="group block rounded-xl border overflow-hidden transition-all hover:border-white/20"
        style="border-color: var(--border); background: var(--card)"
      >
        <div v-if="post.image" class="aspect-[16/9] overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
            <span v-if="post.time" style="color: rgba(255,255,255,0.15)">•</span>
            <span v-if="post.time" class="text-xs" style="color: var(--muted)">{{ post.time }}</span>
          </div>
          <h2 class="font-medium text-white mb-1.5 group-hover:text-white/80 transition-colors">{{ post.title }}</h2>
          <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 rounded-full text-xs" style="background: rgba(255,255,255,0.06); color: var(--muted)">{{ tag }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-white/40">No recipes yet. Coming soon.</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Cooking — Emerson Nunes', description: 'Recipes and kitchen experiments.' })

const { data: posts } = await useAsyncData('cooking', () => queryCollection('cooking').order('date', 'DESC').all())
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
