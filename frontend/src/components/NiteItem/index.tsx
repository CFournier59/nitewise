import type { Nite } from '../../types'
import { hoursOf, minutesOf } from '../../utils'
import Modal from 'react-modal'
import { useState } from 'react'
import { X, PencilLine, Trash } from 'lucide-react'

export default function NiteItem({
  nite,
  nDuration,
}: {
  nite: Nite
  nDuration: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      <article
        className="flex justify-around bg-col2 rounded-lg shadow-lg border-2 border-col3 active:translate-y-2 shadow-none"
        onClick={() => setIsOpen(true)}
      >
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

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Exemple de modale"
        className="mx-6 p-4 bg-col2 translate-y-1/4 outline-none border-2 border-col3 "
      >
        <div className="flex justify-between">
          <h2 className="text-2xl">{nite.title}</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-7 h-7 p-1 border-2 border-col3 rounded-full shadow-lg active:translate-y-2 active:shadow-none" />
          </button>
        </div>
        <div className="bg-col4 my-4 p-4 rounded-lg flex flex-col gap-2">
          <h3 className="font-bold">Date du couché</h3>
          <p>{new Date(nite.bedTime).toLocaleDateString()}</p>
          <h3 className="font-bold">Date du réveil</h3>
          <p>{new Date(nite.wakeUpTime).toLocaleDateString()}</p>
          <h3 className="font-bold">Durée de sommeil</h3>
          <p>{`${hoursOf(nDuration)}h${minutesOf(nDuration).toString().padStart(2, '0')}min`}</p>
          <h3 className="font-bold">Qualité de sommeil</h3>
          <p>{nite.quality} / 5</p>
          <h3 className="font-bold">Notes</h3>
          <p>{nite.notes}</p>
        </div>
        <div className="flex justify-end gap-20">
          <div className="flex flex-col items-center">
            <button>
              {' '}
              <PencilLine className="w-7 h-7 p-1 border-2 border-col3 rounded-full shadow-lg active:translate-y-2 active:shadow-none" />
            </button>
            <p className="text-xs">éditer</p>
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => setIsConfirmOpen(true)}>
              {' '}
              <Trash className="w-7 h-7 p-1 border-2 border-col3 rounded-full shadow-lg active:translate-y-2 active:shadow-none" />
            </button>
            <p className="text-xs">supprimer</p>
          </div>
        </div>
        <Modal
          isOpen={isConfirmOpen}
          onRequestClose={() => setIsConfirmOpen(false)}
          contentLabel="Exemple de modale"
          className="mx-6 p-4 bg-col2
          translate-y-3/2 outline-none border-2 border-col3 "
        >
          <p className="text-xl text-center">
            Veux-tu vraiment effacer la {nite.title} ?
          </p>
          <div className="flex justify-around gap-12 mt-4">
            <button className="text-2xl font-bold bg-col1 border-2 border-col3 rounded-lg p-3 shadow-lg active:translate-y-2 active:shadow-none">
              OUI
            </button>
            <button
              className="text-2xl font-bold bg-col1 border-2 border-col3 rounded-lg p-3 shadow-lg active:translate-y-2 active:shadow-none"
              onClick={() => setIsConfirmOpen(false)}
            >
              NON
            </button>
          </div>
        </Modal>
      </Modal>
    </>
  )
}
