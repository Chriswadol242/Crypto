import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import type { ReactNode } from 'react'

export function SceneCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="h-[70vh] w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
      <Canvas shadows camera={{ position: [3, 2, 3], fov: 50 }}>
        <color attach="background" args={["#0b0f16"]} />
        <ambientLight intensity={0.4} />
        <directionalLight castShadow position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-5, 2, -3]} intensity={0.2} />
        <Environment preset="city" />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={7} />
        {children}
      </Canvas>
    </div>
  )
}

export default SceneCanvas
