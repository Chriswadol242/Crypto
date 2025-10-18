export default function Contact() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-white/70">Parlez-nous de votre projet.</p>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3" placeholder="Nom" />
        <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" />
        <textarea className="sm:col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3" placeholder="Message" rows={5} />
        <button className="sm:col-span-2 rounded-xl bg-emerald-500 px-5 py-3 text-black font-semibold hover:bg-emerald-400">Envoyer</button>
      </form>
    </main>
  )
}
