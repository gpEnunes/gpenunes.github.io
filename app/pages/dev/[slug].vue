<template>
  <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <div class="max-w-3xl mx-auto">

      <NuxtLink to="/dev" class="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 transition-colors hover:text-white" style="color: rgba(255,255,255,0.6)">
        <ArrowLeft :size="16" /> Back to Dev
      </NuxtLink>

      <template v-if="post">
        <!-- Header -->
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span v-if="post.category" class="px-3 py-1 rounded-full text-xs sm:text-sm" style="background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6)">
              {{ post.category }}
            </span>
            <span class="text-xs sm:text-sm" style="color: rgba(255,255,255,0.4)">{{ formatDate(post.date) }}</span>
            <span v-if="post.readTime" class="text-xs sm:text-sm" style="color: rgba(255,255,255,0.4)">{{ post.readTime }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight">{{ post.title }}</h1>
          <p class="text-lg sm:text-xl" style="color: rgba(255,255,255,0.7)">{{ post.description }}</p>
        </div>

        <!-- Tags + divider -->
        <div class="flex flex-wrap gap-2 mb-12 pb-12" style="border-bottom: 1px solid rgba(255,255,255,0.1)">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
            style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6)"
          >
            <Tag :size="12" /> {{ tag }}
          </span>
        </div>

        <!-- Content -->
        <article class="prose prose-invert max-w-none mb-16 prose-p:text-lg prose-p:text-white/80 prose-p:leading-relaxed prose-headings:text-white prose-strong:text-white prose-code:text-white/90 prose-li:text-white/80">
          <ContentRenderer :value="post" />
        </article>

        <!-- More Dev Posts -->
        <section v-if="morePosts?.length" class="pt-12" style="border-top: 1px solid rgba(255,255,255,0.1)">
          <h2 class="text-2xl font-semibold text-white mb-6">More Dev Posts</h2>
          <div class="space-y-4">
            <NuxtLink
              v-for="other in morePosts"
              :key="other.path"
              :to="other.path"
              class="group block p-6 rounded-xl transition-all hover:border-white/20"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
            >
              <div class="flex items-center gap-3 mb-2">
                <span v-if="other.category" class="text-sm" style="color: rgba(255,255,255,0.4)">{{ other.category }}</span>
                <span v-if="other.category" style="color: rgba(255,255,255,0.2)">•</span>
                <span class="text-sm" style="color: rgba(255,255,255,0.4)">{{ formatDate(other.date) }}</span>
              </div>
              <h3 class="text-xl font-medium text-white mb-2 group-hover:text-white/80 transition-colors">{{ other.title }}</h3>
              <p class="text-sm" style="color: rgba(255,255,255,0.6)">{{ other.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, Tag } from 'lucide-vue-next'

const route = useRoute()

const [{ data: post }, { data: allPosts }] = await Promise.all([
  useAsyncData(`dev-${route.params.slug}`, () =>
    queryCollection('dev').path(`/dev/${route.params.slug}`).first()
  ),
  useAsyncData('dev-all', () =>
    queryCollection('dev').order('date', 'DESC').all()
  ),
])

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })

const morePosts = computed(() =>
  allPosts.value?.filter(p => p.path !== post.value.path).slice(0, 3) ?? []
)

const canonicalUrl = `https://enunes.net${post.value.path}`
useSeoMeta({
  title: `${post.value.title} — Dev`,
  description: post.value.description,
  ogTitle: `${post.value.title} — Dev`,
  ogDescription: post.value.description,
  ogImage: 'https://enunes.net/og-image.png',
  ogUrl: canonicalUrl,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://enunes.net/og-image.png',
})
useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: post.value.title,
      description: post.value.description,
      datePublished: post.value.date,
      author: { '@type': 'Person', name: 'Emerson Nunes', url: 'https://enunes.net' },
      url: canonicalUrl,
    }),
  }],
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
