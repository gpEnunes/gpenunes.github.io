<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b"
    style="background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); border-color: var(--border)"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="text-base font-medium tracking-tight text-white/90 hover:text-white transition-colors">
        Emerson Nunes
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-1.5 text-sm transition-colors"
          :class="$route.path === item.to || $route.path.startsWith(item.to + '/') ? 'text-white' : 'text-white/50 hover:text-white'"
        >
          <component :is="item.icon" :size="15" />
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 text-white/70 hover:text-white transition-colors"
        @click="open = !open"
        aria-label="Toggle menu"
      >
        <X v-if="open" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div
        v-if="open"
        class="md:hidden border-t px-4 pb-4"
        style="border-color: var(--border)"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          @click="open = false"
          class="flex items-center gap-3 py-3 text-sm transition-colors"
          :class="$route.path === item.to ? 'text-white' : 'text-white/50'"
        >
          <component :is="item.icon" :size="17" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { Menu, X, Home, User, Coffee, Pen, Music, Code } from 'lucide-vue-next'

const open = ref(false)

const nav = [
  { to: '/',        label: 'Home',    icon: Home },
  { to: '/about',   label: 'About',   icon: User },
  { to: '/dev',     label: 'Dev',     icon: Code },
  { to: '/music',   label: 'Music',   icon: Music },
  { to: '/writing', label: 'Writing', icon: Pen },
  { to: '/cooking', label: 'Cooking', icon: Coffee },
]
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: opacity 0.15s, transform 0.15s; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
