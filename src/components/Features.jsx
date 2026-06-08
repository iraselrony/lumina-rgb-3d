import { FEATURES } from '../data/catalog'
import { IconBluetooth, IconCpu, IconPalette, IconShield } from './Icon'
import './Features.css'

const ICONS = [IconPalette, IconBluetooth, IconShield, IconCpu]

export function Features() {
  return (
    <section className="section feats" id="features">
      <div className="shell">
        <header className="feats__head">
          <p className="eyebrow reveal" data-delay="1">04 / Engineering</p>
          <h2 className="display-xl feats__title reveal" data-delay="2">
            Numbers, <em className="serif-italic">not adjectives</em>.
          </h2>
        </header>

        <div className="feats__grid">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[i]
            return (
              <div key={f.label} className="feats__card bezel reveal" data-delay={String(Math.min(i + 1, 5))}>
                <div className="bezel__core feats__card-inner">
                  <div className="feats__icon"><Icon width={20} height={20} /></div>
                  <div className="feats__stat">{f.stat}</div>
                  <div className="feats__label mono">{f.label}</div>
                  <p className="feats__body">{f.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
