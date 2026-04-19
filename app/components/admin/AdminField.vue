<template>
  <div>
    <label class="block text-xs mb-1.5" style="color: var(--muted)">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup>
defineProps<{ label: string }>()
</script>
