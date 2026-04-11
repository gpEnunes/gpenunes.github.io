<template>
  <section id="portfolio" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="space-y-12">
      <!-- Heading -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--accent2)">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">Projects</h2>
      </div>

      <!-- Coming soon card -->
      <div
        class="relative overflow-hidden rounded-2xl border flex flex-col items-center justify-center py-20 px-6 text-center"
        style="border-color: rgba(124,92,255,0.2); background: rgba(124,92,255,0.04)"
      >
        <!-- Glow rings (purely decorative) -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div class="ring" style="--size: 320px; --color: rgba(124,92,255,0.07)"></div>
          <div class="ring ring--2" style="--size: 480px; --color: rgba(41,164,255,0.05)"></div>
          <div class="ring ring--3" style="--size: 640px; --color: rgba(0,229,168,0.04)"></div>
        </div>

        <!-- Icon -->
        <div class="relative mb-8">
          <!-- Pulsing glow behind icon -->
          <div
            class="absolute inset-0 rounded-full blur-2xl scale-150 opacity-40"
            style="background: radial-gradient(circle, var(--accent1), transparent 70%)"
            aria-hidden="true"
          ></div>
          <div
            class="relative w-20 h-20 rounded-2xl flex items-center justify-center border"
            style="border-color: rgba(124,92,255,0.3); background: rgba(124,92,255,0.1)"
          >
            <!-- Telescope / code icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-9 h-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="url(#grad)"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7c5cff"/>
                  <stop offset="50%" stop-color="#29a4ff"/>
                  <stop offset="100%" stop-color="#00e5a8"/>
                </linearGradient>
              </defs>
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
          </div>
        </div>

        <!-- Text -->
        <h3
          class="text-2xl sm:text-3xl font-bold mb-3"
          style="background: var(--brand); -webkit-background-clip: text; background-clip: text; color: transparent"
        >
          Coming Soon
        </h3>
        <p class="text-gray-400 max-w-md mb-6 text-sm sm:text-base leading-relaxed">
          I'm currently working on projects in private repositories.
          Public showcases are on their way — stay tuned.
        </p>

        <!-- Subtle progress dots -->
        <div class="flex items-center gap-2" aria-hidden="true">
          <span class="w-2 h-2 rounded-full dot--1" style="background: var(--accent1)"></span>
          <span class="w-2 h-2 rounded-full dot--2" style="background: var(--accent3)"></span>
          <span class="w-2 h-2 rounded-full dot--3" style="background: var(--accent2)"></span>
        </div>

        <!-- GitHub link -->
        <a
          href="https://github.com/gpEnunes"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:scale-105"
          style="border-color: rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.04)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          github.com/gpEnunes
        </a>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
/* Animated glow rings */
.ring {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 1px solid var(--color);
  animation: ring-pulse 4s ease-in-out infinite;
}
.ring--2 { animation-delay: 1.3s; animation-duration: 5s; }
.ring--3 { animation-delay: 2.6s; animation-duration: 6s; }

@keyframes ring-pulse {
  0%, 100% { transform: scale(0.95); opacity: 0.5; }
  50%       { transform: scale(1.05); opacity: 1; }
}

/* Bouncing dots */
.dot--1, .dot--2, .dot--3 {
  animation: dot-bounce 1.4s ease-in-out infinite;
}
.dot--2 { animation-delay: 0.2s; }
.dot--3 { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
  40%           { transform: translateY(-6px); opacity: 1; }
}
</style>
