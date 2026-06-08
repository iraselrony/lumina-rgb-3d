import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLumina = create(
  persist(
    (set, get) => ({
      // Lamp configuration (drives the 3D scene)
      isOn: true,
      color: '#ff00ff',          // primary spectrum
      secondary: '#00ffff',      // secondary spectrum
      intensity: 2.4,            // 0 - 5
      finish: 'matte',           // matte | brushed | obsidian
      presetId: 'cyber-neon',

      // Cart
      cart: [],                  // [{ id, qty, finish, color, price }]
      isCartOpen: false,
      justAdded: false,           // for fly-to-cart animation

      // Lamp setters
      togglePower: () => set((s) => ({ isOn: !s.isOn })),
      setColor: (color, secondary) => set({ color, secondary }),
      setIntensity: (v) => set({ intensity: v }),
      setFinish: (finish) => set({ finish }),
      setPreset: (preset) => set({ presetId: preset.id, color: preset.color, secondary: preset.secondary }),

      // Cart actions
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addToCart: (item) => {
        const id = `${item.productId}-${item.color}-${item.finish}`
        const existing = get().cart.find((i) => i.id === id)
        if (existing) {
          set({
            cart: get().cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
            isCartOpen: true,
            justAdded: true,
          })
        } else {
          set({
            cart: [...get().cart, { ...item, id, qty: 1 }],
            isCartOpen: true,
            justAdded: true,
          })
        }
        setTimeout(() => set({ justAdded: false }), 1400)
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),
      updateQty: (id, qty) => {
        if (qty < 1) return get().removeFromCart(id)
        set({ cart: get().cart.map((i) => (i.id === id ? { ...i, qty } : i)) })
      },
      clearCart: () => set({ cart: [] }),

      cartCount: () => get().cart.reduce((n, i) => n + i.qty, 0),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: 'lumina-store',
      partialize: (s) => ({ cart: s.cart, finish: s.finish, presetId: s.presetId, intensity: s.intensity }),
    }
  )
)
