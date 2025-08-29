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
    let frame = 0

    const update = () => {
      frame = 0
      // Translate relative to document scroll so initial position is preserved
      // factor > 1 moves out faster (translate up), < 1 lingers (translate down)
      const translate = (1 - factor) * window.scrollY
      setY(translate)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const onResize = () => {
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
