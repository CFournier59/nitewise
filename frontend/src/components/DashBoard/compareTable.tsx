import type { Nite } from '../../types'
import { useState } from 'react'
import {
  hoursOf,
  minutesOf,
  computeDayTransition,
  unComputeDayTransition,
  computeTimeDiff,
  computeDurationDiff,
} from '../../utils'

export default function CompareTable({
  lastNite,
  nites,
  lnDuration,
}: {
  lastNite: Nite | undefined
  nites: Nite[]
  lnDuration: number
}) {
  // creating a potental night before last night
  const d = new Date()
  d.setDate(d.getDate() - 2)
  d.setHours(17, 0, 0, 0)
  const bedTimeBoundary = d.toISOString()
  if (!lastNite) return null
  const niteBefore: Nite | undefined = nites.find(
    (nite) => nite.bedTime > bedTimeBoundary && nite.bedTime < lastNite.bedTime
  )

  const nbDuration = niteBefore
    ? new Date(niteBefore.wakeUpTime).getTime() -
      new Date(niteBefore.bedTime).getTime()
    : 0

  // creating an average night

  const avgBedTime = ((nites: Nite[]) => {
    if (nites.length === 0) return null
    const timestamps = nites.map((nite) => {
      const date = new Date(nite.bedTime)
      const ms = date.getHours() * 3600000 + date.getMinutes() * 60000
      return computeDayTransition(ms, 'bedTime')
    })
    const avg = timestamps.reduce((a, b) => a + b, 0) / timestamps.length
    unComputeDayTransition(avg, 'bedTime')
    return `1970-01-01T${String(hoursOf(avg)).padStart(2, '0')}:${String(
      minutesOf(avg)
    ).padStart(2, '0')}:00`
  })(nites)

  const avgWakeUpTime = ((nites: Nite[]) => {
    if (nites.length === 0) return null
    const timestamps = nites.map((nite) => {
      const date = new Date(nite.wakeUpTime)
      const ms = date.getHours() * 3600000 + date.getMinutes() * 60000
      return computeDayTransition(ms, 'wakeUpTime')
    })
    const avg = timestamps.reduce((a, b) => a + b, 0) / timestamps.length
    unComputeDayTransition(avg, 'wakeUpTime')
    return `1970-01-01T${String(hoursOf(avg)).padStart(2, '0')}:${String(
      minutesOf(avg)
    ).padStart(2, '0')}:00`
  })(nites)

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

  const avgDuration = Math.round(
    nites.reduce((acc, nite) => {
      const diff =
        new Date(nite.wakeUpTime).getTime() - new Date(nite.bedTime).getTime()
      return acc + diff
    }, 0) / nites.length
  )

  // enabling the feature to toggle comparison element
  const [compareMode, setCompareMode] = useState<string>('average')
  function toggleElement() {
    if (compareMode === 'average') {
      setCompareMode('previous')
    } else {
      setCompareMode('average')
    }
  }

  const timeToCompare = niteBefore
    ? compareMode === 'average'
      ? averageNite
      : niteBefore
    : averageNite

  const durationToCompare = niteBefore
    ? compareMode === 'average'
      ? avgDuration
      : nbDuration
    : avgDuration

  const qualityToCompare = niteBefore
    ? compareMode === 'average'
      ? avgQuality
      : niteBefore.quality
    : avgQuality

  return (
    <section className={`mt-4 ${!lastNite && 'opacity-50'}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl">Par rapport à {!niteBefore && "d'habitude"}</h2>
        {niteBefore && (
          <button
            onClick={toggleElement}
            className="underline decoration-solid font-bold bg-col1 border-2 border-col2 rounded-lg px-2 py-1 shadow-lg active:translate-y-2 active:shadow-none"
          >
            {compareMode === 'average' ? "d'habitude" : 'la nuit précédente'}
          </button>
        )}
      </div>
      <table className="bg-col2 rounded-lg w-full mt-2">
        <tbody>
          <tr>
            <th className="pt-2">heure du couché</th>
            <th className="pt-2">heure du levé</th>
          </tr>
          <tr>
            <td className={`text-center  `}>
              {computeTimeDiff(
                lastNite.bedTime,
                timeToCompare.bedTime,
                'bedTime'
              )}
            </td>
            <td className={`text-center `}>
              {computeTimeDiff(
                lastNite.wakeUpTime,
                timeToCompare.wakeUpTime,
                'wakeUpTime'
              )}
            </td>
          </tr>
          <tr>
            <th>temps de sommeil</th>
            <th>score de forme</th>
          </tr>
          <tr>
            <td className={`text-center pb-2 `}>
              {computeDurationDiff(lnDuration, durationToCompare)}
            </td>
            <td className="text-center pb-2">
              {(() => {
                const diff = lastNite.quality - qualityToCompare
                return diff === 0 ? 'pareil' : diff
              })()}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
