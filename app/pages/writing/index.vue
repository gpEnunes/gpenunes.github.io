<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: #00e5a8">Words</p>
    <h1 class="text-4xl font-semibold text-white mb-3">Writing</h1>
    <p class="mb-12" style="color: var(--muted)">Essays, notes and things I felt like putting into words.</p>
    <div v-if="posts?.length" class="space-y-4">
      <ContentCard
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        :title="post.title"
        :description="post.description"
        :date="formatDate(post.date)"
        section="Writing"
        :read-time="post.readTime"
        :tags="post.tags"
      />
    </div>
    <p v-else class="text-white/40">No posts yet. Coming soon.</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Writing — Emerson Nunes', description: 'Essays and notes.' })
const { data: posts } = await useAsyncData('writing', () => queryCollection('writing').order('date', 'DESC').all())
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
