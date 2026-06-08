import { useEffect } from 'react'

// Adds `.in` to elements with `.reveal` once they intersect the viewport.
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef?.current || document
    const els = root.querySelectorAll('.reveal')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}
