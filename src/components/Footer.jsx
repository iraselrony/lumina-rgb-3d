import { useState } from 'react'
import { IconZap, IconArrow } from './Icon'
import './Footer.css'

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__mark"><IconZap width={18} height={18} /></span>
            <div>
              <h3 className="footer__brand-name">Lumina <em className="serif-italic">RGB</em></h3>
              <p className="footer__brand-sub">Light, considered.</p>
            </div>
          </div>

          <form className="footer__news" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <label className="footer__news-label">
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Newsletter</span>
              <div className="footer__news-input">
                <input
                  type="email"
                  required
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="footer__news-btn" aria-label="Subscribe">
                  <IconArrow width={14} height={14} />
                </button>
              </div>
            </label>
            {done && <p className="footer__news-ok mono">Welcome. We send one email a month, never more.</p>}
          </form>
        </div>

        <div className="divider" />

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__col-head mono">Product</p>
            <a className="uline" href="#hero">Lumina One</a>
            <a className="uline" href="#atmosphere">Atmospheres</a>
            <a className="uline" href="#specs">Specs</a>
            <a className="uline" href="#order">Order</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-head mono">Studio</p>
            <a className="uline" href="#">About</a>
            <a className="uline" href="#">Manufacturing</a>
            <a className="uline" href="#">Sustainability</a>
            <a className="uline" href="#">Press</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-head mono">Support</p>
            <a className="uline" href="#">Setup</a>
            <a className="uline" href="#">Warranty</a>
            <a className="uline" href="#">Returns</a>
            <a className="uline" href="#">Contact</a>
          </div>
          <div className="footer__col footer__col--loc">
            <p className="footer__col-head mono">Studios</p>
            <p>Kyoto, Japan</p>
            <p>Berlin, Germany</p>
            <p>Brooklyn, NY</p>
          </div>
        </div>

        <div className="footer__base">
          <span className="mono">© MMXXVI / Lumina RGB Co.</span>
          <span className="mono">Hand-assembled in Kyoto.</span>
        </div>
      </div>
    </footer>
  )
}
