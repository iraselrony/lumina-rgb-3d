import { useEffect, useRef, useState } from 'react'
import { useLumina } from '../store/cart'
import { Stage } from './Scene3D/Stage'
import { IconArrow, IconSun, IconMoon, IconRadio } from './Icon'
import './Hero.css'

function useScrollProgress(ref) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setP(scrolled / Math.max(total, 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return p
}

const QUICK = [
  { c: '#ff00ff', s: '#00ffff' },
  { c: '#00ffff', s: '#ff00ff' },
  { c: '#ffb44a', s: '#ff5a1f' },
  { c: '#7cff7c', s: '#ff3b6b' },
  { c: '#ffffff', s: '#4ea8ff' },
  { c: '#4ea8ff', s: '#ffffff' },
]

export function Hero() {
  const heroRef = useRef(null)
  const color = useLumina((s) => s.color)
  const secondary = useLumina((s) => s.secondary)
  const intensity = useLumina((s) => s.intensity)
  const finish = useLumina((s) => s.finish)
  const isOn = useLumina((s) => s.isOn)
  const togglePower = useLumina((s) => s.togglePower)
  const setIntensity = useLumina((s) => s.setIntensity)
  const setColor = useLumina((s) => s.setColor)
  const addToCart = useLumina((s) => s.addToCart)

  const scroll = useScrollProgress(heroRef)

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow reveal" data-delay="1">
            <IconRadio width={12} height={12} />  Edition 001 / Wireless Smart Light
          </p>
          <h1 className="hero__title reveal" data-delay="2">
            Light, <em className="serif-italic">tuned</em><br />
            to the <span className="hero__accent">frequency</span><br />
            of the room.
          </h1>
          <p className="hero__lede reveal" data-delay="3">
            Lumina RGB One pairs a machined optical head with a 2.4&nbsp;GHz mesh remote.
            Sixteen million colors, sub-millisecond response, and a single USB-C cable.
            This is illumination, considered.
          </p>
          <div className="hero__actions reveal" data-delay="4">
            <a
              className="btn btn--primary"
              href="#order"
              onClick={(e) => {
                e.preventDefault()
                addToCart({ productId: 'lumina-rgb-one', name: 'Lumina RGB One', price: 129, color, finish })
              }}
            >
              <span>Order — $129</span>
              <span className="btn__icon"><IconArrow width={16} height={16} /></span>
            </a>
            <button className="btn btn--ghost" onClick={togglePower}>
              {isOn ? <IconMoon width={16} height={16} /> : <IconSun width={16} height={16} />}
              <span>{isOn ? 'Power off' : 'Power on'}</span>
              <span className="btn__icon"></span>
            </button>
          </div>

          <div className="hero__meta reveal" data-delay="5">
            <div className="hero__meta-item">
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>01 / Spectrum</span>
              <div className="hero__chips">
                {QUICK.map((q) => (
                  <button
                    key={q.c}
                    className={`swatch ${color === q.c ? 'is-active' : ''}`}
                    style={{ color: q.c, background: q.c }}
                    onClick={() => setColor(q.c, q.s)}
                    aria-label={`Set color ${q.c}`}
                  />
                ))}
              </div>
            </div>
            <div className="hero__meta-item">
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>02 / Intensity</span>
              <input
                type="range"
                min="0.2"
                max="5"
                step="0.05"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="hero__slider"
              />
              <span className="mono hero__int-val">{intensity.toFixed(2)} lx</span>
            </div>
          </div>
        </div>

        <div className="hero__stage">
          <div className="bezel hero__stage-bezel">
            <div className="bezel__core hero__stage-core">
              <Stage
                color={color}
                secondary={secondary}
                intensity={intensity}
                finish={finish}
                isOn={isOn}
                scroll={scroll}
              />
              <div className="hero__stage-overlay">
                <div className="hero__stage-corner tl">
                  <span className="mono">L01</span><span className="mono">RGB.ONE</span>
                </div>
                <div className="hero__stage-corner tr">
                  <span className="mono">v1.0</span>
                  <span className="mono" style={{ color: isOn ? 'var(--accent)' : 'var(--muted)' }}>{isOn ? 'ONLINE' : 'OFFLINE'}</span>
                </div>
                <div className="hero__stage-corner bl">
                  <span className="mono" style={{ display: 'block', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>SCROLL / CONFIGURE</span>
                </div>
                <div className="hero__stage-corner br">
                  <span className="mono">{finish.toUpperCase()}</span>
                  <span className="mono">04 / 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__ticker mono">
        <div className="hero__ticker-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div className="hero__ticker-row" key={k}>
              <span>16.8M COLORS</span><span>·</span>
              <span>0.4MS LATENCY</span><span>·</span>
              <span>CRI 94+</span><span>·</span>
              <span>USB-C POWERED</span><span>·</span>
              <span>2.4GHZ MESH</span><span>·</span>
              <span>HAND-ASSEMBLED IN KYOTO</span><span>·</span>
              <span>MMXXVI EDITION</span><span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
