<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Kitchen</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Cooking
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">Experiments, recipes and things I ate at 2am.</p>

    <div v-if="posts?.length" class="grid sm:grid-cols-2 gap-5">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        class="group block rounded-2xl border overflow-hidden transition-all hover:border-white/20"
        style="border-color: var(--border); background: var(--card)"
      >
        <!-- Image with gradient overlay -->
        <div class="relative aspect-[16/9] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1655890193532-3f51318b23c0?w=800&q=80"
            :alt="post.title"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"></div>
          <!-- Tags overlay top-left -->
          <div v-if="post.tags?.length" class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span
              v-for="tag in post.tags.slice(0,2)"
              :key="tag"
              class="px-2 py-0.5 rounded-full text-xs font-medium"
              style="background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.8)"
            >{{ tag }}</span>
          </div>
          <!-- Meta icons bottom-left -->
          <div class="absolute bottom-3 left-3 flex items-center gap-3">
            <span v-if="post.time" class="flex items-center gap-1 text-xs text-white/70">
              <Clock :size="12" /> {{ post.time }}
            </span>
            <span v-if="post.servings" class="flex items-center gap-1 text-xs text-white/70">
              <Users :size="12" /> {{ post.servings }}
            </span>
          </div>
        </div>

        <!-- Card body -->
        <div class="p-5">
          <h2 class="font-semibold text-white mb-1.5 group-hover:text-white/80 transition-colors">{{ post.title }}</h2>
          <p class="text-sm line-clamp-2" style="color: var(--muted)">{{ post.description }}</p>
        </div>
      </NuxtLink>
    </div>

    <p v-else class="text-white/40">No recipes yet. Coming soon.</p>
  </div>
</template>

<script setup>
import { Clock, Users } from 'lucide-vue-next'

useSeoMeta({ title: 'Cooking — Emerson Nunes', description: 'Recipes and kitchen experiments.' })

const { data: posts } = await useAsyncData('cooking', () =>
  queryCollection('cooking').order('date', 'DESC').all()
)
</script>
