<template>
  <div class="min-h-screen" style="background: var(--background); color: #fff">
    <AppNavbar />
    <main class="pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
