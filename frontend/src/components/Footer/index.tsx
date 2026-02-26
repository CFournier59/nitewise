import { Link, useLocation } from 'react-router'
import homeIcon from '../../assets/home-icon.svg'
import createIcon from '../../assets/create-icon.svg'
import showIcon from '../../assets/show-icon.svg'
import statsIcon from '../../assets/stats-icon.svg'

export default function Footer() {
  const location = useLocation()

  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <nav className="flex justify-between items-center p-4 bg-col3 border-t-2 border-col2">
        <Link
          to="/"
          className={`${location.pathname === '/' ? 'opacity-50' : ''} flex flex-col items-center`}
        >
          <img
            src={homeIcon}
            alt="Accueil"
            className={location.pathname === '/' ? '' : 'active:translate-y-2'}
          />
          <p className="text-col2">Accueil</p>
        </Link>
        <Link
          to="/nites/create"
          className={`${location.pathname === '/nites/create' ? 'opacity-50' : ''} flex flex-col items-center`}
        >
          <img
            src={createIcon}
            alt="Ajouter une nuit"
            className={
              location.pathname === '/nites/create'
                ? ''
                : 'active:translate-y-2'
            }
          />
          <p className="text-col2">Ajouter</p>
        </Link>
        <Link
          to="/nites"
          className={`${location.pathname === '/nites' ? 'opacity-50' : ''} flex flex-col items-center`}
        >
          <img
            src={showIcon}
            alt="Voir les nuits"
            className={
              location.pathname === '/nites' ? '' : 'active:translate-y-2'
            }
          />
          <p className="text-col2">Gérer</p>
        </Link>
        <Link
          to="/stats"
          className={`${location.pathname === '/stats' ? 'opacity-50' : ''} flex flex-col items-center`}
        >
          <img
            src={statsIcon}
            alt="Statistiques"
            className={
              location.pathname === '/stats' ? '' : 'active:translate-y-2'
            }
          />
          <p className="text-col2">Stats</p>
        </Link>
      </nav>
    </footer>
  )
}
