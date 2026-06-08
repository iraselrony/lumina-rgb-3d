import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Lumina RGB One — a more sculpted, "machined" smart light.
 * Composition (bottom -> top):
 *   - Puck base (fluted ring)
 *   - Tapered column
 *   - Polished neck
 *   - Ribbed diffuser head with internal LED ring
 *   - Additive glow disk above
 *   - Volumetric halo
 */
export function SmartLight({ color, secondary, intensity, finish, isOn, scroll = 0 }) {
  const root = useRef()
  const head = useRef()
  const ledRing = useRef()
  const glowDisk = useRef()
  const halo = useRef()
  const innerCore = useRef()

  // Material configs per finish
  const bodyMat = useMemo(() => {
    const c = finish === 'obsidian' ? '#0a0a0c'
            : finish === 'brushed' ? '#c9c9cf'
            : '#1a1a1c'
    return new THREE.MeshStandardMaterial({
      color: c,
      metalness: finish === 'matte' ? 0.55 : 0.95,
      roughness: finish === 'matte' ? 0.55 : finish === 'brushed' ? 0.28 : 0.12,
    })
  }, [finish])

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1c', metalness: 0.9, roughness: 0.18,
  }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      // Gentle floating breath + scroll-driven tilt
      root.current.position.y = Math.sin(t * 0.6) * 0.05
      root.current.rotation.y = t * 0.15 + scroll * Math.PI * 0.6
    }
    if (head.current && isOn) {
      const pulse = intensity * (0.92 + Math.sin(t * 2.4) * 0.08)
      head.current.material.emissiveIntensity = pulse
    } else if (head.current) {
      head.current.material.emissiveIntensity = THREE.MathUtils.lerp(head.current.material.emissiveIntensity, 0.05, 0.08)
    }
    if (ledRing.current && isOn) {
      ledRing.current.material.emissiveIntensity = intensity * 1.8 + Math.sin(t * 4) * 0.2
    }
    if (glowDisk.current && isOn) {
      glowDisk.current.material.opacity = 0.85 * Math.min(intensity / 3, 1)
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.2
    }
    if (innerCore.current && isOn) {
      innerCore.current.scale.setScalar(1 + Math.sin(t * 3) * 0.06)
    }
  })

  const c = new THREE.Color(color)
  const s = new THREE.Color(secondary)

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Puck base — fluted outer ring */}
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.1, 64]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 96]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Tapered column */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 1.0, 64]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>

      {/* Subtle accent groove */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.3, 0.015, 16, 96]} />
        <meshStandardMaterial color={isOn ? color : '#222'} emissive={isOn ? color : '#000'} emissiveIntensity={isOn ? 0.6 : 0} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Polished neck */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 64]} />
        <primitive object={accentMat} attach="material" />
      </mesh>

      {/* Diffuser head — ribbed cylinder */}
      <mesh ref={head} position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.5, 0.5, 96]} />
        <meshStandardMaterial
          color="#161618"
          emissive={c}
          emissiveIntensity={intensity}
          metalness={0.7}
          roughness={0.4}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Vertical diffuser fins — 8 thin ribs around the head */}
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.5, 0.78, Math.sin(a) * 0.5]}>
            <boxGeometry args={[0.02, 0.52, 0.02]} />
            <meshStandardMaterial color="#0a0a0c" metalness={0.7} roughness={0.3} />
          </mesh>
        )
      })}

      {/* Inner LED ring — bright emissive band */}
      <mesh ref={ledRing} position={[0, 0.78, 0]}>
        <torusGeometry args={[0.42, 0.05, 16, 96]} />
        <meshStandardMaterial
          color={c}
          emissive={c}
          emissiveIntensity={intensity * 1.8}
          metalness={0}
          roughness={1}
          toneMapped={false}
        />
      </mesh>

      {/* Inner light core — the apparent point of emission */}
      <mesh ref={innerCore} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color={c} toneMapped={false} transparent opacity={isOn ? 0.7 : 0} />
      </mesh>

      {/* Glow disk — additive blend, sits just above the head */}
      <mesh ref={glowDisk} position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 64]} />
        <meshBasicMaterial
          color={c}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Soft secondary halo for two-tone presets */}
      {isOn && (
        <mesh ref={halo} position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 1.4, 64]} />
          <meshBasicMaterial
            color={s}
            transparent
            opacity={0.12 * Math.min(intensity / 3, 1)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Real lights that illuminate the rest of the scene */}
      {isOn && (
        <>
          <pointLight color={c} intensity={intensity * 4} distance={6} position={[0, 0.85, 0]} />
          <pointLight color={s} intensity={intensity * 0.8} distance={4} position={[0.5, 0.4, 0.5]} />
          <spotLight
            color={c}
            intensity={intensity * 2}
            position={[0, 2.2, 0]}
            target-position={[0, 0, 0]}
            angle={0.6}
            penumbra={0.8}
            distance={5}
          />
        </>
      )}
    </group>
  )
}
