import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Carousel({ children }: { children: React.ReactNode }) {
  // --- Carousel state + handlers ---
  const [index, setIndex] = useState(0)

  const count = Array.isArray(children) ? children.length : 1

  const next = () => {
    setIndex((prev) => (prev === count - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev === 0 ? count - 1 : prev - 1))
  }

  return (
    <div
      style={{
        width: '300px',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: `${count * 300}px`,
          transform: `translateX(-${index * 300}px)`,
          transition: 'transform 0.4s ease',
        }}
      >
        {children}
      </div>

      <div className="flex justify-between mt-10">
        {index === 0 ? (
          <div aria-hidden="true"></div>
        ) : (
          <div className="flex flex-col items-center">
            <button type="button" onClick={prev}>
              <ArrowLeft className="bg-col1 w-10 h-10 p-1 border-2 border-col2 rounded-full shadow-lg active:translate-y-2 active:shadow-none" />
            </button>
            <p className="text-xs mt-1">retour</p>
          </div>
        )}
        {index === count - 1 ? (
          <div aria-hidden="true"></div>
        ) : (
          <div className="flex flex-col items-center">
            <button type="button" onClick={next}>
              <ArrowRight className="bg-col1 w-10 h-10 p-1 border-2 border-col2 rounded-full shadow-lg active:translate-y-2 active:shadow-none" />
            </button>
            <p className="text-xs mt-1">suivant</p>
          </div>
        )}
      </div>
    </div>
  )
}
