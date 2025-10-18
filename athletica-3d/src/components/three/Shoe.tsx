import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import type { JSX } from 'react'

const SHOE_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/shoe/model.gltf'

function ShoeModel(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF(SHOE_URL)
  return <primitive object={scene} {...props} />
}

function ShoePlaceholder(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.6, 1.2, 8, 16]} />
        <meshStandardMaterial color="#10b981" metalness={0.1} roughness={0.5} />
      </mesh>
      <mesh position={[0.5, -0.3, 0]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.35, 0.6]} />
        <meshStandardMaterial color="#34d399" />
      </mesh>
    </group>
  )
}

export function Shoe(props: JSX.IntrinsicElements['group']) {
  return (
    <Suspense fallback={<ShoePlaceholder {...props} />}>
      <ShoeModel {...props} />
    </Suspense>
  )
}

useGLTF.preload(SHOE_URL)
