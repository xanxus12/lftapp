"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/**
 * Simple parallax hook that translates an element vertically based on scroll.
 * Positive speed moves with scroll but slower; higher = more movement.
 */
export function useParallax(speed = 0.2, clamp = 80) {
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

  const style = useMemo(() => ({
    transform: `translate3d(0, ${y.toFixed(1)}px, 0)`,
    willChange: "transform",
  } as React.CSSProperties), [y])

  return { ref, style }
}

