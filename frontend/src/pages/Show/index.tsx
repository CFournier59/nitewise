import type { Nite } from '../../types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NiteItem from '../../components/NiteItem'

export default function Show({ nites }: { nites: Nite[] }) {
  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text] ">
            Mes nuits
          </h1>
          <div className="flex flex-col gap-4 mt-4">
            {nites.map((nite) => {
              const nDuration =
                new Date(nite.wakeUpTime).getTime() -
                new Date(nite.bedTime).getTime()
              return (
                <NiteItem key={nite.id} nite={nite} nDuration={nDuration} />
              )
            })}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
