"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export interface ParallaxOptions {
  speed?: number
  clamp?: number
  xAmplitude?: number // px of horizontal drift at max
  rotateMax?: number // deg at max
  scaleMax?: number // extra scale at max (e.g., 0.02 = +2%)
}

/**
 * Parallax hook: adds depth with translateY + optional translateX/rotate/scale.
 */
export function useParallax(opts: ParallaxOptions = {}) {
  const {
    speed = 0.3,
    clamp = 100,
    xAmplitude = 0,
    rotateMax = 0,
    scaleMax = 0,
  } = opts

  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    let initialTop = el.getBoundingClientRect().top + window.scrollY

    const update = () => {
      frame = 0
      const current = window.scrollY
      const delta = (current - initialTop) * speed
      const limited = Math.max(-clamp, Math.min(clamp, delta))
      setY(limited)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      initialTop = el.getBoundingClientRect().top + window.scrollY
      onScroll()
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [speed, clamp])

  const style = useMemo(() => {
    const t = clamp === 0 ? 0 : y / clamp // -1..1
    const x = xAmplitude * t
    const r = rotateMax * t
    const s = 1 + Math.abs(t) * scaleMax
    return {
      transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(3)})`,
      willChange: "transform",
    } as React.CSSProperties
  }, [y, clamp, xAmplitude, rotateMax, scaleMax])

  return { ref, style }
}
