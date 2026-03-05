import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router'
import Carousel from '../../components/Carousel'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomInput from '../../components/CustomInput'
import type { Nite, FormData } from '../../types'
const modules = import.meta.glob('/src/assets/score*.svg', { eager: true })
const scoreImages = Object.values(modules).map((m: any) => m.default)
import { checkForNite } from '../../utils'

export default function NiteForm({ nites }: { nites: Nite[] }) {
  // --- valeurs par défaut ---
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(22)
  yesterday.setMinutes(0)

  const today = new Date()

  // --- states atomiques ---
  const [redirect, setRedirect] = useState(false)

  const [bedDay, setBedDay] = useState<Date>(yesterday)
  const [bedHour, setBedHour] = useState<Date>(new Date(0, 0, 0, 22, 0))

  const [wakeUpDay, setWakeUpDay] = useState<Date>(today)
  const [wakeUpHour, setWakeUpHour] = useState<Date>(new Date(0, 0, 0, 7, 0))

  const [minWakeUpDay, setMinWakeUpDay] = useState<Date>(yesterday)
  const [maxWakeUpDay, setMaxWakeUpDay] = useState<Date>(today)

  const [minWakeUpHour, setMinWakeUpHour] = useState<Date>(
    new Date(0, 0, 0, 0, 0)
  )
  const [maxWakeUpHour, setMaxWakeUpHour] = useState<Date>(
    new Date(0, 0, 0, 16, 45)
  )

  const [quality, setQuality] = useState<number>(3)
  const [notes, setNotes] = useState<string>('')

  const firstRender = useRef(true)

  // --- helpers ---
  const isSameDay = (d1: Date, d2: Date) =>
    d1.toLocaleString('sv-SE').slice(0, 10) ===
    d2.toLocaleString('sv-SE').slice(0, 10)

  function mergeDateAndTime(date: Date, time: Date): string {
    const merged = new Date(date)
    merged.setHours(time.getHours())
    merged.setMinutes(time.getMinutes())
    return merged.toLocaleString('sv-SE')
  }

  // --- recalcul automatique des limites ---
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const bedIsToday = isSameDay(bedDay, today)

    // 1) Si coucher aujourd’hui et heure > 17 → forcer 00:00
    if (bedIsToday && bedHour.getHours() >= 17) {
      const newHour = new Date(0, 0, 0, 0, 0)
      setBedHour(newHour)
      return
    }

    // 2) Si coucher aujourd’hui → réveil aujourd’hui
    if (bedIsToday) {
      const newWakeUpDay = today
      setWakeUpDay(newWakeUpDay)

      const newWakeUpHour = new Date(
        0,
        0,
        0,
        bedHour.getHours(),
        bedHour.getMinutes() + 15
      )
      setWakeUpHour(newWakeUpHour)

      setMinWakeUpDay(today)
      setMaxWakeUpDay(today)

      setMinWakeUpHour(newWakeUpHour)
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
      return
    }

    // 3) Si coucher avant 17h → réveil même jour
    if (bedHour.getHours() < 17) {
      const newWakeUpDay = new Date(bedDay)
      setWakeUpDay(newWakeUpDay)

      const newWakeUpHour = new Date(
        0,
        0,
        0,
        bedHour.getHours(),
        bedHour.getMinutes() + 15
      )
      setWakeUpHour(newWakeUpHour)

      setMinWakeUpDay(newWakeUpDay)
      setMaxWakeUpDay(newWakeUpDay)

      setMinWakeUpHour(newWakeUpHour)
      setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
      return
    }

    // 4) Si coucher après 17h → réveil lendemain
    const bedDate = new Date(bedDay)
    const nextDay = new Date(bedDate)
    nextDay.setDate(bedDate.getDate() + 1)

    setWakeUpDay(nextDay)
    setMinWakeUpDay(bedDate)
    setMaxWakeUpDay(nextDay)

    const newWakeUpHour = new Date(0, 0, 0, 7, 0)
    setWakeUpHour(newWakeUpHour)

    setMinWakeUpHour(new Date(0, 0, 0, 0, 0))
    setMaxWakeUpHour(new Date(0, 0, 0, 16, 45))
  }, [bedDay, bedHour])

  // --- soumission ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bedTime = mergeDateAndTime(bedDay, bedHour).replace(' ', 'T')
    const wakeUpTime = mergeDateAndTime(wakeUpDay, wakeUpHour).replace(' ', 'T')

    const payload: FormData = {
      id: 'nouvelID',
      title: 'nouveau titre',
      bedTime,
      wakeUpTime,
      quality,
      notes,
    }

    //vérifier que la nuit est valide
    const diff =
      new Date(payload.wakeUpTime).getTime() -
      new Date(payload.bedTime).getTime()
    if (diff < 0) {
      alert(
        '!!! Nuit non valide: date de réveil antérieure à la date de couché !!!'
      )
      return
    }
    const bedTimeToCheck = new Date(bedTime)
    if (bedTimeToCheck.getHours() >= 17) {
      bedTimeToCheck.setDate(bedTimeToCheck.getDate() + 1)
    }
    const already = checkForNite(bedTimeToCheck.toLocaleString('sv-SE'), nites)
    console.log(payload)
    console.log('Déjà existant ?', already)
    if (already) {
      alert(
        `!!! nuit non valide: une nuit est déjà enregistrée dans cette période: ${already.title} !!!`
      )
      return
    }
    alert('Nuit enregistrée avec succès!')
    setRedirect(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      {redirect && <Navigate to="/nites" />}

      <Carousel>
        {/* COUCHER */}
        <fieldset className="w-full">
          <legend className="text-xl">Date du couché</legend>
          <div className="flex flex-col gap-6 items-center mt-10">
            <DatePicker
              selected={bedDay}
              maxDate={today}
              onChange={(d: Date | null) => d && setBedDay(d)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput type="date" />}
            />
            à
            <DatePicker
              selected={bedHour}
              onChange={(d: Date | null) => d && setBedHour(d)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Heure"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              minTime={new Date(0, 0, 0, 0, 0)}
              maxTime={
                isSameDay(bedDay, today)
                  ? new Date(0, 0, 0, 16, 45)
                  : new Date(0, 0, 0, 23, 45)
              }
              customInput={<CustomInput type="time" />}
            />
          </div>
        </fieldset>

        {/* RÉVEIL */}
        <fieldset className="w-full">
          <legend className="text-xl">Date du réveil</legend>
          <div className="flex flex-col gap-6 items-center mt-10">
            <DatePicker
              selected={wakeUpDay}
              minDate={minWakeUpDay}
              maxDate={maxWakeUpDay}
              onChange={(d: Date | null) => d && setWakeUpDay(d)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput type="date" />}
            />
            à
            <DatePicker
              selected={wakeUpHour}
              onChange={(d: Date | null) => d && setWakeUpHour(d)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Heure"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              minTime={minWakeUpHour}
              maxTime={maxWakeUpHour}
              customInput={<CustomInput type="time" />}
            />
          </div>
        </fieldset>

        {/* QUALITÉ */}
        <fieldset className="w-full">
          <legend className="text-xl">Bien Dormi ?</legend>
          <div className="flex justify-between mt-20">
            {[1, 2, 3, 4, 5].map((score, i) => (
              <div
                key={score}
                className={`active:translate-y-2 ${quality !== score ? 'opacity-40' : ''}`}
              >
                <input
                  type="radio"
                  id={`score${score}`}
                  name="quality"
                  value={score}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  checked={quality === score}
                  className="relative h-10 w-10 z-20 opacity-0"
                />
                <br />
                <img
                  src={scoreImages[i]}
                  alt="score"
                  className="relative bottom-12 right-1 z-10"
                />
                <label
                  htmlFor={`score${score}`}
                  className="text-xs relative bottom-12"
                >
                  {['nooon!', 'pas ouf', 'bof', 'ça va', 'au top!'][i]}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* COMMENTAIRE */}
        <fieldset className="w-full">
          <legend className="text-xl">Commentaire et validation</legend>

          <input
            type="text"
            className="bg-col1 w-full border-2 border-col2 rounded-lg p-2 mt-10"
            placeholder="commentaire facultatif..."
            maxLength={150}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="mx-auto mt-10 w-fit">
            <button
              type="submit"
              className="text-2xl font-bold bg-col1 border-2 border-col2 rounded-lg p-3 shadow-lg active:translate-y-2 active:shadow-none"
            >
              ENREGISTRER
            </button>
          </div>
        </fieldset>
      </Carousel>
    </form>
  )
}
