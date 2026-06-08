import { useState, useEffect } from 'react'
import { useLumina } from '../store/cart'
import { IconCart, IconZap } from './Icon'
import './Nav.css'

const LINKS = [
  { label: 'Lamp',     href: '#hero'     },
  { label: 'Atmosphere', href: '#atmosphere' },
  { label: 'Specs',    href: '#specs'    },
  { label: 'Order',    href: '#order'    },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cart = useLumina((s) => s.cart)
  const openCart = useLumina((s) => s.openCart)
  const count = cart.reduce((n, i) => n + i.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__pill">
          <a href="#hero" className="nav__brand">
            <span className="nav__brand-mark"><IconZap width={16} height={16} /></span>
            <span className="nav__brand-text">LUMINA <span className="nav__brand-text-thin">RGB</span></span>
          </a>
          <nav className="nav__links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link uline">{l.label}</a>
            ))}
          </nav>
          <div className="nav__actions">
            <button className="nav__icon-btn" onClick={openCart} aria-label="Open cart">
              <IconCart width={18} height={18} />
              {count > 0 && <span className="nav__badge">{count}</span>}
            </button>
            <button
              className="nav__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={`nav__burger-line top ${open ? 'x1' : ''}`} />
              <span className={`nav__burger-line mid ${open ? 'hide' : ''}`} />
              <span className={`nav__burger-line bot ${open ? 'x2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className={`navmenu ${open ? 'is-open' : ''}`}>
        <div className="navmenu__inner">
          <p className="eyebrow navmenu__eyebrow">Index</p>
          <ul className="navmenu__list">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: `${80 + i * 60}ms` }}>
                <a href={l.href} onClick={() => setOpen(false)} className="navmenu__link">
                  <span className="navmenu__num mono">0{i + 1}</span>
                  <span className="navmenu__label">{l.label}</span>
                  <span className="navmenu__arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="navmenu__foot">
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)' }}>
              LUMINA RGB / MMXXVI
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
