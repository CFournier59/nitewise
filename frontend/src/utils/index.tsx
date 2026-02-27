import type { Nite } from '../types'

export function hoursOf(value: number) {
  const hours = Math.floor(value / 3600000)
  return hours
}

export function minutesOf(value: number) {
  const minutes = Math.floor((value % 3600000) / 60000)
  return minutes
}

export function computeDayTransition(value: number, transitionType: string) {
  const DAY = 24 * 60 * 60 * 1000
  const BOUNDARY = 17 * 60 * 60 * 1000
  transitionType === 'bedTime'
    ? value < BOUNDARY
      ? value + DAY
      : value
    : value > BOUNDARY
      ? value - DAY
      : value
  return value
}

export function unComputeDayTransition(value: number, transitionType: string) {
  const DAY = 24 * 60 * 60 * 1000
  transitionType === 'bedTime'
    ? value >= DAY
      ? value - DAY
      : value
    : value <= 0
      ? value + DAY
      : value
  return value
}

// computing the difference between last night and the element to compare
export function computeTimeDiff(
  time1: string,
  time2: string,
  transitionType: string
) {
  const d1 = new Date(time1)
  const ms1 = d1.getHours() * 3600000 + d1.getMinutes() * 60000
  const d2 = new Date(time2)
  const ms2 = d2.getHours() * 3600000 + d2.getMinutes() * 60000
  const diff =
    computeDayTransition(ms1, transitionType) -
    computeDayTransition(ms2, transitionType)
  return diff === 0
    ? 'pareil'
    : diff < 0
      ? `${hoursOf(-diff)}h${minutesOf(-diff).toString().padStart(2, '0')}min plus tôt`
      : `${hoursOf(diff)}h${minutesOf(diff).toString().padStart(2, '0')}min plus tard`
}

export function computeDurationDiff(duration1: number, duration2: number) {
  const diff = duration1 - duration2
  return diff === 0
    ? 'pareil'
    : diff < 0
      ? `${hoursOf(-diff)}h${minutesOf(-diff).toString().padStart(2, '0')}min de moins`
      : `${hoursOf(diff)}h${minutesOf(diff).toString().padStart(2, '0')}min de plus`
}

export function checkForNite(date: string, nites: Nite[]) {
  const lowDate = new Date(date)
  lowDate.setDate(lowDate.getDate() - 1)
  lowDate.setHours(17, 0, 0, 0)
  const lowBoundary = lowDate.toISOString()
  const highDate = new Date(date)
  highDate.setHours(16, 59, 59, 999)
  const highBoundary = highDate.toISOString()

  return nites.find(
    (nite) => nite.bedTime >= lowBoundary && nite.bedTime <= highBoundary
  )
}
