import { useEffect, useRef } from 'react'
import { useLumina } from './store/cart'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { LivePreview } from './components/LivePreview'
import { Atmospheres } from './components/Atmospheres'
import { ControlPanel } from './components/ControlPanel'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Purchase } from './components/Purchase'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { useReveal } from './hooks/useReveal'

function useAccent() {
  const color = useLumina((s) => s.color)
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', color)
    // Only set the soft tint if LivePreview hasn't already claimed it
    if (!root.style.getPropertyValue('--bg-tint')) {
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      root.style.setProperty('--accent-soft', `rgba(${r}, ${g}, ${b}, 0.16)`)
    }
  }, [color])
}

export default function App() {
  const root = useRef(null)
  useReveal(root)
  useAccent()

  return (
    <>
      <div className="ambient" />
      <div className="grain" />

      <div ref={root}>
        <Nav />
        <main>
          <Hero />
          {/* Sticky 3D preview that travels with the user from the end of
              the hero into the customizer, scaling and tinting the page
              background toward the lamp color. */}
          <LivePreview />
          <Atmospheres />
          <ControlPanel />
          <Features />
          <Showcase />
          <Purchase />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  )
}
