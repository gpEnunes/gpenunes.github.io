<template>
  <section id="portfolio" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="space-y-12">
      <!-- Heading -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--accent2)">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">Projects</h2>
      </div>

      <!-- Project cards grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.title"
          class="group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02]"
          style="border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.03)"
        >
          <!-- Hover glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            :style="{ boxShadow: `0 0 30px -8px ${project.accentColor}` }"
            aria-hidden="true"
          ></div>

          <!-- Header: icon + title -->
          <div class="relative flex items-center gap-4 mb-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
              :style="{ borderColor: `${project.accentColor}33`, background: `${project.accentColor}14` }"
            >
              <img
                v-if="project.favicon"
                :src="project.favicon"
                :alt="`${project.title} icon`"
                class="h-7 w-7 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-white leading-snug">{{ project.title }}</h3>
          </div>

          <!-- Description -->
          <p class="relative text-sm leading-relaxed mb-5 flex-1" style="color: var(--muted)">
            {{ project.description }}
          </p>

          <!-- Tech tags -->
          <div class="relative flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style="background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.08)"
            >{{ tag }}</span>
          </div>

          <!-- Links -->
          <div class="relative flex items-center gap-3 flex-wrap">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              :style="{ background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live
            </a>

            <button
              v-if="project.privateRepo"
              @click="openModal(project)"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer"
              style="border: 1px solid rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Request Repository Access
            </button>

            <a
              v-else-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style="border: 1px solid rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Repo
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Access Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modal.open"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background: rgba(0,0,0,0.7); backdrop-filter: blur(4px)"
          @click.self="closeModal"
        >
          <div
            class="relative w-full max-w-md rounded-2xl border p-8"
            style="background: var(--panel); border-color: rgba(255,255,255,0.1)"
          >
            <!-- Close -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style="color: var(--muted)"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Header -->
            <div class="mb-6">
              <p class="text-xs font-semibold uppercase tracking-widest mb-1" style="color: var(--accent2)">{{ modal.project?.title }}</p>
              <h3 class="text-xl font-bold text-white">Request Repository Access</h3>
              <p class="text-sm mt-1" style="color: var(--muted)">Fill in your details and I'll get back to you as soon as possible.</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitRequest" class="space-y-4" novalidate>
              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">Name <span style="color: var(--accent1)">*</span></label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  class="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text)"
                  :style="errors.name ? { borderColor: '#f87171' } : {}"
                />
                <p v-if="errors.name" class="text-xs mt-1" style="color: #f87171">{{ errors.name }}</p>
              </div>

              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">Email <span style="color: var(--accent1)">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  class="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text)"
                  :style="errors.email ? { borderColor: '#f87171' } : {}"
                />
                <p v-if="errors.email" class="text-xs mt-1" style="color: #f87171">{{ errors.email }}</p>
              </div>

              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">GitHub Username <span style="color: var(--accent1)">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style="color: var(--muted)">@</span>
                  <input
                    v-model="form.github"
                    type="text"
                    placeholder="janesmithdev"
                    required
                    class="w-full rounded-lg pl-7 pr-3 py-2.5 text-sm outline-none transition-colors"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text)"
                    :style="errors.github ? { borderColor: '#f87171' } : {}"
                  />
                </div>
                <p v-if="errors.github" class="text-xs mt-1" style="color: #f87171">{{ errors.github }}</p>
              </div>

              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">Message <span class="text-xs" style="color: rgba(145,160,176,0.5)">(optional)</span></label>
                <textarea
                  v-model="form.message"
                  placeholder="Tell me a bit about yourself or why you'd like access..."
                  rows="3"
                  class="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors resize-none"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text)"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="status === 'loading'"
                class="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                style="background: linear-gradient(135deg, var(--accent1), var(--accent3))"
              >
                <span v-if="status === 'loading'">Sending…</span>
                <span v-else>Send Request</span>
              </button>

              <p v-if="status === 'success'" class="text-sm text-center" style="color: var(--accent2)">
                Request sent! I'll be in touch soon.
              </p>
              <p v-if="status === 'error'" class="text-sm text-center" style="color: #f87171">
                Something went wrong. Please try again or email me directly.
              </p>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'LeadFlow',
    description:
      'Marketing automation platform built on Event-Driven Architecture. Handles lead ingestion, atomic score calculation via Redis queues, and a real-time dashboard with WebSocket updates.',
    favicon: '/leadflow-favicon.svg',
    tags: ['Laravel 13', 'Vue.js 3', 'Redis', 'MySQL', 'WebSockets', 'PHP 8.4'],
    url: 'https://leadflow.enunes.net',
    repo: null,
    privateRepo: true,
    accentColor: '#4F46E5',
  },
]

const modal = reactive({ open: false, project: null })
const status = ref(null) // null | 'loading' | 'success' | 'error'
const form = reactive({ name: '', email: '', github: '', message: '' })
const errors = reactive({ name: '', email: '', github: '' })

function openModal(project) {
  modal.project = project
  modal.open = true
  status.value = null

  if (typeof gtag !== 'undefined') {
    gtag('event', 'repo_access_request_open', {
      project_title: project.title,
    })
  }
}

function closeModal() {
  modal.open = false
  Object.assign(form, { name: '', email: '', github: '', message: '' })
  Object.assign(errors, { name: '', email: '', github: '' })
  status.value = null
}

function validate() {
  let valid = true
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email is required.'
  errors.github = form.github.trim() ? '' : 'GitHub username is required.'
  if (errors.name || errors.email || errors.github) valid = false
  return valid
}

async function submitRequest() {
  if (!validate()) return
  status.value = 'loading'

  try {
    await $fetch('/api/request-access', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        github: form.github.trim(),
        message: form.message.trim(),
        project: modal.project?.title,
      },
    })

    status.value = 'success'

    if (typeof gtag !== 'undefined') {
      gtag('event', 'repo_access_request_submit', {
        project_title: modal.project?.title,
        github_username: form.github.trim(),
      })
    }
  } catch {
    status.value = 'error'
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}
.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
