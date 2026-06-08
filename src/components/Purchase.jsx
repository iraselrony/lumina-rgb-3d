import { useLumina } from '../store/cart'
import { PRODUCT, FINISHES } from '../data/catalog'
import { IconArrow, IconBox, IconCheck, IconShield } from './Icon'
import './Purchase.css'

export function Purchase() {
  const color = useLumina((s) => s.color)
  const finish = useLumina((s) => s.finish)
  const setFinish = useLumina((s) => s.setFinish)
  const addToCart = useLumina((s) => s.addToCart)

  const finishObj = FINISHES.find((f) => f.id === finish)
  const total = PRODUCT.basePrice + (finishObj?.priceMod || 0)

  return (
    <section className="section buy" id="order">
      <div className="shell">
        <div className="buy__grid">
          <div className="buy__copy">
            <p className="eyebrow reveal" data-delay="1">06 / Order</p>
            <h2 className="display-xl buy__title reveal" data-delay="2">
              One lamp.<br />
              <em className="serif-italic">Infinite</em> rooms.
            </h2>
            <p className="buy__lede reveal" data-delay="3">
              Lumina RGB One ships with the wireless remote, a USB-C power core,
              and a 12-month manufacturer warranty. Free express shipping in 38 countries.
            </p>

            <ul className="buy__includes reveal" data-delay="4">
              {PRODUCT.includes.map((inc) => (
                <li key={inc} className="buy__include">
                  <span className="buy__include-icon"><IconCheck width={12} height={12} /></span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div className="buy__assurance reveal" data-delay="5">
              <div className="buy__assurance-item">
                <span className="buy__assurance-icon"><IconBox width={18} height={18} /></span>
                <div>
                  <strong>Free shipping</strong>
                  <span>2-3 day delivery, 38 countries</span>
                </div>
              </div>
              <div className="buy__assurance-item">
                <span className="buy__assurance-icon"><IconShield width={18} height={18} /></span>
                <div>
                  <strong>12-month warranty</strong>
                  <span>Full replacement, no questions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bezel buy__card reveal" data-delay="3">
            <div className="bezel__core buy__card-inner">
              <div className="buy__card-head">
                <div>
                  <p className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Edition 001</p>
                  <h3 className="buy__card-title">{PRODUCT.name}</h3>
                </div>
                <div className="buy__color-chip" style={{ background: color, color: color }} aria-label="Current color" />
              </div>

              <div className="buy__card-row">
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Finish</span>
                <div className="buy__finish-pills">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`buy__finish-pill ${finish === f.id ? 'is-active' : ''}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="buy__card-row">
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>In stock</span>
                <span className="buy__stock">
                  <span className="buy__stock-dot" /> Ships in 24h
                </span>
              </div>

              <div className="divider" />

              <div className="buy__card-foot">
                <div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Total</span>
                  <div className="buy__card-price">${total}</div>
                </div>
                <button
                  className="btn btn--accent"
                  onClick={() => addToCart({ productId: PRODUCT.id, name: PRODUCT.name, price: total, color, finish })}
                >
                  <span>Add to cart</span>
                  <span className="btn__icon"><IconArrow width={16} height={16} /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
