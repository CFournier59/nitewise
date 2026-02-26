import Header from '../../components/Header'
import DashBoard from '../../components/DashBoard/dashboard'
import Footer from '../../components/Footer'
import type { Nite } from '../../types'

export default function Home({ nites }: { nites: Nite[] }) {
  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
            Bonjour <span className="text-col2">utilisateur</span>
          </h1>
          <DashBoard nites={nites} />
        </main>
      </div>
      <Footer />
    </>
  )
}
