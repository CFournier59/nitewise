import Header from '../../components/Header'
import Footer from '../../components/Footer'
import type { Nite } from '../../types'

export default function Create({ nites }: { nites: Nite[] }) {
  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
            Nouvelle nuit
          </h1>
        </main>
      </div>
      <Footer />
    </>
  )
}
