<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">Stream</p>
    <h1 class="text-4xl font-semibold text-white mb-3">Daily Thoughts</h1>
    <p class="mb-12" style="color: var(--muted)">Life as it happens.</p>
    <div v-if="posts?.length" class="space-y-4">
      <ContentCard
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        :title="post.title"
        :description="post.description"
        :date="formatDate(post.date)"
        section="Thoughts"
      />
    </div>
    <p v-else class="text-white/40">Nothing yet. Coming soon.</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Thoughts — Emerson Nunes', description: 'Daily thoughts and life notes.' })
const { data: posts } = await useAsyncData('thoughts', () => queryCollection('thoughts').order('date', 'DESC').all())
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
