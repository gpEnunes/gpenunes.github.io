<template>
  <div>
    <label class="block text-xs mb-1.5" style="color: var(--muted)">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
