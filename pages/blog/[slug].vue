<template>
  <div></div>
</template>

<script setup>
// Blog has been removed — redirect all blog URLs back to the homepage
await navigateTo('/', { redirectCode: 301 })
</script>
