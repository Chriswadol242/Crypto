import SceneCanvas from '../components/three/SceneCanvas'
import { Shoe } from '../components/three/Shoe'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Performances 3D pour surpasser les limites
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Athletica conçoit des chaussures légères et stables, optimisées par la simulation
            3D. Conçues pour la vitesse, testées pour la durabilité.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/configurateur" className="rounded-xl bg-emerald-500 px-5 py-3 text-black font-semibold hover:bg-emerald-400">
              Configurer mon modèle
            </Link>
            <Link to="/produits" className="rounded-xl border border-white/20 px-5 py-3 text-white font-semibold hover:bg-white/10">
              Voir la collection
            </Link>
          </div>
        </div>
        <div>
          <SceneCanvas>
            <Shoe position={[0, 0, 0]} rotation={[0.2, Math.PI / 8, 0]} />
          </SceneCanvas>
        </div>
      </section>
      <section className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: 'Légèreté', desc: 'Matériaux avancés pour un poids minimal.' },
          { title: 'Stabilité', desc: 'Semelle optimisée par analyse de contraintes.' },
          { title: 'Adhérence', desc: 'Motifs de traction inspirés de la biomécanique.' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 p-6 bg-white/5">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-white/70">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
