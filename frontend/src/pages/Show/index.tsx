import type { Nite } from '../../types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Show({ nites }: { nites: Nite[] }) {
  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
            Mes nuits
          </h1>
          <div>
            {nites.map((nite) => (
              <p key={nite.id}>{nite.title}</p>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
