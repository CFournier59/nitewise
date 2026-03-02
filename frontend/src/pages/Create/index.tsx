import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useState, type SetStateAction } from 'react'
import type { Nite, FormData } from '../../types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Create({ nites }: { nites: Nite[] }) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const [date, setDate] = useState<Date | null>(yesterday)

  const [formData, setFormData] = useState<FormData>({
    time: '',
    date: yesterday.toISOString().split('T')[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prepare data to send
    alert('Merci pour votre message, je vous répondrai dès que possible !')
    setFormData({ time: '', date: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log(formData)
  }

  type CustomInputProps = {
    value?: string
    onClick?: () => void
  }
  const CustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="w-full px-3 py-2 border rounded-lg bg-white text-gray-700 text-left"
      >
        {date === yesterday ? 'hier' : value}
      </button>
    )
  )

  console.log(date)
  console.log(formData)
  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
            Nouvelle nuit
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label htmlFor="name" className="text-xl">
              Date du couché
            </label>
            <DatePicker
              selected={date}
              onChange={(d: Date | null) => {
                setDate(d)
                setFormData({
                  ...formData,
                  date: d ? d.toISOString().split('T')[0] : '',
                })
              }}
              dateFormat="dd/MM/yyyy"
              className=" px-3 py-2 border-2 border-col2 rounded-lg bg-col1 font-bold decoration-underline "
              customInput={<CustomInput />}
              name="date"
            />
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email
              </label>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-700">
                Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-base-color text-white rounded-lg hover:bg-base-hover-color transition-colors cursor-pointer"
            >
              Envoyer
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  )
}
