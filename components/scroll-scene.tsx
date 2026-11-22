'use client'

import { useEffect, useRef } from 'react'
import { paintCity } from '@/components/paint-city'

const STILL_PROGRESS = 0.42

export function ScrollScene({
  label,
  name,
  stack,
}: {
  label: string
  name: string
  stack: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const canvas = canvasRef.current
    if (!section || !frame || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = media.matches
    let running = false
    let frameId = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(bounds.width * dpr))
      canvas.height = Math.max(1, Math.floor(bounds.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      const bounds = canvas.getBoundingClientRect()
      paintCity(ctx, bounds.width, bounds.height, reduced ? STILL_PROGRESS : progressRef.current, reduced ? 0 : time)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frameId)
    }

    const loop = (time: number) => {
      if (!running) return
      draw(time)
      frameId = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      frameId = window.requestAnimationFrame(loop)
    }

    const readProgress = () => {
      if (reduced) return
      const total = section.offsetHeight - frame.offsetHeight
      const stickyTop = Number.parseFloat(window.getComputedStyle(frame).top) || 0
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top + stickyTop, 0), Math.max(total, 0))
      progressRef.current = total <= 0 ? 0 : scrolled / total
    }

    resize()
    readProgress()
    draw(0)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw(0)
    })
    resizeObserver.observe(canvas)

    const intersection = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) {
        if (reduced) draw(0)
        else start()
      } else {
        stop()
      }
    })
    intersection.observe(frame)

    const onScroll = () => readProgress()
    const onMotion = () => {
      reduced = media.matches
      stop()
      readProgress()
      if (reduced) draw(0)
      else if (frame.getBoundingClientRect().bottom > 0 && frame.getBoundingClientRect().top < window.innerHeight) start()
    }

    if (!reduced) {
      window.addEventListener('scroll', onScroll, { passive: true })
      start()
    }
    media.addEventListener('change', onMotion)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersection.disconnect()
      window.removeEventListener('scroll', onScroll)
      media.removeEventListener('change', onMotion)
    }
  }, [])

  return (
    <section ref={sectionRef} className="scene" aria-label={name}>
      <div ref={frameRef} className="scene-frame">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/20 to-transparent sm:bg-gradient-to-r sm:from-[#07080d] sm:via-[#07080d]/55 sm:to-transparent" />
        <div className="relative z-10 flex h-full items-end px-5 pb-10 sm:items-center sm:px-10 md:w-1/2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">{label}</p>
            <h1 className="mt-3 font-serif text-5xl leading-none text-white sm:text-7xl">{name}</h1>
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-white/70">{stack}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
