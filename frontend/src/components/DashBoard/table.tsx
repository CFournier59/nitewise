import type { Nite } from '../../types'
import { hoursOf, minutesOf } from '../../utils'

export default function Table({
  lastNite,
  lnDuration,
}: {
  lastNite: Nite | undefined
  lnDuration: number
}) {
  return (
    <section className={`mt-4 ${!lastNite && 'opacity-50'}`}>
      <h2 className="text-xl">La nuit dernière</h2>
      <table className="bg-col2 rounded-lg w-full mt-2">
        <tbody>
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
              {`${hoursOf(lnDuration)}h${minutesOf(lnDuration).toString().padStart(2, '0')}min`}
            </td>
            <td
              className={`text-center text-2xl pb-2 ${!lastNite && 'text-col2'}`}
            >
              {lastNite ? lastNite.quality : '0'}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
