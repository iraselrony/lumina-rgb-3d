import { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, MeshReflectorMaterial, Html, PerformanceMonitor } from '@react-three/drei'
import { SmartLight } from './SmartLight'
import { Remote } from './Remote'
import { Particles } from './Particles'

/** Camera that gently drifts with the scroll progress passed in. */
function CameraRig({ scroll }) {
  const cam = useThree((s) => s.camera)
  useFrame(() => {
    const targetX = Math.sin(scroll * Math.PI) * 0.4
    const targetY = 0.6 + scroll * 0.3
    // Lerp the camera position toward the target on each axis
    const nextX = cam.position.x + (targetX - cam.position.x) * 0.06
    const nextY = cam.position.y + (targetY - cam.position.y) * 0.06
    cam.position.set(nextX, nextY, cam.position.z)
    cam.lookAt(0, 0.4, 0)
  })
  return null
}

function Fallback() {
  return (
    <Html center>
      <div style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Synchronizing RGB…
      </div>
    </Html>
  )
}

export function Stage({ color, secondary, intensity, finish, isOn, scroll = 0 }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.6, 4.4], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <PerformanceMonitor />
      <CameraRig scroll={scroll} />

      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 4, 2]} intensity={0.6} castShadow color="#ffffff" />
      <directionalLight position={[-3, 2, -1]} intensity={0.2} color={secondary} />

      <Suspense fallback={<Fallback />}>
        <group position={[0, 0.2, 0]}>
          <SmartLight
            color={color}
            secondary={secondary}
            intensity={intensity}
            finish={finish}
            isOn={isOn}
            scroll={scroll}
          />
          <Remote color={color} isOn={isOn} />
        </group>

        <Particles color={color} isOn={isOn} />

        {/* Reflective floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.81, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={50}
            roughness={0.85}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#080808"
            metalness={0.6}
            mirror={0.4}
          />
        </mesh>

        <ContactShadows opacity={0.45} scale={10} blur={2.4} far={4} color="#000" position={[0, -0.8, 0]} />

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
