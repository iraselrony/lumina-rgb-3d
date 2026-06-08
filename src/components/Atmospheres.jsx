import { useLumina } from '../store/cart'
import { PRESETS } from '../data/catalog'
import { IconArrow, IconCheck } from './Icon'
import './Atmospheres.css'

export function Atmospheres() {
  const presetId = useLumina((s) => s.presetId)
  const setPreset = useLumina((s) => s.setPreset)

  return (
    <section className="section atmos" id="atmosphere">
      <div className="shell">
        <header className="atmos__head">
          <div className="reveal" data-delay="1">
            <p className="eyebrow">02 / Atmospheres</p>
          </div>
          <h2 className="display-xl atmos__title reveal" data-delay="2">
            Four <em className="serif-italic">curated</em><br />
            <span className="atmos__title-soft">moods. Infinite variations.</span>
          </h2>
          <p className="atmos__lede reveal" data-delay="3">
            Each preset is a hand-tuned pairing of primary and secondary spectrum,
            designed by a working lighting designer. Tap to apply, then refine.
          </p>
        </header>

        <div className="atmos__grid">
          {PRESETS.map((p, i) => {
            const isActive = presetId === p.id
            const colSpan = [7, 5, 12, 7, 5, 0][i] || 12
            return (
              <button
                key={p.id}
                onClick={() => setPreset(p)}
                className={`atmos-card atmos-card--${i + 1} ${isActive ? 'is-active' : ''} reveal`}
                data-delay={String(Math.min(i + 2, 5))}
                style={{ '--c': p.color, '--c2': p.secondary, '--span': colSpan }}
              >
                <div className="atmos-card__inner bezel__core">
                  <div className="atmos-card__media">
                    <div className="atmos-card__orb" />
                    <div className="atmos-card__orb atmos-card__orb--2" />
                    <div className="atmos-card__ring" />
                    <span className="atmos-card__mood mono">{p.mood}</span>
                  </div>
                  <div className="atmos-card__copy">
                    <div className="atmos-card__head">
                      <h3 className="atmos-card__title">{p.name}</h3>
                      {isActive && (
                        <span className="atmos-card__badge mono">
                          <IconCheck width={12} height={12} /> Active
                        </span>
                      )}
                    </div>
                    <p className="atmos-card__body">{p.blurb}</p>
                    <div className="atmos-card__foot">
                      <div className="atmos-card__colors">
                        <span className="atmos-card__dot" style={{ background: p.color, color: p.color }} />
                        <span className="atmos-card__dot" style={{ background: p.secondary, color: p.secondary }} />
                      </div>
                      <span className="atmos-card__cta mono">Apply <IconArrow width={12} height={12} /></span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
