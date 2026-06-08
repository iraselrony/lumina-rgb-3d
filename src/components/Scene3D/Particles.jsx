/* eslint-disable react-hooks/immutability */
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Drifting ambient particles that pick up the lamp's color. */
export function Particles({ color, count = 80, isOn }) {
  const ref = useRef()
  // Lazy-init the typed array once on mount to avoid impure-during-render
  const [positions] = useState(() => new Float32Array(count * 3))

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 3 - 0.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position
      if (attr) attr.needsUpdate = true
    }
  }, [count, positions])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.04
    const mat = ref.current.material
    if (mat && isOn) mat.opacity = 0.6
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color={isOn ? color : '#444'}
        transparent
        opacity={isOn ? 0.6 : 0.2}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
