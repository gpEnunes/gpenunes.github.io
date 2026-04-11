<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <!-- Space canvas -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    ></canvas>

    <!-- Nebula glow overlays (CSS, sit on top of canvas) -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        class="absolute rounded-full blur-3xl"
        style="
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(124,92,255,0.12) 0%, transparent 70%);
        "
      ></div>
      <div
        class="absolute rounded-full blur-3xl"
        style="
          width: 500px; height: 500px;
          bottom: -80px; right: -100px;
          background: radial-gradient(circle, rgba(41,164,255,0.10) 0%, transparent 70%);
        "
      ></div>
      <div
        class="absolute rounded-full blur-3xl"
        style="
          width: 300px; height: 300px;
          top: 40%; left: 60%;
          background: radial-gradient(circle, rgba(0,229,168,0.07) 0%, transparent 70%);
        "
      ></div>
    </div>

    <!-- Hero content -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full z-10">
      <!-- Location badge -->
      <div class="flex items-center gap-2 mb-6">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
          style="border-color: rgba(41,164,255,0.35); background: rgba(41,164,255,0.08); color: var(--accent3)"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          Portugal &mdash; Open to Relocation within Europe
        </span>
      </div>

      <!-- Name -->
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mb-4"
      >
        Emerson Nunes
      </h1>

      <!-- Dynamic subtitle -->
      <p class="text-lg sm:text-xl text-gray-400 mb-3">
        Fullstack Developer &mdash;
        <span
          class="font-mono font-semibold"
          style="color: var(--accent2)"
          aria-live="polite"
          >{{ heroText }}</span
        ><span
          class="ml-0.5 inline-block w-0.5 h-5 align-middle"
          :class="cursorVisible ? 'opacity-100' : 'opacity-0'"
          style="background: var(--accent2); transition: opacity 0.1s"
          aria-hidden="true"
        ></span>
      </p>

      <!-- Tagline -->
      <p class="text-base text-gray-400 max-w-2xl mb-10">
        Building scalable web applications and marketing automation tools.
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap gap-3">
        <a
          href="/cv-emerson-nunes.pdf"
          download
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:scale-105 hover:shadow-lg"
          style="background: var(--accent1); box-shadow: 0 0 0 rgba(124,92,255,0)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CV
        </a>
        <a
          href="https://linkedin.com/in/emerson-nunes5"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 border"
          style="border-color: rgba(255,255,255,0.15); color: var(--text); background: rgba(255,255,255,0.05)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97v5.69h-3v-10h2.88v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.6z"/>
          </svg>
          LinkedIn
        </a>
        <a
          href="https://github.com/gpEnunes"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 border"
          style="border-color: rgba(255,255,255,0.15); color: var(--text); background: rgba(255,255,255,0.05)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-40">
      <span class="text-xs tracking-widest uppercase" style="color: var(--muted)">scroll</span>
      <div class="w-px h-8 overflow-hidden" style="background: rgba(255,255,255,0.1)">
        <div class="w-full h-4 scroll-line" style="background: var(--accent2)"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// --- Canvas space animation ---
const canvasRef = ref(null)
let animFrame = null
let shootingTimer = null

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let W = 0
  let H = 0
  let stars = []
  let shootingStars = []

  // Build a star field
  function buildStars(w, h) {
    stars = []
    const count = Math.floor((w * h) / 4000)
    for (let i = 0; i < count; i++) {
      const r = Math.random()
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        // Three layers: tiny dim, small medium, rare bright+large
        size: r < 0.75 ? Math.random() * 0.8 + 0.2 : r < 0.95 ? Math.random() * 1.2 + 0.8 : Math.random() * 2 + 1.5,
        alpha: r < 0.75 ? Math.random() * 0.4 + 0.1 : r < 0.95 ? Math.random() * 0.5 + 0.3 : Math.random() * 0.4 + 0.6,
        twinkleSpeed: Math.random() * 0.02 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        // subtle drift
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
      })
    }
  }

  function resize() {
    W = canvas.offsetWidth
    H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H
    buildStars(W, H)
  }

  function spawnShootingStar() {
    // Start from top edge, travel diagonally
    const startX = Math.random() * W * 1.2
    const startY = Math.random() * H * 0.4
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3
    const speed = 6 + Math.random() * 6
    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 80 + Math.random() * 120,
      alpha: 1,
      fade: 0.012 + Math.random() * 0.008,
    })
  }

  function scheduleShootingStar() {
    const delay = 2500 + Math.random() * 5000
    shootingTimer = setTimeout(() => {
      spawnShootingStar()
      scheduleShootingStar()
    }, delay)
  }

  let t = 0
  function draw() {
    t += 1
    ctx.clearRect(0, 0, W, H)

    // Draw stars
    for (const s of stars) {
      // Gentle drift
      s.x += s.vx
      s.y += s.vy
      if (s.x < 0) s.x = W
      if (s.x > W) s.x = 0
      if (s.y < 0) s.y = H
      if (s.y > H) s.y = 0

      // Twinkle via sine
      const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.25
      const a = Math.max(0, Math.min(1, s.alpha + twinkle))

      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)

      // Big stars get a subtle glow
      if (s.size > 1.5) {
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3)
        grad.addColorStop(0, `rgba(200,215,255,${a})`)
        grad.addColorStop(0.5, `rgba(180,200,255,${a * 0.4})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2)
      } else {
        ctx.fillStyle = `rgba(200,215,255,${a})`
      }
      ctx.fill()
    }

    // Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i]
      ss.x += ss.vx
      ss.y += ss.vy
      ss.alpha -= ss.fade

      if (ss.alpha <= 0) {
        shootingStars.splice(i, 1)
        continue
      }

      const tailX = ss.x - ss.vx * (ss.length / Math.hypot(ss.vx, ss.vy))
      const tailY = ss.y - ss.vy * (ss.length / Math.hypot(ss.vx, ss.vy))

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, 'rgba(255,255,255,0)')
      grad.addColorStop(0.7, `rgba(180,220,255,${ss.alpha * 0.4})`)
      grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Head glow
      const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4)
      hg.addColorStop(0, `rgba(255,255,255,${ss.alpha})`)
      hg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = hg
      ctx.fill()
    }

    animFrame = requestAnimationFrame(draw)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()
  draw()
  scheduleShootingStar()

  return () => {
    cancelAnimationFrame(animFrame)
    clearTimeout(shootingTimer)
    ro.disconnect()
  }
}

// --- Typing animation ---
const heroText = ref('')
const cursorVisible = ref(true)
const heroPhrases = [
  'Laravel',
  'Vue.js',
  'Nuxt.js',
  'PHP & REST APIs',
  'Marketing Automation',
  'TypeScript',
]

let cursorInterval = null

function startHeroTyping() {
  let pIndex = 0
  let cIndex = 0
  let deleting = false

  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)

  function step() {
    const phrase = heroPhrases[pIndex % heroPhrases.length]
    if (!deleting) {
      heroText.value = phrase.slice(0, cIndex + 1)
      cIndex++
      if (cIndex >= phrase.length) {
        deleting = true
        setTimeout(step, 1400)
        return
      }
      setTimeout(step, 80)
    } else {
      heroText.value = phrase.slice(0, cIndex - 1)
      cIndex--
      if (cIndex <= 0) {
        deleting = false
        pIndex++
        setTimeout(step, 350)
        return
      }
      setTimeout(step, 45)
    }
  }

  step()
}

let cleanupCanvas = null

onMounted(() => {
  cleanupCanvas = initCanvas()
  startHeroTyping()
})

onUnmounted(() => {
  if (cleanupCanvas) cleanupCanvas()
  clearInterval(cursorInterval)
})
</script>

<style scoped>
@keyframes scroll-line {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
.scroll-line {
  animation: scroll-line 1.6s ease-in-out infinite;
}
</style>
