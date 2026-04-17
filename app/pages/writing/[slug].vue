<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <NuxtLink to="/writing" class="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-white" style="color: var(--muted)">
      <ArrowLeft :size="15" /> Back to Writing
    </NuxtLink>
    <template v-if="post">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
        <span v-if="post.readTime" class="text-xs" style="color: var(--muted)">{{ post.readTime }}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-4">{{ post.title }}</h1>
      <p class="text-lg mb-10" style="color: var(--muted)">{{ post.description }}</p>
      <div class="prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
const route = useRoute()
const { data: post } = await useAsyncData(`writing-${route.params.slug}`, () =>
  queryCollection('writing').path(`/writing/${route.params.slug}`).first()
)
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
useSeoMeta({ title: `${post.value.title} — Writing`, description: post.value.description })
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
