<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p
      class="text-xs font-semibold uppercase tracking-widest mb-4"
      style="color: rgba(255, 255, 255, 0.4)"
    >
      {{ $t('about.label') }}
    </p>
    <h1
      class="text-5xl sm:text-6xl font-bold mb-6 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
    >
      Emerson Nunes
    </h1>
    <p class="text-lg mb-12" style="color: var(--muted)">
      {{ $t('about.subtitle') }}
    </p>

    <!-- 2-image grid -->
    <div class="grid grid-cols-2 gap-3 mb-14">
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="/banner-1.jpg"
          :alt="$t('about.img_city')"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
      <div class="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src="/banner-2.jpg"
          :alt="$t('about.img_nature')"
          class="w-full h-full object-cover opacity-75"
        />
      </div>
    </div>

    <!-- Bio -->
    <div
      class="space-y-5 mb-10 text-lg leading-relaxed"
      style="color: var(--muted)"
    >
      <p>{{ $t('about.bio_1') }}</p>
      <p>{{ $t('about.bio_2') }}</p>
      <p>{{ $t('about.bio_3') }}</p>
    </div>

    <!-- Blockquote -->
    <blockquote
      class="border-l-2 pl-6 py-1 mb-14"
      style="border-color: rgba(255, 255, 255, 0.15)"
    >
      <p
        class="text-xl italic leading-relaxed"
        style="color: rgba(255, 255, 255, 0.5)"
      >
        "{{ $t('about.quote') }}"
      </p>
    </blockquote>

    <!-- CV Download -->
    <button
      @click="modalOpen = true"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
      style="background: white; color: black"
    >
      <Download :size="15" />
      {{ $t('about.request_cv') }}
    </button>

    <CVRequestModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<script setup>
import { Download } from 'lucide-vue-next'

const { t } = useI18n()

useSeoMeta({
  title: computed(() => t('about.seo_title')),
  description: computed(() => t('about.seo_description')),
})
useHead({ link: [{ rel: 'canonical', href: 'https://enunes.net/about' }] })

const modalOpen = ref(false)
</script>
