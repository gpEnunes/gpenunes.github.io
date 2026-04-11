<template>
  <section id="experience" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="space-y-12">
      <!-- Heading -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--accent2)">Career</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white">Work Experience</h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
          style="background: linear-gradient(to bottom, var(--accent1), var(--accent3))"
          aria-hidden="true"
        ></div>

        <div class="space-y-10">
          <div
            v-for="(job, i) in jobs"
            :key="i"
            class="relative sm:pl-10"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full hidden sm:block -translate-x-[4px]"
              style="background: var(--accent1); box-shadow: 0 0 8px var(--accent1)"
              aria-hidden="true"
            ></div>

            <div
              class="p-6 rounded-xl border transition-colors"
              style="border-color: rgba(255,255,255,0.07); background: rgba(255,255,255,0.03)"
            >
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                <div>
                  <h3 class="text-base font-semibold text-white">{{ job.role }}</h3>
                  <p class="text-sm" style="color: var(--accent3)">{{ job.company }}</p>
                </div>
                <span
                  class="self-start sm:self-center text-xs px-2.5 py-1 rounded-full border font-mono"
                  style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.03)"
                >
                  {{ job.period }}
                </span>
              </div>

              <!-- Bullets -->
              <ul class="space-y-1.5">
                <li
                  v-for="(bullet, j) in job.bullets"
                  :key="j"
                  class="flex items-start gap-2 text-sm text-gray-400"
                >
                  <span class="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style="background: var(--accent2)" aria-hidden="true"></span>
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const jobs = [
  {
    role: 'Fullstack Developer — Automation',
    company: 'Notify AI',
    period: '2024 – 2025',
    bullets: [
      'CRM API integrations for marketing campaign automation.',
      'AI-driven notification timing optimisation.',
      'Reusable automation libraries — reduced code duplication by ~40%.',
      'CSV reports and performance analytics dashboards.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'md3 Software Solutions',
    period: '2021 – 2024',
    bullets: [
      'Journalism platform with content-similarity analysis engine.',
      'Public-sector applications with rigorous unit testing.',
      'Vue.js + Nuxt.js frontends consuming complex REST APIs.',
      'Agile collaboration across multidisciplinary teams.',
    ],
  },
  {
    role: 'Fullstack Developer & Co-Founder',
    company: 'Merkat',
    period: '2021',
    bullets: [
      'Full-stack platform built with Laravel + Vue.js from scratch.',
      'End-to-end development cycle — architecture to production.',
      'Scalable database design and deployment.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'CH Group',
    period: '2019 – 2020',
    bullets: [
      'Figma designs to responsive frontends (HTML5 / CSS3 / JS).',
      'PHP / CodeIgniter MVC backend development.',
      'Institutional websites and market-simulation tools.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'Incograf',
    period: '2018 – 2019',
    bullets: [
      'Responsive websites and web applications (HTML / CSS / JS).',
      'Internal platform maintenance and feature work.',
      'Web design projects and emerging technology integration.',
      'First professional experience in web development.',
    ],
  },
]
</script>
