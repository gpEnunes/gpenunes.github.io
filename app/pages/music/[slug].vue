<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <NuxtLink to="/music" class="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-white" style="color: var(--muted)">
      <ArrowLeft :size="15" /> Back to Music
    </NuxtLink>
    <template v-if="post">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span v-if="post.genre" class="text-xs px-2 py-0.5 rounded-full" style="background: rgba(255,255,255,0.06); color: var(--muted)">{{ post.genre }}</span>
        <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-2">{{ post.title }}</h1>
      <p v-if="post.artist" class="text-lg mb-4" style="color: var(--muted)">{{ post.artist }}</p>
      <div v-if="post.image" class="rounded-xl overflow-hidden mb-10 max-w-sm">
        <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
      </div>
      <div class="prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
const route = useRoute()
const { data: post } = await useAsyncData(`music-${route.params.slug}`, () =>
  queryCollection('music').path(`/music/${route.params.slug}`).first()
)
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
useSeoMeta({ title: `${post.value.title} — Music`, description: post.value.description })
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
