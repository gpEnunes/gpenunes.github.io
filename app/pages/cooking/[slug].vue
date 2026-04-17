<template>
  <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <div class="max-w-4xl mx-auto">

      <NuxtLink to="/cooking" class="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 transition-colors hover:text-white" style="color: rgba(255,255,255,0.6)">
        <ArrowLeft :size="16" /> Back to Cooking
      </NuxtLink>

      <template v-if="post">
        <!-- Hero image -->
        <div class="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
          <img
            src="https://images.unsplash.com/photo-1655890193532-3f51318b23c0?w=1200&q=80"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)"></div>
        </div>

        <!-- Header -->
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm" style="color: rgba(255,255,255,0.4)">
            <span>{{ formatDate(post.date) }}</span>
            <span v-if="post.time" class="flex items-center gap-1">
              <Clock :size="14" /> {{ post.time }}
            </span>
            <span v-if="post.servings" class="flex items-center gap-1">
              <Users :size="14" /> {{ post.servings }} servings
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 sm:mb-4 leading-tight">{{ post.title }}</h1>
          <p class="text-lg sm:text-xl" style="color: rgba(255,255,255,0.7)">{{ post.description }}</p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-12">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
            style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6)"
          >
            <Tag :size="12" /> {{ tag }}
          </span>
        </div>

        <!-- Ingredients -->
        <section v-if="post.ingredients?.length" class="mb-12">
          <h2 class="text-2xl font-semibold text-white mb-6">Ingredients</h2>
          <div class="rounded-xl p-6" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)">
            <ul class="space-y-3">
              <li v-for="(ingredient, i) in post.ingredients" :key="i" class="flex items-start gap-3" style="color: rgba(255,255,255,0.8)">
                <span class="w-2 h-2 rounded-full mt-2 shrink-0" style="background: rgba(255,255,255,0.4)"></span>
                <span>{{ ingredient }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Instructions -->
        <section v-if="post.instructions?.length" class="mb-12">
          <h2 class="text-2xl font-semibold text-white mb-6">Instructions</h2>
          <div class="space-y-4">
            <div
              v-for="(step, i) in post.instructions"
              :key="i"
              class="flex gap-4 p-6 rounded-xl"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
            >
              <div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style="background: white; color: black">
                {{ i + 1 }}
              </div>
              <p class="leading-relaxed pt-1" style="color: rgba(255,255,255,0.8)">{{ step }}</p>
            </div>
          </div>
        </section>

        <!-- Prose content (extra notes) -->
        <div v-if="post.body" class="prose prose-invert max-w-none mb-12 text-lg" style="color: rgba(255,255,255,0.7)">
          <ContentRenderer :value="post" />
        </div>

        <!-- More Recipes -->
        <section v-if="otherRecipes?.length" class="pt-12" style="border-top: 1px solid rgba(255,255,255,0.1)">
          <h2 class="text-2xl font-semibold text-white mb-6">More Recipes</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="recipe in otherRecipes"
              :key="recipe.path"
              :to="recipe.path"
              class="group p-4 rounded-xl transition-all hover:border-white/20"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
            >
              <h3 class="text-lg font-medium text-white mb-2 group-hover:text-white/80 transition-colors">{{ recipe.title }}</h3>
              <p class="text-sm" style="color: rgba(255,255,255,0.6)">{{ recipe.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, Clock, Users, Tag } from 'lucide-vue-next'

const route = useRoute()

const [{ data: post }, { data: allRecipes }] = await Promise.all([
  useAsyncData(`cooking-${route.params.slug}`, () =>
    queryCollection('cooking').path(`/cooking/${route.params.slug}`).first()
  ),
  useAsyncData('cooking-all', () =>
    queryCollection('cooking').order('date', 'DESC').all()
  ),
])

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })

const otherRecipes = computed(() =>
  allRecipes.value?.filter(r => r.path !== post.value.path).slice(0, 2) ?? []
)

useSeoMeta({ title: `${post.value.title} — Cooking`, description: post.value.description })

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
