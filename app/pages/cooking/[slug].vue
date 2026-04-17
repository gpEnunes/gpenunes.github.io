<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <NuxtLink to="/cooking" class="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-white" style="color: var(--muted)">
      <ArrowLeft :size="15" /> Back to Cooking
    </NuxtLink>

    <template v-if="post">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
        <span v-if="post.time" class="text-xs" style="color: var(--muted)">⏱ {{ post.time }}</span>
        <span v-if="post.servings" class="text-xs" style="color: var(--muted)">🍽 {{ post.servings }} servings</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-4">{{ post.title }}</h1>
      <p class="text-lg mb-8" style="color: var(--muted)">{{ post.description }}</p>
      <div v-if="post.image" class="rounded-xl overflow-hidden mb-10 aspect-[16/9]">
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
const { data: post } = await useAsyncData(`cooking-${route.params.slug}`, () =>
  queryCollection('cooking').path(`/cooking/${route.params.slug}`).first()
)

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })

useSeoMeta({ title: `${post.value.title} — Cooking`, description: post.value.description })
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
