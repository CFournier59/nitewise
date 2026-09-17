import React from 'react'

type CustomInputProps = {
  type: 'date' | 'time'
  value?: string
  onClick?: () => void
}

const CustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ type, value, onClick }, ref) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const todayISO = new Date().toISOString().split('T')[0]
    const yesterdayISO = yesterday.toISOString().split('T')[0]

    // value est une string formatée selon dateFormat, ici "dd/MM/yyyy"
    // donc on doit la reparser si on veut comparer à today/yesterday
    let label = value

    if (type === 'date' && value) {
      // On convertit "dd/MM/yyyy" -> "yyyy-MM-dd" pour comparer
      const [day, month, year] = value.split('/')
      const valueISO = `${year}-${month}-${day}`

      if (valueISO === todayISO) {
        label = "aujourd'hui"
      } else if (valueISO === yesterdayISO) {
        label = 'hier'
      }
    }

    const buttonPrompt =
      type === 'date'
        ? label || 'Sélectionnez une date'
        : value || 'quelle heure ?'

    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="underline decoration-solid font-bold bg-col1 border-2 border-col2 rounded-lg px-2 py-1 shadow-lg active:translate-y-2 active:shadow-none"
      >
        {buttonPrompt}
      </button>
    )
  }
)

export default CustomInput
