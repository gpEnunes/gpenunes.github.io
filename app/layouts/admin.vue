<template>
  <div class="min-h-screen" style="background: var(--bg)">
    <nav class="sticky top-0 z-10 border-b px-6 py-3 flex items-center gap-2 flex-wrap" style="border-color: var(--border); background: rgba(10,10,10,0.95); backdrop-filter: blur(12px)">
      <span class="text-xs font-semibold uppercase tracking-widest mr-2" style="color: rgba(255,255,255,0.25)">Admin</span>
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        :class="$route.path === link.to ? 'bg-white text-black' : 'text-white/50 hover:text-white hover:bg-white/10'"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink to="/" class="ml-auto text-xs transition-colors hover:text-white" style="color: rgba(255,255,255,0.25)">
        ← Site
      </NuxtLink>
    </nav>
    <slot />
  </div>
</template>

<script setup>
const links = [
  { to: '/admin/cooking', label: 'Cooking' },
  { to: '/admin/writing', label: 'Writing' },
  { to: '/admin/dev', label: 'Dev' },
  { to: '/admin/thoughts', label: 'Thoughts' },
  { to: '/admin/music', label: 'Music' },
]
</script>
