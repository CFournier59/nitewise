import type { Nite } from '../../types'
import { useState } from 'react'

export default function CompareTable({
  lastNite,
  nites,
}: {
  lastNite: Nite | undefined
  nites: Nite[]
}) {
  // creating a potental night before last night
  const d = new Date()
  d.setDate(d.getDate() - 2)
  d.setHours(17, 0, 0, 0)
  const bedTimeBoundary = d.toISOString()
  if (!lastNite) return null
  const niteBeforeLast: Nite | undefined = nites.find(
    (nite) => nite.bedTime > bedTimeBoundary && nite.bedTime < lastNite.bedTime
  )

  // creating the average night
  const avgBedTime = ((nites: Nite[]) => {
    if (nites.length === 0) return null
    const DAY = 24 * 60 * 60 * 1000
    const BOUNDARY = 17 * 60 * 60 * 1000
    const timestamps = nites.map((nite) => {
      const date = new Date(nite.bedTime)
      const ms = date.getHours() * 3600000 + date.getMinutes() * 60000
      return ms < BOUNDARY ? ms + DAY : ms
    })
    const avg = timestamps.reduce((a, b) => a + b, 0) / timestamps.length
    const normalized = avg >= DAY ? avg - DAY : avg
    const hours = Math.floor(normalized / 3600000)
    const minutes = Math.floor((normalized % 3600000) / 60000)
    return `1970-01-01T${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:00`
  })(nites)
  const avgWakeUpTime = ((nites: Nite[]) => {
    if (nites.length === 0) return null
    const DAY = 24 * 60 * 60 * 1000
    const BOUNDARY = 17 * 60 * 60 * 1000
    const timestamps = nites.map((nite) => {
      const date = new Date(nite.wakeUpTime)
      const ms = date.getHours() * 3600000 + date.getMinutes() * 60000
      return ms > BOUNDARY ? ms - DAY : ms
    })
    const avg = timestamps.reduce((a, b) => a + b, 0) / timestamps.length
    const normalized = avg <= 0 ? avg + DAY : avg
    const hours = Math.floor(normalized / 3600000)
    const minutes = Math.floor((normalized % 3600000) / 60000)
    return `1970-01-01T${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:00`
  })(nites)
  console.log(avgWakeUpTime)
  const avgSleepTime = Math.round(
    nites.reduce((acc, nite) => {
      const diff =
        new Date(nite.wakeUpTime).getTime() - new Date(nite.bedTime).getTime()
      return acc + diff
    }, 0) / nites.length
  )
  const avgQuality = Math.round(
    nites.reduce((acc, nite) => acc + nite.quality, 0) / nites.length
  )
  const averageNite: Nite | undefined = {
    bedTime: avgBedTime!,
    wakeUpTime: avgWakeUpTime!,
    quality: avgQuality,
    id: 'average',
    title: 'nuit moyenne',
    notes: '0',
  }

  // enabling the feature to toggle comparison element

  const [compareMode, setCompareMode] = useState<string>('average')
  function toggleElement() {
    if (compareMode === 'average') {
      setCompareMode('previous')
    } else {
      setCompareMode('average')
    }
  }
  const elementToCompare =
    compareMode === 'average' ? averageNite : niteBeforeLast
  console.log(elementToCompare)

  return (
    <section className={`mt-4 ${!lastNite && 'opacity-50'}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl">Par rapport à</h2>
        <button
          onClick={toggleElement}
          className="underline decoration-solid font-bold bg-col1 border-2 border-col2 rounded-lg px-2 py-1 shadow-lg active:translate-y-2 active:shadow-none"
        >
          {compareMode === 'average' ? "d'habitude" : 'la nuit précédente'}
        </button>
      </div>
      <table className="bg-col2 rounded-lg w-full mt-2">
        <tr>
          <th className="pt-2">heure du couché</th>
          <th className="pt-2">heure du levé</th>
        </tr>
        <tr>
          <td className={`text-center text-2xl ${!lastNite && 'text-col2'}`}>
            {lastNite ? lastNite.bedTime.substring(11, 16) : '0'}
          </td>
          <td className={`text-center text-2xl ${!lastNite && 'text-col2'}`}>
            {lastNite ? lastNite.wakeUpTime.substring(11, 16) : '0'}
          </td>
        </tr>
        <tr>
          <th>temps de sommeil</th>
          <th>score de forme</th>
        </tr>
        <tr>
          <td
            className={`text-center text-2xl pb-2 ${!lastNite && 'text-col2'}`}
          >
            {lastNite
              ? (() => {
                  const diff =
                    new Date(lastNite.wakeUpTime).getTime() -
                    new Date(lastNite.bedTime).getTime()

                  const mins = Math.floor(diff / 60000)
                  const h = Math.floor(mins / 60)
                  const m = mins % 60

                  return `${h}h${m.toString().padStart(2, '0')}min`
                })()
              : '0h'}
          </td>
          <td
            className={`text-center text-2xl pb-2 ${!lastNite && 'text-col2'}`}
          >
            {lastNite ? lastNite.quality : '0'}
          </td>
        </tr>
      </table>
    </section>
  )
}
