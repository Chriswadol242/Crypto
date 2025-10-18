import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 shadow-glow">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500" />
            <span className="text-lg font-semibold tracking-wide">Athletica</span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Accueil
            </NavLink>
            <NavLink to="/produits" className={navLinkClass}>
              Produits
            </NavLink>
            <NavLink to="/configurateur" className={navLinkClass}>
              Configurateur
            </NavLink>
            <NavLink to="/a-propos" className={navLinkClass}>
              À propos
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>
          <div className="hidden sm:block">
            <Link to="/configurateur" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400">
              Créer ma chaussure
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
