import Header from '../../components/Header'
import DashBoard from '../../components/DashBoard/dashboard'
import type { Nite } from '../../types'

export default function Home({ nites }: { nites: Nite[] }) {
  return (
    <div className="m-6">
      <Header />
      <main>
        <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
          Bonjour <span className="text-col2">utilisateur</span>
        </h1>
        <DashBoard nites={nites} />
      </main>
    </div>
  )
}
