<template>
  <Transition name="banner">
    <div
      v-if="consent === null"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
    >
      <div
        class="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 rounded-2xl border shadow-2xl"
        style="
          background: rgba(11,15,20,0.97);
          border-color: rgba(124,92,255,0.25);
          backdrop-filter: blur(16px);
          box-shadow: 0 -4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,255,0.1);
        "
      >
        <!-- Icon + text -->
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <span class="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">🍪</span>
          <div>
            <p class="text-sm font-semibold text-white mb-0.5">This site uses cookies</p>
            <p class="text-xs leading-relaxed" style="color: var(--muted)">
              I use Google Analytics to understand how visitors find this portfolio — no personal data is sold or shared.
              You can decline and the site still works fully.
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            @click="decline"
            class="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: transparent"
          >
            Decline
          </button>
          <button
            @click="accept"
            class="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style="background: var(--accent1)"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { consent, accept, decline } = useConsent()
</script>

<style scoped>
.banner-enter-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
.banner-leave-active {
  transition: transform 0.25s ease-in, opacity 0.25s ease-in;
}
.banner-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
