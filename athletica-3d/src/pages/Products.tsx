export default function Products() {
  const products = [
    { id: 'a1', name: 'Athletica Pro', price: '179€', color: 'emerald' },
    { id: 'b2', name: 'Athletica Sprint', price: '159€', color: 'cyan' },
    { id: 'c3', name: 'Athletica Trail', price: '169€', color: 'violet' },
  ]
  const colorClass: Record<string, string> = {
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
    violet: 'bg-violet-500',
  }
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-3xl font-bold">Collection</h1>
      <p className="mt-2 text-white/70">Découvrez notre gamme de modèles haute performance.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/10 p-6 bg-white/5">
            <div className={`h-40 rounded-xl ${colorClass[p.color]}`} />
            <h3 className="mt-4 text-xl font-semibold">{p.name}</h3>
            <p className="text-white/70">{p.price}</p>
            <button className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">Voir</button>
          </div>
        ))}
      </div>
    </main>
  )
}
