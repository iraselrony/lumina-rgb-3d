import { useState } from 'react'
import { useLumina } from '../store/cart'
import { FINISHES, PRODUCT } from '../data/catalog'
import { IconCheck, IconArrow } from './Icon'
import './ControlPanel.css'

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) { h = s = 0 }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h *= 60
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function ControlPanel() {
  const color = useLumina((s) => s.color)
  const setColor = useLumina((s) => s.setColor)
  const intensity = useLumina((s) => s.intensity)
  const setIntensity = useLumina((s) => s.setIntensity)
  const finish = useLumina((s) => s.finish)
  const setFinish = useLumina((s) => s.setFinish)

  const [h, setH] = useState(() => hexToHsl(color).h)
  const [s, setS] = useState(() => hexToHsl(color).s)
  const [l, setL] = useState(() => hexToHsl(color).l)

  const applyHsl = (nh, ns, nl) => {
    const next = hslToHex(nh, ns, nl)
    setColor(next, next)
  }

  const finishObj = FINISHES.find((f) => f.id === finish)
  const livePrice = PRODUCT.basePrice + (finishObj?.priceMod || 0)

  return (
    <section className="section ctrl" id="specs">
      <div className="shell">
        <div className="ctrl__head">
          <p className="eyebrow reveal" data-delay="1">03 / Configure</p>
          <h2 className="display-xl ctrl__title reveal" data-delay="2">
            Make it <em className="serif-italic">yours</em>.
          </h2>
        </div>

        <div className="ctrl__grid">
          <div className="bezel ctrl__panel">
            <div className="bezel__core ctrl__panel-inner">
              <div className="ctrl__group">
                <div className="ctrl__group-head">
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Hue / Saturation / Lightness</span>
                  <span className="mono ctrl__hex" style={{ color: color }}>{color.toUpperCase()}</span>
                </div>

                <div className="ctrl__row">
                  <label className="ctrl__label mono">H</label>
                  <input type="range" min="0" max="360" value={h} onChange={(e) => { const v = +e.target.value; setH(v); applyHsl(v, s, l) }} className="ctrl__range ctrl__range--hue" />
                  <span className="mono ctrl__num">{h}°</span>
                </div>
                <div className="ctrl__row">
                  <label className="ctrl__label mono">S</label>
                  <input type="range" min="0" max="100" value={s} onChange={(e) => { const v = +e.target.value; setS(v); applyHsl(h, v, l) }} className="ctrl__range" />
                  <span className="mono ctrl__num">{s}%</span>
                </div>
                <div className="ctrl__row">
                  <label className="ctrl__label mono">L</label>
                  <input type="range" min="0" max="100" value={l} onChange={(e) => { const v = +e.target.value; setL(v); applyHsl(h, s, v) }} className="ctrl__range" />
                  <span className="mono ctrl__num">{l}%</span>
                </div>
              </div>

              <div className="divider ctrl__divider" />

              <div className="ctrl__group">
                <div className="ctrl__group-head">
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Luminance</span>
                  <span className="mono ctrl__num">{intensity.toFixed(2)} lx</span>
                </div>
                <input type="range" min="0.2" max="5" step="0.05" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} className="ctrl__range ctrl__range--intensity" />
              </div>
            </div>
          </div>

          <div className="ctrl__side">
            <div className="bezel ctrl__finish">
              <div className="bezel__core ctrl__finish-inner">
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Finish</span>
                <div className="ctrl__finish-list">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`ctrl__finish-row ${finish === f.id ? 'is-active' : ''}`}
                    >
                      <span className="ctrl__finish-radio">{finish === f.id && <IconCheck width={12} height={12} />}</span>
                      <span className="ctrl__finish-text">
                        <span className="ctrl__finish-name">{f.name}</span>
                        <span className="ctrl__finish-blurb">{f.blurb}</span>
                      </span>
                      <span className="mono ctrl__finish-price">
                        {f.priceMod === 0 ? 'Included' : `+$${f.priceMod}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bezel ctrl__total">
              <div className="bezel__core ctrl__total-inner">
                <div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Live total</span>
                  <div className="ctrl__total-price">${livePrice}</div>
                </div>
                <a
                  className="btn btn--primary"
                  href="#order"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>Continue</span>
                  <span className="btn__icon"><IconArrow width={16} height={16} /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
