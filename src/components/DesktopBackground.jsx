import { useEffect, useRef } from 'react'

/*
  DesktopBackground.jsx
  ──────────────────────────────────────────────────────────────────────────────
  Renders a canvas-based retro 3-D perspective grid that tilts subtly to follow
  the mouse cursor, giving depth to the desktop. Layered on top is a radial
  green ambient glow and a scanline overlay for the CRT retro feel.

  No dependencies beyond React — pure canvas2D.
*/

// ── tunables ──────────────────────────────────────────────────────────────────
const CFG = {
  bgColor:        '#07100a',    // base background
  gridColor:      '#00c840',    // primary grid line color
  gridAlpha:      0.18,         // base line opacity
  gridAlphaFar:   0.05,         // horizon line opacity (distance fade)
  cols:           24,           // vertical lines
  rows:           18,           // horizontal lines
  perspective:    600,          // CSS-like perspective depth
  tiltMax:        12,           // max degrees of tilt (X and Y axes)
  tiltSmooth:     0.06,         // lerp factor — lower = lazier follow
  glowRadius:     0.55,         // radial glow coverage (fraction of min dimension)
  scanlineAlpha:  0.07,         // scanline bar opacity
  scanlineGap:    4,            // px between scanline bars
}

export default function DesktopBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf
    let W, H
    // current mouse position normalised to [-1, 1]
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0

    // ── resize ──────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    // ── mouse tracking ───────────────────────────────────────────────────────
    function onMouseMove(e) {
      targetX = (e.clientX / window.innerWidth)  * 2 - 1   // -1 … 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    // ── 3-D grid projection ──────────────────────────────────────────────────
    // We treat the grid as a flat plane in 3-D space, then apply a rotation
    // matrix driven by the mouse, then project with perspective division.

    function project(x3, y3, z3, tiltXrad, tiltYrad) {
      // rotate around X axis (tiltY from mouse Y)
      const cosX = Math.cos(tiltXrad), sinX = Math.sin(tiltXrad)
      const y3r =  y3 * cosX - z3 * sinX
      const z3r =  y3 * sinX + z3 * cosX

      // rotate around Y axis (tiltX from mouse X)
      const cosY = Math.cos(tiltYrad), sinY = Math.sin(tiltYrad)
      const x3r =  x3 * cosY + z3r * sinY
      const z3rr = -x3 * sinY + z3r * cosY

      // perspective divide
      const scale = CFG.perspective / (CFG.perspective + z3rr + 300)
      return {
        sx: W / 2 + x3r * scale,
        sy: H / 2 + y3r * scale,
        alpha: Math.max(0, Math.min(1, scale)),   // fade far points
      }
    }

    function drawFrame() {
      // smooth lerp toward mouse target
      currentX += (targetX - currentX) * CFG.tiltSmooth
      currentY += (targetY - currentY) * CFG.tiltSmooth

      const tiltX = -currentY * (CFG.tiltMax * Math.PI / 180)   // mouse Y → rotate X
      const tiltY =  currentX * (CFG.tiltMax * Math.PI / 180)   // mouse X → rotate Y

      ctx.clearRect(0, 0, W, H)

      // ── base background ──────────────────────────────────────────────────
      ctx.fillStyle = CFG.bgColor
      ctx.fillRect(0, 0, W, H)

      // ── radial green ambient glow ────────────────────────────────────────
      const gR = Math.min(W, H) * CFG.glowRadius
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, gR)
      grd.addColorStop(0,   'rgba(0,200,64,0.07)')
      grd.addColorStop(0.5, 'rgba(0,150,40,0.03)')
      grd.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      // ── grid geometry ────────────────────────────────────────────────────
      // Define the grid in 3-D object space:
      //   x ∈ [-halfW, halfW], y ∈ [-halfH, halfH], z = 0 (flat plane)
      const halfW = W * 0.8
      const halfH = H * 0.8

      // Helper: draw a line between two projected points, fading with depth
      function gridLine(x0, y0, z0, x1, y1, z1) {
        const p0 = project(x0, y0, z0, tiltX, tiltY)
        const p1 = project(x1, y1, z1, tiltX, tiltY)
        const alpha = ((p0.alpha + p1.alpha) / 2) * CFG.gridAlpha
        ctx.beginPath()
        ctx.moveTo(p0.sx, p0.sy)
        ctx.lineTo(p1.sx, p1.sy)
        ctx.strokeStyle = `rgba(0,200,64,${alpha.toFixed(3)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Vertical lines (constant x, sweep z/y is irrelevant — flat plane)
      for (let i = 0; i <= CFG.cols; i++) {
        const x = -halfW + (halfW * 2) * (i / CFG.cols)
        gridLine(x, -halfH, 0,  x, halfH, 0)
      }

      // Horizontal lines
      for (let j = 0; j <= CFG.rows; j++) {
        const y = -halfH + (halfH * 2) * (j / CFG.rows)
        gridLine(-halfW, y, 0,  halfW, y, 0)
      }

      // ── corner accent dots ───────────────────────────────────────────────
      const corners = [
        [-halfW, -halfH, 0],
        [ halfW, -halfH, 0],
        [-halfW,  halfH, 0],
        [ halfW,  halfH, 0],
      ]
      corners.forEach(([cx, cy, cz]) => {
        const p = project(cx, cy, cz, tiltX, tiltY)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,80,${(p.alpha * 0.6).toFixed(3)})`
        ctx.fill()
      })

      // ── scanlines ────────────────────────────────────────────────────────
      ctx.fillStyle = `rgba(0,0,0,${CFG.scanlineAlpha})`
      for (let y = 0; y < H; y += CFG.scanlineGap) {
        ctx.fillRect(0, y, W, 1)
      }

      // ── subtle vignette ──────────────────────────────────────────────────
      const vgrd = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85)
      vgrd.addColorStop(0, 'rgba(0,0,0,0)')
      vgrd.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vgrd
      ctx.fillRect(0, 0, W, H)

      raf = requestAnimationFrame(drawFrame)
    }

    // ── init ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    window.addEventListener('mousemove', onMouseMove)
    drawFrame()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}