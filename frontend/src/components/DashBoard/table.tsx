import type { Nite } from '../../types'

export default function Table({ lastNite }: { lastNite: Nite | undefined }) {
  return (
    <section className={`mt-4 ${!lastNite && 'opacity-50'}`}>
      <h2 className="text-xl">La nuit dernière</h2>
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
