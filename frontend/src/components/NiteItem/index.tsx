import type { Nite } from '../../types'
import { hoursOf, minutesOf } from '../../utils'

export default function NiteItem({
  nite,
  nDuration,
}: {
  nite: Nite
  nDuration: number
}) {
  return (
    <article className="flex justify-around bg-col2 rounded-lg shadow-lg border-2 border-col3 active:translate-y-2 shadow-none">
      <div className="w-3/10 flex flex-col items-center border-r-2 border-col3 ">
        <p>{new Date(nite.bedTime).toLocaleDateString()}</p>
        <p>{new Date(nite.wakeUpTime).toLocaleDateString()}</p>
      </div>
      <div className="w-1/5 flex flex-col items-center border-r-2 border-col3 ">
        <p>{nite.bedTime.substring(11, 16)}</p>
        <p>{nite.wakeUpTime.substring(11, 16)}</p>
      </div>
      <div className="w-3/10 flex flex-col items-center justify-center border-r-2 border-col3 ">
        {`${hoursOf(nDuration)}h${minutesOf(nDuration).toString().padStart(2, '0')}min`}
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <p>{nite.quality} / 5</p>
      </div>
    </article>
  )
}
