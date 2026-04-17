<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <NuxtLink to="/dev" class="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-white" style="color: var(--muted)">
      <ArrowLeft :size="15" /> Back to Dev
    </NuxtLink>
    <template v-if="post">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
        <span v-if="post.readTime" class="text-xs" style="color: var(--muted)">{{ post.readTime }}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-4">{{ post.title }}</h1>
      <p class="text-lg mb-4" style="color: var(--muted)">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mb-10">
        <span v-for="tag in post.tags" :key="tag" class="px-2.5 py-0.5 rounded-full text-xs" style="background: rgba(255,255,255,0.06); color: var(--muted)">{{ tag }}</span>
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
const { data: post } = await useAsyncData(`dev-${route.params.slug}`, () =>
  queryCollection('dev').path(`/dev/${route.params.slug}`).first()
)
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
useSeoMeta({ title: `${post.value.title} — Dev`, description: post.value.description })
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
