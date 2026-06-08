import { useEffect, useRef, useState } from 'react'
import { useLumina } from '../store/cart'
import { Stage } from './Scene3D/Stage'
import './LivePreview.css'

/**
 * LivePreview — a tall scroll section whose sticky child holds the 3D lamp.
 * As the user scrolls through this section, the lamp scales and tilts down,
 * and the page background tints toward the lamp's accent color. The user
 * arrives at the customizer with the lamp already in the right size/position
 * and the page tinted to match.
 */
export function LivePreview() {
  const sectionRef = useRef(null)
  const [p, setP] = useState(0) // 0 -> 1 as user scrolls through the section

  const color = useLumina((s) => s.color)
  const secondary = useLumina((s) => s.secondary)
  const intensity = useLumina((s) => s.intensity)
  const finish = useLumina((s) => s.finish)
  const isOn = useLumina((s) => s.isOn)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(range, 1))
      const next = scrolled / Math.max(range, 1)
      setP(next)

      // Drive the page background tint via CSS custom property.
      const root = document.documentElement
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      // Base ink
      const baseR = 5, baseG = 5, baseB = 7
      // Interpolate up to 18% of the accent into the base color
      const mix = Math.min(next * 0.18, 0.18)
      const mr = Math.round(baseR + (r - baseR) * mix)
      const mg = Math.round(baseG + (g - baseG) * mix)
      const mb = Math.round(baseB + (b - baseB) * mix)
      root.style.setProperty('--bg-tint', `rgb(${mr}, ${mg}, ${mb})`)
      // Boost ambient glow as we progress
      root.style.setProperty('--accent-soft', `rgba(${r}, ${g}, ${b}, ${0.12 + next * 0.18})`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [color])

  // Eased progress for smoother visuals
  const ease = (t) => t * t * (3 - 2 * t)
  const e = ease(p)

  // Scale: 1.0 -> 0.55
  const scale = 1 - e * 0.45
  // Drop down a touch
  const ty = e * 60
  // Slight roll for kinetic feel
  const rotZ = (e - 0.5) * 1.5

  return (
    <section className="liveprev" ref={sectionRef} aria-hidden="true">
      <div className="liveprev__sticky">
        <div
          className="liveprev__inner"
          style={{
            transform: `translate3d(0, ${ty}px, 0) scale(${scale}) rotate(${rotZ}deg)`,
          }}
        >
          <div className="liveprev__bezel bezel">
            <div className="bezel__core liveprev__core">
              <Stage
                color={color}
                secondary={secondary}
                intensity={intensity}
                finish={finish}
                isOn={isOn}
                scroll={0}
              />
              <div className="liveprev__overlay">
                <span className="mono liveprev__tag">LIVE PREVIEW</span>
                <span className="mono liveprev__hex" style={{ color }}>{color.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="liveprev__caption" style={{ opacity: 1 - e * 1.6 }}>
          <span className="mono">SCROLL</span>
          <span className="liveprev__caption-arrow">↓</span>
          <span className="mono">TO CONFIGURE</span>
        </div>
      </div>
    </section>
  )
}
