// Curated atmosphere presets — each maps to a 3D light spectrum
export const PRESETS = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    color: '#ff00ff',
    secondary: '#00ffff',
    blurb: 'Saturated magenta + electric cyan. For deep-night gaming sessions.',
    mood: 'After Dark',
  },
  {
    id: 'arctic-focus',
    name: 'Arctic Focus',
    color: '#ffffff',
    secondary: '#4ea8ff',
    blurb: 'Daylight-balanced 5700K white. Engineered for productive mornings.',
    mood: 'Deep Work',
  },
  {
    id: 'amber-glow',
    name: 'Amber Glow',
    color: '#ffb44a',
    secondary: '#ff5a1f',
    blurb: 'Candle-warm tones that ease circadian rhythm. Evening wind-down.',
    mood: 'Wind Down',
  },
  {
    id: 'prism-pulse',
    name: 'Prism Pulse',
    color: '#7cff7c',
    secondary: '#ff3b6b',
    blurb: 'A reactive cycle across the full visible spectrum. For hosting.',
    mood: 'Entertain',
  },
]

export const FINISHES = [
  { id: 'matte',     name: 'Matte Noir',  blurb: 'Soft-touch ceramic', priceMod: 0   },
  { id: 'brushed',   name: 'Brushed Alloy', blurb: 'Anodized aluminum', priceMod: 30  },
  { id: 'obsidian',  name: 'Obsidian Glass', blurb: 'Hand-polished crystal', priceMod: 60 },
]

export const FEATURES = [
  { stat: '16.8M', label: 'Colors', body: 'Full sRGB gamut. ±1nm wavelength precision.' },
  { stat: '0.4ms', label: 'Latency', body: 'Proprietary 2.4GHz mesh with 128-bit encryption.' },
  { stat: '94',    label: 'CRI',      body: 'Studio-grade color rendering index for accurate tones.' },
  { stat: '12W',   label: 'Power',    body: 'USB-C PD. Equivalent to a 75W incandescent.' },
]

export const SHOWCASES = [
  {
    id: 'gaming',
    name: 'Gaming',
    accent: '#ff00ff',
    body: 'Reactive audio sync. Per-key or per-zone color flow. Zero perceptible lag over wireless.',
    specs: ['Audio Reactive', '60Hz Sync', 'Per-zone Control'],
  },
  {
    id: 'focus',
    name: 'Focus',
    accent: '#4ea8ff',
    body: 'Adaptive circadian temperature. Cool morning white fades to amber as the day winds down.',
    specs: ['Circadian', '5700K Cool', '2700K Warm'],
  },
  {
    id: 'ambient',
    name: 'Ambient',
    accent: '#ffb44a',
    body: 'Slow, meditative color drift. Theatrical gradients. Designed to be looked at, not noticed.',
    specs: ['Slow Drift', 'Scene Presets', 'Music Sync'],
  },
]

export const PRODUCT = {
  id: 'lumina-rgb-one',
  name: 'Lumina RGB One',
  basePrice: 129,
  includes: ['Smart Base', 'Wireless Remote', 'USB-C Power Core', '12-Month Warranty'],
  specs: {
    dimensions: '180 × 90 × 90mm',
    weight: '480g',
    power: 'USB-C PD, 12W',
    wireless: '2.4GHz / BT 5.3',
    cri: '94+',
    colors: '16.8M',
  },
}
