<template>
  <div>
    <NuxtPage />
    <CookieBanner />
  </div>
</template>

<script setup>
const { consent } = useConsent()
const config = useRuntimeConfig()
const gaId = config.public.gaId

// Inject GA4 only after the user consents
const gaScripts = computed(() => {
  if (!consent.value || !gaId) return []
  return [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
      async: true,
    },
    {
      innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`,
    },
  ]
})

useHead({
  htmlAttrs: { lang: 'en' },
  script: gaScripts,
})
</script>
