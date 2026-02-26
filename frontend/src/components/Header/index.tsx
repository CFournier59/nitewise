import { Settings } from 'lucide-react'
import { Link } from 'react-router'

export default function Header() {
  // formatage de la date du jour
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  const formattedDate = today.toLocaleDateString('fr-FR', options)

  return (
    <header className="fixed top-0 left-0 w-full py-2 bg-col4">
      <div className="mx-6 flex items-center justify-between">
        <p className="text-m font-bold">
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        </p>
        <Link
          to="/settings"
          className="flex items-center gap-1 shadow-lg rounded-full p-1 bg-col1 border-2 border-col2 active:translate-y-2 active:shadow-none"
        >
          <Settings size={28} />
        </Link>
      </div>
    </header>
  )
}
