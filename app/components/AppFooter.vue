<template>
  <footer class="border-t mt-24" style="border-color: var(--border)">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm" style="color: var(--muted)">
        © {{ new Date().getFullYear() }} Emerson Nunes
      </p>
      <div class="flex items-center gap-6">
        <a
          href="https://github.com/gpEnunes"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm transition-colors hover:text-white"
          style="color: var(--muted)"
        >GitHub</a>
        <a
          href="https://linkedin.com/in/emerson-nunes5"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm transition-colors hover:text-white"
          style="color: var(--muted)"
        >LinkedIn</a>
        <a
          href="mailto:enunes.gp@gmail.com"
          class="text-sm transition-colors hover:text-white"
          style="color: var(--muted)"
        >Email</a>
      </div>
    </div>
  </footer>
</template>
