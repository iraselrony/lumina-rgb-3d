import { useEffect, useState } from 'react'

// Returns 0..1 of how far `targetRef` is through the viewport.
export function useScrollProgress(targetRef) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = targetRef?.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = rect.height
      const scrolled = Math.min(Math.max(-rect.top, 0), h)
      setP(scrolled / Math.max(h, 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [targetRef])
  return p
}
