<template>
  <header
    class="sticky top-0 z-40 backdrop-blur border-b"
    style="background: rgba(11,15,20,0.75); border-color: rgba(124,92,255,0.15)"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <!-- Brand -->
        <a
          :href="route.name === 'index' ? '#home' : '/'"
          class="font-bold text-sm tracking-tight"
          style="background: var(--brand); -webkit-background-clip: text; background-clip: text; color: transparent"
        >
          enunes.net
        </a>

        <!-- Desktop nav -->
        <nav
          class="hidden md:flex items-center space-x-1"
          aria-label="Main navigation"
        >
          <a
            v-for="link in links"
            :key="link.id"
            :href="(route.name === 'index' ? '#' : '/#') + link.id"
            class="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
            style="color: var(--muted)"
            @mouseenter="(e) => e.target.style.color = 'var(--text)'"
            @mouseleave="(e) => e.target.style.color = 'var(--muted)'"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-md"
          @click="open = !open"
          :aria-expanded="open"
          aria-label="Toggle menu"
          style="color: var(--text)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div
        v-if="open"
        class="md:hidden border-t"
        style="border-color: rgba(255,255,255,0.05); background: rgba(11,15,20,0.95)"
      >
        <div class="px-4 py-3 space-y-0.5">
          <a
            v-for="link in links"
            :key="link.id"
            :href="(route.name === 'index' ? '#' : '/#') + link.id"
            class="block text-sm font-medium px-3 py-2.5 rounded-md"
            style="color: var(--muted)"
            @click="open = false"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
const route = useRoute()

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'contacts', label: 'Contact' },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
