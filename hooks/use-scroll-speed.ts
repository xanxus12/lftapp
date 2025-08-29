"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/**
 * useScrollSpeed: transforms element vertical position so it appears to
 * scroll faster or slower than the document.
 * - factor = 1.0 → normal speed (no change)
 * - factor > 1.0 → scrolls out faster (moves up more)
 * - factor < 1.0 → scrolls slower (lingers longer)
 */
export function useScrollSpeed(factor = 1.0) {
  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    // Align transform origin at the element's natural page position
    let startY = el.getBoundingClientRect().top + window.scrollY

    const update = () => {
      frame = 0
      const delta = window.scrollY - startY
      // Move extra distance relative to document scroll
      const translate = - (factor - 1) * delta
      setY(translate)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      startY = el.getBoundingClientRect().top + window.scrollY
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
  }, [factor])

  const style = useMemo(() => ({
    transform: `translate3d(0, ${y.toFixed(1)}px, 0)`,
    willChange: "transform",
  } as React.CSSProperties), [y])

  return { ref, style }
}

