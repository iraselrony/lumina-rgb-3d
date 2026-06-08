import { useEffect } from 'react'
import { useLumina } from '../store/cart'
import { IconClose, IconMinus, IconPlus, IconTrash, IconArrow, IconCheck } from './Icon'
import { FINISHES } from '../data/catalog'
import './CartDrawer.css'

export function CartDrawer() {
  const isOpen = useLumina((s) => s.isCartOpen)
  const closeCart = useLumina((s) => s.closeCart)
  const cart = useLumina((s) => s.cart)
  const updateQty = useLumina((s) => s.updateQty)
  const removeFromCart = useLumina((s) => s.removeFromCart)
  const justAdded = useLumina((s) => s.justAdded)

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeCart()
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((n, i) => n + i.qty, 0)

  return (
    <>
      <div className={`cartscrim ${isOpen ? 'is-open' : ''}`} onClick={closeCart} />
      <aside className={`cart ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <header className="cart__head">
          <div>
            <p className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Your order</p>
            <h3 className="cart__title">Cart <span className="cart__count mono">{count}</span></h3>
          </div>
          <button className="cart__close" onClick={closeCart} aria-label="Close cart">
            <IconClose width={18} height={18} />
          </button>
        </header>

        <div className="cart__body">
          {cart.length === 0 && (
            <div className="cart__empty">
              <div className="cart__empty-orb" />
              <p>Nothing in here yet. Configure your Lumina and add it to the cart.</p>
            </div>
          )}

          {cart.map((item) => {
            const f = FINISHES.find((x) => x.id === item.finish)
            return (
              <div key={item.id} className="cart__row">
                <div className="cart__thumb" style={{ '--c': item.color, color: item.color }}>
                  <div className="cart__thumb-orb" />
                </div>
                <div className="cart__meta">
                  <strong className="cart__name">{item.name}</strong>
                  <span className="cart__variant mono">{f?.name || item.finish} · <span style={{ color: item.color }}>{item.color.toUpperCase()}</span></span>
                  <div className="cart__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease"><IconMinus width={12} height={12} /></button>
                    <span className="mono">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase"><IconPlus width={12} height={12} /></button>
                  </div>
                </div>
                <div className="cart__price-col">
                  <span className="cart__price">${(item.price * item.qty).toFixed(2)}</span>
                  <button className="cart__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                    <IconTrash width={14} height={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {cart.length > 0 && (
          <footer className="cart__foot">
            <div className="cart__row-sum">
              <span className="mono" style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span className="cart__subtotal">${total.toFixed(2)}</span>
            </div>
            <div className="cart__row-sum cart__row-sum--sm">
              <span className="mono" style={{ color: 'var(--muted)' }}>Shipping</span>
              <span className="mono">Calculated at checkout</span>
            </div>
            <button className="btn btn--primary cart__checkout" style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>Checkout — ${total.toFixed(2)}</span>
              <span className="btn__icon"><IconArrow width={16} height={16} /></span>
            </button>
            <p className="cart__note mono">
              <IconCheck width={12} height={12} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Free express shipping. 30-day returns.
            </p>
          </footer>
        )}

        {justAdded && <div className="cart__toast">Added to cart</div>}
      </aside>
    </>
  )
}
