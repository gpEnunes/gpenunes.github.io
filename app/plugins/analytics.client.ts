export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId as string

  if (!gaId) return

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
        `,
        type: 'text/javascript',
      },
    ],
  })

  const router = useRouter()

  router.afterEach((to, from) => {
    if (typeof window === 'undefined') return
    const g = (window as any).gtag
    if (typeof g === 'undefined') return

    // SPA page view tracking
    g('event', 'page_view', { page_path: to.fullPath, page_title: document.title })

    // Time on /dev tracking
    if (from?.path === '/dev' && to.path !== '/dev') {
      const elapsed = Math.round((Date.now() - ((window as any).__devPageEnterTime || Date.now())) / 1000)
      if (elapsed > 0) g('event', 'time_on_dev_page', { seconds: elapsed })
    }
    if (to.path === '/dev') {
      ;(window as any).__devPageEnterTime = Date.now()
    }
  })
})
