import SceneCanvas from '../components/three/SceneCanvas'
import { Shoe } from '../components/three/Shoe'
import { useState } from 'react'

export default function Configurator() {
  const [color, setColor] = useState('#10b981')
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-3xl font-bold">Configurateur</h1>
      <p className="mt-2 text-white/70">Personnalisez les couleurs et l’orientation du modèle 3D.</p>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SceneCanvas>
            <Shoe position={[0, 0, 0]} rotation={[0.2, Math.PI / 8, 0]} />
          </SceneCanvas>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <label className="text-sm text-white/70">Couleur d’accent</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-2 h-10 w-24 cursor-pointer rounded-md border border-white/10 bg-transparent" />
          <p className="mt-4 text-sm text-white/70">Plus d’options arrivent bientôt…</p>
        </div>
      </div>
    </main>
  )
}
