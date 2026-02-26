import type { Nite } from '../../types'
import recorded from '../../assets/recorded.svg'
import unrecorded from '../../assets/unrecorded.svg'
import CompareTable from './compareTable'
import Table from './table'
import { Link } from 'react-router'

export default function DashBoard({ nites }: { nites: Nite[] }) {
  const nitePrompt = [
    'Bien dormi ? Enregistre ta nuit  tant que c’est  frais ! ',
    'Aïe ! On dirait que la nuit n’as pas vraiment porté conseil. Allez, un bon café et ça repart!',
    " c'est pas terrible, mais tu peux faire mieux ! Essaie de te coucher un peu plus tôt ce soir.",
    'Une nuit de qualité moyenne, mais tu peux faire mieux ! Essaie de te coucher un peu plus tôt ce soir.',
    "Pas mal ! Tu as passé une bonne nuit, mais il y a encore de la place pour l'amélioration.",
    "Bravo ! Tu as passé une excellente nuit. Continue comme ça pour rester en forme et plein d'énergie !",
  ]
  // on cherche la dernière nuit qui a commencé après 17h hier
  const d = new Date()
  d.setDate(d.getDate() - 1)
  d.setHours(17, 0, 0, 0)
  const bedTimeBoundary = d.toISOString()
  const lastNite = nites.find((nite) => nite.bedTime > bedTimeBoundary)

  const lnDuration = lastNite
    ? new Date(lastNite.wakeUpTime).getTime() -
      new Date(lastNite.bedTime).getTime()
    : 0

  return (
    <main>
      <div>
        <p className="text-sm mt-4">
          {lastNite ? nitePrompt[lastNite.quality] : nitePrompt[0]}
        </p>
        {lastNite ? (
          <div className="flex items-center gap-5 mt-4">
            <img src={recorded} alt="nuit enregistrée" />
            <p className="text-sm font-bold">nuit enregistrée !</p>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-4">
            <img src={unrecorded} alt="nuit non enregistrée" />
            <Link
              to={'nites/create'}
              className="text-2xl font-bold bg-col1 border-2 border-col2 rounded-lg p-3 shadow-lg active:translate-y-2 active:shadow-none"
            >
              AJOUTER NUIT
            </Link>
          </div>
        )}
      </div>
      <Table lastNite={lastNite} lnDuration={lnDuration} />
      {lastNite && (
        <CompareTable
          nites={nites}
          lastNite={lastNite}
          lnDuration={lnDuration}
        />
      )}
    </main>
  )
}
