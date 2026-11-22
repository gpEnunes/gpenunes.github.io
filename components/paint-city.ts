function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function channel(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ]
}

function mix(from: string, to: string, t: number): string {
  const a = channel(from)
  const b = channel(to)
  const amount = Math.min(1, Math.max(0, t))
  const rgb = a.map((start, index) => Math.round(start + (b[index] - start) * amount))
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function skyline(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  baseline: number,
  fill: string,
  specs: ReadonlyArray<readonly [number, number, number]>,
) {
  const ground = height * baseline
  ctx.fillStyle = fill
  specs.forEach(([x, w, h], index) => {
    const bx = x * width
    const bw = w * width
    const bh = h * height
    const by = ground - bh
    ctx.fillRect(bx, by, bw, bh)

    const cols = Math.max(2, Math.floor(bw / 16))
    const rows = Math.max(2, Math.floor(bh / 22))
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
    const seed = index * 100 + row * 17 + col * 3
    if (hash(seed + 1) > 0.58) continue
    const alreadyOn = hash(seed + 5) > 0.7
    const onAt = hash(seed) * 0.9
    if (!alreadyOn && progress < onAt) continue
        const warm = hash(seed + 2) > 0.4
        ctx.globalAlpha = 0.35 + hash(seed + 3) * 0.65
        ctx.fillStyle = warm ? '#e7b15a' : '#9ebbd4'
        const wx = bx + 4 + col * (bw / cols)
        const wy = by + 6 + row * (bh / rows)
        ctx.fillRect(wx, wy, Math.max(2, bw / cols - 7), Math.max(3, bh / rows - 12))
        ctx.globalAlpha = 1
      }
    }
  })
}

function apartment(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
) {
  const narrow = width < 760
  const bw = narrow ? Math.min(width * 0.72, 420) : Math.min(width * 0.32, 440)
  const bh = Math.min(height * 0.72, bw * 1.45)
  const bx = narrow ? (width - bw) / 2 : width * 0.6
  const by = height * 0.9 - bh

  ctx.fillStyle = '#10141c'
  ctx.fillRect(bx, by, bw, height - by)

  const wx = bx + bw * 0.16
  const wy = by + bh * 0.1
  const ww = bw * 0.68
  const wh = bh * 0.48

  const spill = ctx.createRadialGradient(wx + ww / 2, wy + wh / 2, 10, wx + ww / 2, wy + wh / 2, ww * 0.9)
  spill.addColorStop(0, `rgba(255, 186, 110, ${0.05 + progress * 0.16})`)
  spill.addColorStop(1, 'rgba(255, 186, 110, 0)')
  ctx.fillStyle = spill
  ctx.fillRect(bx - 20, by, bw + 40, bh)

  ctx.save()
  ctx.beginPath()
  ctx.rect(wx, wy, ww, wh)
  ctx.clip()

  const wall = ctx.createLinearGradient(0, wy, 0, wy + wh)
  wall.addColorStop(0, mix('#3d312b', '#6a4632', progress))
  wall.addColorStop(1, mix('#241912', '#3a2418', progress))
  ctx.fillStyle = wall
  ctx.fillRect(wx, wy, ww, wh)

  ctx.fillStyle = 'rgba(255, 214, 150, 0.08)'
  ctx.fillRect(wx + ww * 0.08, wy + wh * 0.12, ww * 0.16, wh * 0.22)

  const deskY = wy + wh * 0.7
  ctx.fillStyle = '#2a2118'
  ctx.fillRect(wx, deskY, ww, wh * 0.3)
  ctx.fillStyle = '#3a2d22'
  ctx.fillRect(wx, deskY, ww, 6)

  const lampX = wx + ww * 0.16
  ctx.strokeStyle = '#1a140f'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(lampX, deskY)
  ctx.lineTo(lampX, deskY - wh * 0.22)
  ctx.stroke()
  const lamp = ctx.createRadialGradient(lampX, deskY - wh * 0.2, 2, lampX, deskY - wh * 0.12, ww * 0.45)
  lamp.addColorStop(0, `rgba(255, 196, 120, ${0.2 + progress * 0.45})`)
  lamp.addColorStop(1, 'rgba(255, 196, 120, 0)')
  ctx.fillStyle = lamp
  ctx.fillRect(wx, wy, ww, wh)

  const lean = progress
  const hipX = wx + ww * (0.42 + lean * 0.06)
  const shoulderX = wx + ww * (0.46 + lean * 0.1)
  const shoulderY = deskY - wh * (0.32 - lean * 0.06)
  const headX = shoulderX + ww * lean * 0.045
  const headY = shoulderY - wh * 0.16
  const headR = Math.max(9, ww * 0.075)

  ctx.fillStyle = '#241910'
  ctx.fillRect(hipX - ww * 0.07, deskY - wh * 0.16, ww * 0.05, wh * 0.16)
  ctx.fillRect(hipX + ww * 0.08, deskY - wh * 0.16, ww * 0.05, wh * 0.16)

  ctx.fillStyle = '#4e6274'
  ctx.beginPath()
  ctx.moveTo(hipX - ww * 0.1, deskY)
  ctx.quadraticCurveTo(shoulderX - ww * 0.16, shoulderY + wh * 0.08, shoulderX - headR * 0.9, shoulderY)
  ctx.lineTo(shoulderX + headR, shoulderY + wh * 0.03)
  ctx.quadraticCurveTo(hipX + ww * 0.16, deskY - wh * 0.04, hipX + ww * 0.12, deskY)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#e4b08a'
  ctx.beginPath()
  ctx.arc(headX, headY, headR, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#2a1c16'
  ctx.beginPath()
  ctx.arc(headX - headR * 0.1, headY - headR * 0.15, headR, Math.PI, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = `rgba(170, 214, 255, ${0.18 + progress * 0.45})`
  ctx.beginPath()
  ctx.arc(headX + headR * 0.35, headY + headR * 0.05, headR * 0.72, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#4e6274'
  ctx.lineWidth = Math.max(5, ww * 0.045)
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(shoulderX, shoulderY + wh * 0.05)
  ctx.quadraticCurveTo(
    wx + ww * (0.4 + lean * 0.1),
    deskY - wh * (0.16 - lean * 0.04),
    wx + ww * 0.42,
    deskY - 4,
  )
  ctx.stroke()

  const screenX = wx + ww * 0.34
  const screenY = deskY - wh * 0.34
  const screenW = ww * 0.22
  const screenH = wh * 0.28
  ctx.fillStyle = '#0d1218'
  ctx.fillRect(screenX, screenY, screenW, screenH)
  const glow = ctx.createLinearGradient(screenX, screenY, screenX + screenW, screenY + screenH)
  glow.addColorStop(0, `rgba(150, 210, 255, ${0.25 + progress * 0.55})`)
  glow.addColorStop(1, `rgba(80, 140, 220, ${0.15 + progress * 0.35})`)
  ctx.fillStyle = glow
  ctx.fillRect(screenX + 3, screenY + 3, screenW - 6, screenH - 8)
  ctx.fillStyle = '#241910'
  ctx.fillRect(screenX - 2, screenY + screenH, screenW + 8, 5)

  const mugX = wx + ww * 0.74
  const mugY = deskY - wh * 0.08
  ctx.fillStyle = '#e7d7c6'
  ctx.fillRect(mugX, mugY, ww * 0.07, wh * 0.09)
  ctx.fillStyle = '#3a2418'
  ctx.beginPath()
  ctx.ellipse(mugX + ww * 0.035, mugY + 1, ww * 0.028, 3, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#e7d7c6'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(mugX + ww * 0.07, mugY + wh * 0.045, ww * 0.02, -Math.PI / 2, Math.PI / 2)
  ctx.stroke()

  ctx.strokeStyle = `rgba(255,255,255,${0.18 + progress * 0.2})`
  ctx.lineWidth = 1.5
  for (let i = 0; i < 3; i += 1) {
    const sway = Math.sin(time / 700 + i * 1.4) * 5
    ctx.beginPath()
    ctx.moveTo(mugX + ww * 0.03, mugY)
    ctx.bezierCurveTo(
      mugX + sway,
      mugY - wh * 0.06,
      mugX + ww * 0.06 - sway,
      mugY - wh * 0.12,
      mugX + ww * 0.02 + sway,
      mugY - wh * (0.16 + i * 0.03),
    )
    ctx.stroke()
  }

  ctx.restore()

  ctx.strokeStyle = '#07090d'
  ctx.lineWidth = 8
  ctx.strokeRect(wx, wy, ww, wh)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 1
  ctx.strokeRect(wx, wy, ww, wh)
}

const FAR: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0.09, 0.16],
  [0.08, 0.07, 0.28],
  [0.14, 0.11, 0.2],
  [0.24, 0.06, 0.34],
  [0.29, 0.1, 0.18],
  [0.38, 0.08, 0.26],
  [0.45, 0.12, 0.15],
  [0.56, 0.07, 0.22],
  [0.86, 0.08, 0.2],
  [0.93, 0.07, 0.3],
]

const NEAR: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0.12, 0.24],
  [0.11, 0.08, 0.36],
  [0.18, 0.14, 0.2],
  [0.31, 0.09, 0.3],
  [0.4, 0.16, 0.18],
  [0.9, 0.1, 0.28],
]

export function paintCity(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
) {
  const p = Math.min(1, Math.max(0, progress))
  const sky = ctx.createLinearGradient(0, 0, 0, height)
  sky.addColorStop(0, mix('#1c3154', '#070910', p))
  sky.addColorStop(0.45, mix('#24324a', '#10141c', p))
  sky.addColorStop(1, '#07080c')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < 80; i += 1) {
    ctx.globalAlpha = (0.12 + p * 0.7) * (0.35 + hash(i + 4) * 0.65)
    ctx.fillStyle = '#f7f3e8'
    ctx.beginPath()
    ctx.arc(hash(i + 1) * width, hash(i + 2) * height * 0.46, 0.4 + hash(i + 3) * 1.2, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  const moonX = width * (width < 760 ? 0.82 : 0.22)
  const moonY = height * 0.16 - p * 14
  const halo = ctx.createRadialGradient(moonX, moonY, 8, moonX, moonY, 78)
  halo.addColorStop(0, `rgba(244, 236, 214, ${0.22 + p * 0.28})`)
  halo.addColorStop(1, 'rgba(244, 236, 214, 0)')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(moonX, moonY, 78, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#f4ead8'
  ctx.beginPath()
  ctx.arc(moonX, moonY, 15, 0, Math.PI * 2)
  ctx.fill()

  skyline(ctx, width, height, p, 0.62, '#161b24', FAR)
  skyline(ctx, width, height, p, 0.78, '#0d1118', NEAR)
  apartment(ctx, width, height, p, time)

  ctx.fillStyle = '#07080c'
  ctx.fillRect(0, height * 0.9, width, height * 0.1)
  for (const spot of [0.08, 0.28, 0.48, 0.86]) {
    const x = width * spot
    const pool = ctx.createRadialGradient(x, height * 0.9, 2, x, height * 0.93, 70)
    pool.addColorStop(0, `rgba(255, 176, 84, ${0.04 + p * 0.16})`)
    pool.addColorStop(1, 'rgba(255, 176, 84, 0)')
    ctx.fillStyle = pool
    ctx.fillRect(x - 80, height * 0.84, 160, height * 0.16)
  }
}
