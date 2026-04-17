<template>
  <section id="about" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="space-y-12">
      <!-- Heading -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--accent2)">About me</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-5">Fullstack Developer</h2>
        <p class="text-gray-400 max-w-2xl leading-relaxed">
          Fullstack Developer with 5+ years of experience in Laravel, Vue.js, Nuxt.js and complex API/CRM integrations.
          Specialised in marketing automation, internal tooling and B2B applications.
          Currently open to mid-senior opportunities in Fullstack, Backend or Frontend Development across Europe.
        </p>
      </div>

      <!-- Stack grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="stack in stacks"
          :key="stack.label"
          class="p-5 rounded-xl border transition-colors"
          style="border-color: rgba(255,255,255,0.07); background: rgba(255,255,255,0.03)"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">{{ stack.icon }}</span>
            <h3 class="text-sm font-semibold text-white">{{ stack.label }}</h3>
          </div>
          <ul class="space-y-1">
            <li
              v-for="item in stack.items"
              :key="item"
              class="text-sm text-gray-400"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Relocation notice -->
      <div
        class="flex items-start gap-3 p-4 rounded-xl border"
        style="border-color: rgba(124,92,255,0.25); background: rgba(124,92,255,0.06)"
      >
        <span class="text-base mt-0.5" aria-hidden="true">📍</span>
        <p class="text-sm text-gray-300">
          Based in <strong class="text-white">Portugal</strong> &mdash; open to relocation within Europe for the right opportunity.
          Available for remote, hybrid or on-site roles.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const stacks = [
  {
    label: 'Backend',
    icon: '⚙️',
    items: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'CodeIgniter'],
  },
  {
    label: 'Frontend',
    icon: '🖥️',
    items: ['Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript', 'SCSS', 'HTML5 / CSS3'],
  },
  {
    label: 'DevOps',
    icon: '🔧',
    items: ['Git', 'CI / CD', 'Unit Testing', 'Linux'],
  },
  {
    label: 'Other',
    icon: '🛠️',
    items: ['Scrum / Agile', 'Figma', 'WordPress', 'API Integrations'],
  },
]
</script>
