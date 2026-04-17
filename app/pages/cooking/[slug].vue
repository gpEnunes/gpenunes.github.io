<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-20">
    <NuxtLink to="/cooking" class="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-white" style="color: var(--muted)">
      <ArrowLeft :size="15" /> Back to Cooking
    </NuxtLink>

    <template v-if="post">
      <!-- Hero image -->
      <div class="relative rounded-2xl overflow-hidden mb-8 aspect-[21/9]">
        <img
          src="https://images.unsplash.com/photo-1655890193532-3f51318b23c0?w=1200&q=80"
          :alt="post.title"
          class="w-full h-full object-cover opacity-80"
        />
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)"></div>
      </div>

      <!-- Meta -->
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <span class="text-xs" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
        <span v-if="post.time" class="flex items-center gap-1.5 text-xs" style="color: var(--muted)">
          <Clock :size="12" /> {{ post.time }}
        </span>
        <span v-if="post.servings" class="flex items-center gap-1.5 text-xs" style="color: var(--muted)">
          <Users :size="12" /> {{ post.servings }} servings
        </span>
      </div>

      <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-3">{{ post.title }}</h1>
      <p class="text-lg mb-6" style="color: var(--muted)">{{ post.description }}</p>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mb-10">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-2.5 py-0.5 rounded-full text-xs"
          style="background: rgba(255,255,255,0.06); color: var(--muted)"
        >{{ tag }}</span>
      </div>

      <!-- Content -->
      <div class="prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ArrowLeft, Clock, Users } from 'lucide-vue-next'

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
