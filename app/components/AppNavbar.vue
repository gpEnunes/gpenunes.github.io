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
          :to="localePath(item.to)"
          class="flex items-center gap-1.5 text-sm transition-colors"
          :class="isActive(item.to) ? 'text-white' : 'text-white/50 hover:text-white'"
        >
          <component :is="item.icon" :size="15" />
          {{ $t(item.label) }}
        </NuxtLink>

        <!-- Language switcher -->
        <div class="flex items-center gap-0.5 text-xs font-mono border rounded-lg overflow-hidden" style="border-color: var(--border)">
          <NuxtLink
            v-for="loc in locales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="px-2 py-1 transition-colors uppercase"
            :class="locale === loc.code ? 'bg-white text-black' : 'text-white/40 hover:text-white/70'"
          >{{ loc.code }}</NuxtLink>
        </div>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 text-white/70 hover:text-white transition-colors"
        @click="open = !open"
        :aria-label="$t('nav.menu_toggle')"
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
          :to="localePath(item.to)"
          @click="open = false"
          class="flex items-center gap-3 py-3 text-sm transition-colors"
          :class="isActive(item.to) ? 'text-white' : 'text-white/50'"
        >
          <component :is="item.icon" :size="17" />
          {{ $t(item.label) }}
        </NuxtLink>

        <!-- Mobile language switcher -->
        <div class="flex items-center gap-2 pt-3 border-t mt-1" style="border-color: var(--border)">
          <NuxtLink
            v-for="loc in locales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            @click="open = false"
            class="text-xs font-mono uppercase px-2.5 py-1 rounded-lg transition-colors"
            :class="locale === loc.code ? 'bg-white text-black' : 'text-white/40 hover:text-white/70'"
          >{{ loc.code }}</NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { Menu, X, Home, User, Pen, Code } from 'lucide-vue-next'

const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const open = ref(false)

function isActive(to) {
  const resolved = localePath(to)
  // Home needs exact match only — startsWith('/') would match everything,
  // and in PT mode startsWith('/pt/') would match all PT routes.
  if (to === '/') return route.path === resolved
  return route.path === resolved || route.path.startsWith(resolved + '/')
}

const nav = [
  { to: '/',        label: 'nav.home',    icon: Home },
  { to: '/dev',     label: 'nav.dev',     icon: Code },
  { to: '/about',   label: 'nav.about',   icon: User },
  { to: '/blog', label: 'nav.writing', icon: Pen },
]
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: opacity 0.15s, transform 0.15s; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
