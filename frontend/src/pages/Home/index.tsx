import Header from '../../components/Header'

export default function Home({ nites }: { nites: any[] }) {
  return (
    <div className="m-6">
      <Header />
      <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
        Bonjour <span className="text-col2">utilisateur</span>
      </h1>
    </div>
  )
}
