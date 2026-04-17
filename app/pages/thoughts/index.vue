<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Stream</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Daily Thoughts
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">Life as it happens.</p>

    <!-- Hero image -->
    <div class="relative rounded-2xl overflow-hidden mb-14 aspect-[21/9]">
      <img
        src="https://images.unsplash.com/photo-1667388455386-a5d0e19da85c?w=1200&q=80"
        alt="Thoughts"
        class="w-full h-full object-cover opacity-50"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)"></div>
    </div>

    <!-- Timeline -->
    <div v-if="posts?.length" class="relative">
      <!-- Vertical line -->
      <div class="absolute left-0 top-2 bottom-2 w-px" style="background: rgba(255,255,255,0.1)"></div>

      <div class="space-y-10 pl-8">
        <div v-for="post in posts" :key="post.path" class="relative">
          <!-- Timeline dot -->
          <div class="absolute -left-8 top-1.5 w-2 h-2 rounded-full border" style="border-color: rgba(255,255,255,0.3); background: var(--background)"></div>

          <NuxtLink :to="post.path" class="group block">
            <span class="text-xs mb-2 block" style="color: var(--muted)">{{ formatDate(post.date) }}</span>
            <h2 class="text-lg font-semibold text-white mb-2 group-hover:text-white/80 transition-colors">{{ post.title }}</h2>
            <p class="leading-relaxed mb-3 line-clamp-3" style="color: var(--muted)">{{ post.description }}</p>
            <div v-if="post.mood" class="flex flex-wrap gap-1.5">
              <span class="text-xs px-2.5 py-0.5 rounded-full" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4)">#{{ post.mood }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <p v-else class="text-white/40">Nothing yet. Coming soon.</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Thoughts — Emerson Nunes', description: 'Daily thoughts and life notes.' })

const { data: posts } = await useAsyncData('thoughts', () =>
  queryCollection('thoughts').order('date', 'DESC').all()
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
