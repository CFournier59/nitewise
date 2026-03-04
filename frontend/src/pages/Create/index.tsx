import React, { useState, useEffect, useRef } from 'react'
import Carousel from '../../components/Carousel'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CustomInput from '../../components/CustomInput'
import type { Nite, FormData } from '../../types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Create({ nites }: { nites: Nite[] }) {
  // valeurs par défaut de la date de coucher
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const [bedDay, setBedDay] = useState<Date | null>(yesterday)
  const [bedHour, setBedHour] = useState<Date | null>(new Date(0, 0, 0, 22, 0))

  // valeur par défaut du Formulaire
  const [formData, setFormData] = useState<FormData>({
    id: '',
    title: '',
    bedTime: yesterday.toLocaleString('sv-SE'),
    wakeUpTime: '',
    quality: 0,
    notes: '',
  })

  // valeur par défaut de la date de réveil
  const [wakeUpDay, setWakeUpDay] = useState<Date | null>(new Date())
  const [minWakeUpDay, setMinWakeUpDay] = useState<Date | undefined>(yesterday)
  const [maxWakeUpDay, setMaxWakeUpDay] = useState<Date | undefined>(new Date())

  const [wakeUpHour, setWakeUpHour] = useState<Date | null>(
    new Date(0, 0, 0, 7, 0)
  )
  const [minWakeUpHour, setMinWakeUpHour] = useState<Date | undefined>(
    new Date(0, 0, 0, 0, 0)
  )
  const [maxWakeUpHour, setMaxWakeUpHour] = useState<Date | undefined>(
    new Date(0, 0, 0, 16, 45)
  )

  // calcul des limites d'heures de coucher
  const isBedDayToday =
    new Date(formData.bedTime).toLocaleDateString('fr-FR') ===
    new Date().toLocaleDateString('fr-FR')
  const minBedHour = new Date(0, 0, 0, 0, 0)
  const maxBedHour = isBedDayToday
    ? new Date(0, 0, 0, 16, 45)
    : new Date(0, 0, 0, 23, 45)

  //ignorer le useEffect lors du premier rendu
  const firstRender = useRef(true)
  const isSameDay = (d1: Date, d2: Date) =>
    d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10)

  //changement des limites en fonction de la date de coucher
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    // mise à 00 des heures auto si on passe bedDay à aujourd'hui
    if (
      isSameDay(new Date(formData.bedTime), new Date()) &&
      bedHour!.getHours() > 16
    ) {
      setBedHour(new Date(0, 0, 0, 0, 0))
      return
    }
    // si coucher et levé à aujourd'hui
    if (isSameDay(new Date(formData.bedTime), new Date())) {
      setWakeUpDay(new Date())
      setMinWakeUpDay(new Date())
      setMaxWakeUpDay(new Date())
      setWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMinWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
      console.log('limite haute 16:45')
      return
    }
    // si jour du couché différent du jour de levé et que :  heure du couché < 17
    if (bedHour!.getHours() < 17) {
      setWakeUpDay(new Date(formData.bedTime))
      setMinWakeUpDay(new Date(formData.bedTime))
      setMaxWakeUpDay(new Date(formData.bedTime))
      setWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMinWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
    } else {
      // si heure du couché > 17
      const bedDate: Date = new Date(formData.bedTime)
      setWakeUpDay(
        new Date(
          bedDate.getFullYear(),
          bedDate.getMonth(),
          bedDate.getDate() + 1,
          0,
          0
        )
      )
      setMinWakeUpDay(new Date(formData.bedTime))
      setMaxWakeUpDay(
        new Date(
          bedDate.getFullYear(),
          bedDate.getMonth(),
          bedDate.getDate() + 1,
          0,
          0
        )
      )
      setWakeUpHour(new Date(0, 0, 0, 7, 0))
      setMinWakeUpHour(new Date(0, 0, 0, 0, 0))
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
    }
  }, [formData.bedTime, bedHour])

  //changement des limites d'heure de levé en fonction du jour de levé choisi par l'utilisateur
  function toggleWakeUpHourBoundaries(d: Date) {
    if (isSameDay(new Date(formData.bedTime), new Date())) return
    if (isSameDay(new Date(formData.bedTime), d)) {
      setWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMinWakeUpHour(
        new Date(0, 0, 0, bedHour!.getHours(), bedHour!.getMinutes() + 15)
      )
      setMaxWakeUpHour(new Date(0, 0, 0, 23, 45))
      console.log('limite haute 23h45')
    } else {
      setWakeUpHour(new Date(0, 0, 0, 7, 0))
      setMinWakeUpHour(new Date(0, 0, 0, 0, 0))
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
      console.log('limite haute 16:45')
    }
  }

  // assemblage des jours et des heures pour constituer les dates de coucher et réveil
  function mergeDateAndTime(date: Date | null, time: Date | null): string {
    if (!date) return ''
    const merged = new Date(date)
    if (time) {
      merged.setHours(time.getHours())
      merged.setMinutes(time.getMinutes())
    }
    return merged.toLocaleString('sv-SE')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Merci pour votre message, je vous répondrai dès que possible !')
    setFormData({
      id: '',
      title: '',
      bedTime: '',
      wakeUpTime: '',
      quality: 0,
      notes: '',
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div>
        <Header />
        <main className="mt-18 mx-6 mb-35">
          <h1 className="text-3xl font-bold mt-6 font-[Libre_Caslon_Text]">
            Nouvelle nuit
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <Carousel>
              <section className="w-full">
                <label htmlFor="name" className="text-xl">
                  Date du couché
                </label>
                <div className="flex flex-col gap-6 items-center mt-10">
                  <DatePicker
                    selected={bedDay}
                    maxDate={new Date()}
                    onChange={(d: Date | null) => {
                      setBedDay(d)
                      setFormData({
                        ...formData,
                        bedTime: mergeDateAndTime(d, bedHour),
                      })
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="px-3 py-2 border-2 border-col2 rounded-lg bg-col1 font-bold decoration-underline"
                    calendarClassName=""
                    customInput={<CustomInput type="date" />}
                    name="date"
                  />
                  à
                  <DatePicker
                    selected={bedHour}
                    onChange={(d: Date | null) => {
                      setBedHour(d)
                      setFormData({
                        ...formData,
                        bedTime: mergeDateAndTime(bedDay, d),
                      })
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Heure"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    minTime={minBedHour}
                    maxTime={maxBedHour}
                    customInput={<CustomInput type="time" />}
                    className="px-3 py-2 border-2 border-col2 rounded-lg bg-col1 font-bold decoration-underline"
                  />
                </div>
              </section>
              <section className="w-full">
                <label htmlFor="name" className="text-xl">
                  Date du réveil
                </label>
                <div className="flex flex-col gap-6 items-center mt-10">
                  <DatePicker
                    selected={wakeUpDay}
                    minDate={minWakeUpDay}
                    maxDate={maxWakeUpDay}
                    onChange={(d: Date | null) => {
                      if (!d) return
                      setWakeUpDay(d)
                      setFormData({
                        ...formData,
                        wakeUpTime: mergeDateAndTime(d, wakeUpHour),
                      })
                      toggleWakeUpHourBoundaries(d)
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="px-3 py-2 border-2 border-col2 rounded-lg bg-col1 font-bold decoration-underline"
                    calendarClassName="ml-50"
                    customInput={<CustomInput type="date" />}
                    name="date"
                  />
                  à
                  <DatePicker
                    selected={wakeUpHour}
                    onChange={(d: Date | null) => {
                      setWakeUpHour(d)
                      setFormData({
                        ...formData,
                        wakeUpTime: mergeDateAndTime(wakeUpDay, d),
                      })
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    minTime={minWakeUpHour}
                    maxTime={maxWakeUpHour}
                    timeIntervals={15}
                    timeCaption="Heure"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    customInput={<CustomInput type="time" />}
                    className="px-3 py-2 border-2 border-col2 rounded-lg bg-col1 font-bold decoration-underline"
                  />
                </div>
              </section>
              <section className="w-full">
                <div>note</div>
              </section>
              <section className="w-full">
                <div>commentaire</div>
              </section>
            </Carousel>
          </form>
        </main>
      </div>
      <Footer />
    </>
  )
}
