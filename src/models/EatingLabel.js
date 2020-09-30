import { MILLILITERS } from './MeasureUnit.js'
import { snackTreshold } from '../constants.js'

export const SNACK = 0
export const DRINKING = 1
export const NIGHT_EATING = 2
export const BREAKFAST = 3
export const LUNCH = 4
export const DINNER = 5
export const AN_SNACK = 6
export const SUPPER = 7

export const EatingLabelString = [
  'Перекус',
  'Питье',
  'Полуночный жор',
  'Завтрак',
  'Ланч',
  'Обед',
  'Полдник',
  'Ужин'
]

function makeTime (hours = 0, munites = 0, seconds = 0) {
  return (hours * 3600 + munites * 60 + seconds) * 1000
}

export const EatingPeriods = [
  null,
  null,
  { from: makeTime(0, 0), to: makeTime(5, 0) }, // NIGHT_EATING
  { from: makeTime(5, 0), to: makeTime(10, 30) }, // BREAKFAST
  { from: makeTime(10, 30), to: makeTime(12, 30) }, // LUNCH
  { from: makeTime(12, 30), to: makeTime(15, 30) }, // DINNER
  { from: makeTime(15, 30), to: makeTime(18, 0) }, // AN_SNACK
  { from: makeTime(18, 0), to: makeTime(0, 0) } // SUPPER
]

export function getCurrent (items) {
  if (items.every(item => item.measureUnit === MILLILITERS)) {
    return DRINKING
  }

  const totalKcal = items.reduce(
    (sum, item) => sum + item.toCalories(item.amount),
    0
  )

  if (totalKcal < snackTreshold) {
    return SNACK
  }

  const dt = new Date()
  const now = makeTime(dt.getHours(), dt.getMinutes(), dt.getSeconds())

  for (let label = NIGHT_EATING; label < SUPPER; label += 1) {
    if (now <= EatingPeriods[label].to) {
      return label
    }
  }

  return SUPPER
}
