import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

/** Wireless remote — companion prop floating beside the lamp. */
export function Remote({ color, isOn }) {
  const led = useRef()
  useFrame((state) => {
    if (led.current && isOn) {
      const t = state.clock.elapsedTime
      led.current.material.emissiveIntensity = 1.4 + Math.sin(t * 3) * 0.4
    }
  })
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
      <group position={[1.7, 0.4, 0.6]} rotation={[0.1, -0.5, 0.3]}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 1.3, 0.12]} />
          <meshStandardMaterial color="#0c0c0e" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Inset top */}
        <mesh position={[0, 0.4, 0.061]}>
          <boxGeometry args={[0.5, 0.5, 0.005]} />
          <meshStandardMaterial color="#1a1a1c" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Center LED */}
        <mesh ref={led} position={[0, 0.4, 0.07]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
          <meshStandardMaterial color={isOn ? color : '#222'} emissive={isOn ? color : '#000'} emissiveIntensity={isOn ? 1.4 : 0} toneMapped={false} />
        </mesh>
        {/* Three ring buttons */}
        {[0.15, 0.0, -0.15].map((y, i) => (
          <mesh key={i} position={[0, y, 0.07]}>
            <cylinderGeometry args={[0.09 - i * 0.012, 0.09 - i * 0.012, 0.025, 32]} />
            <meshStandardMaterial color={i === 1 && isOn ? color : '#222'} emissive={i === 1 && isOn ? color : '#000'} emissiveIntensity={i === 1 && isOn ? 0.5 : 0} metalness={0.7} roughness={0.4} />
          </mesh>
        ))}
        {/* Bottom d-pad */}
        <mesh position={[0, -0.4, 0.07]}>
          <boxGeometry args={[0.3, 0.18, 0.02]} />
          <meshStandardMaterial color="#1a1a1c" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.4, 0.082]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshStandardMaterial color="#2a2a2e" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}
