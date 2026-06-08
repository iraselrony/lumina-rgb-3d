# Lumina RGB — Awwwards-Tier 3D Ecommerce

A high-end, immersive 3D ecommerce experience for the **Lumina RGB One** smart light.
Built with React 19, Vite, React Three Fiber, Drei, Three.js, and Zustand.

## What's inside

- **Hero stage** — Live R3F canvas inside a double-bezel frame. A redesigned machined
  smart light (fluted puck base, ribbed diffuser head, internal LED ring, additive
  volumetric glow), wireless remote prop, ambient particles, and a real
  `MeshReflectorMaterial` floor. Camera gently dollies with scroll.
- **Atmospheres** — Asymmetric bento grid of 4 curated spectrum presets. Each
  card has a custom 3D-feeling orb and applies the preset to the live 3D scene.
- **Control Panel** — Live HSL color picker, finish selector (Matte / Brushed /
  Obsidian), dynamic price total, and a Continue CTA into the order section.
- **Engineering** — 4 stat cards (16.8M, 0.4ms, CRI 94, 12W) with thin-line icons.
- **In context** — 3 use-case cards (Gaming / Focus / Ambient), each with its own
  miniature scene and a "Try" CTA that pushes the accent into the live 3D scene.
- **Order** — Asymmetric editorial split with includes, assurance, and a sticky
  purchase card with finish pills, stock indicator, and an Add-to-Cart CTA.
- **Cart Drawer** — Slide-in side panel with item rows, qty +/-, remove, subtotal,
  shipping note, and a full-width checkout button. Body scroll lock + Escape close.
- **Footer** — Brand block, newsletter capture, four column links, and a base bar.

## Design system

- **Type**: Fraunces (display, variable serif) · Space Grotesk (body) · JetBrains Mono (data)
- **Palette**: Vantablack `#050505` with a live `--accent` driven by the lamp color
- **Texture**: Fixed SVG noise overlay + radial ambient mesh that picks up the accent
- **Motion**: Custom `cubic-bezier(0.32, 0.72, 0, 1)` everywhere, no `ease-in-out`
- **Architecture**: Double-bezel (Doppelrand) cards — outer shell + concentric inner core
- **CTA pattern**: Button-in-button trailing icon circle that translates diagonally on hover
- **Reveal**: IntersectionObserver-driven `translateY(40px) blur(8px) → 0` on `.reveal`
- **Performance**: `dpr=[1, 1.75]`, `PerformanceMonitor`, additive-only GPU transforms

## State (Zustand, persisted to localStorage)

- Lamp: `isOn`, `color`, `secondary`, `intensity`, `finish`, `presetId`
- Cart: `cart[]`, `isCartOpen`, `justAdded` (for toast)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle
npm run lint     # 0 errors
```

## File map

```
src/
  App.jsx                       # root composition
  main.jsx
  index.css                     # design system tokens + base
  data/catalog.js               # presets, finishes, features, showcase
  store/cart.js                 # Zustand store (persist)
  hooks/
    useReveal.js                # IO scroll reveal
    useScrollProgress.js
  components/
    Nav.jsx + .css              # floating glass pill + morph menu
    Hero.jsx + .css             # editorial split + 3D stage
    Atmospheres.jsx + .css      # asymmetric bento
    ControlPanel.jsx + .css     # HSL + finish
    Features.jsx + .css         # engineering stats
    Showcase.jsx + .css         # 3 use-case cards
    Purchase.jsx + .css         # order + add-to-cart
    CartDrawer.jsx + .css       # slide-in cart
    Footer.jsx + .css
    Icon.jsx                    # thin-line SVG icon set
    Scene3D/
      SmartLight.jsx            # the lamp
      Remote.jsx                # the remote prop
      Particles.jsx             # ambient motes
      Stage.jsx                 # Canvas + lights + floor
```
