import { useLumina } from '../store/cart'
import { SHOWCASES } from '../data/catalog'
import { IconArrow, IconCheck } from './Icon'
import './Showcase.css'

export function Showcase() {
  const setPreset = useLumina((s) => s.setPreset)
  return (
    <section className="section show" id="showcase">
      <div className="shell">
        <header className="show__head">
          <p className="eyebrow reveal" data-delay="1">05 / In context</p>
          <h2 className="display-xl show__title reveal" data-delay="2">
            Three <em className="serif-italic">scenes</em>,<br />
            one instrument.
          </h2>
        </header>

        <div className="show__grid">
          {SHOWCASES.map((s, i) => (
            <article key={s.id} className="show__card bezel reveal" data-delay={String(Math.min(i + 2, 5))} style={{ '--c': s.accent }}>
              <div className="bezel__core show__card-inner">
                <div className="show__card-head">
                  <span className="mono show__num">0{i + 1}</span>
                  <h3 className="show__name">{s.name}</h3>
                </div>
                <div className="show__scene">
                  <div className="show__wall" />
                  <div className="show__beam" />
                  <div className="show__lamp" />
                  <div className="show__desk" />
                </div>
                <p className="show__body">{s.body}</p>
                <ul className="show__specs">
                  {s.specs.map((sp) => (
                    <li key={sp} className="show__spec">
                      <IconCheck width={12} height={12} />
                      <span className="mono">{sp}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="show__cta"
                  onClick={() => setPreset({ id: `show-${s.id}`, name: s.name, color: s.accent, secondary: s.accent })}
                >
                  <span className="mono">Try {s.name}</span>
                  <span className="show__cta-icon"><IconArrow width={12} height={12} /></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
