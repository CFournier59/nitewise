export default function Home({ nites }: { nites: any[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to NiteWise</h1>
      <p className="text-lg text-gray-700">Your ultimate night out planner</p>
    </div>
  )
}
