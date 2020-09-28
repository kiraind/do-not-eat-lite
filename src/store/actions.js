import { AsyncStorage } from 'react-native'

import { init as initDatabase } from '../database/index.js'

export const HYDRATE = 0
export const COMPLETE_ONBOARDING = 1
export const SAVE_SETTINGS = 2

export function completeOnboarding () {
  return async dispatch => {
    await AsyncStorage.setItem(
      'onboarded',
      JSON.stringify(true)
    )

    await initDatabase()

    dispatch({ type: COMPLETE_ONBOARDING })
  }
}

export async function hydrate () {
  // for debugging
  // await AsyncStorage.clear()

  const [
    onboarded,
    name,
    targetCalories,
    logLocation
  ] = (await AsyncStorage.multiGet([
    'onboarded',
    'name',
    'targetCalories',
    'logLocation'
  ])).map(pair => pair[1] && JSON.parse(pair[1]))

  const payload = {}

  if (onboarded !== null) {
    payload.onboarded = onboarded
  }
  if (name !== null) {
    payload.name = name
  }
  if (targetCalories !== null) {
    payload.targetCalories = targetCalories
  }
  if (logLocation !== null) {
    payload.logLocation = logLocation
  }

  return {
    type: HYDRATE,
    payload
  }
}

export function saveSettings (settings) {
  return async dispatch => {
    await AsyncStorage.setItem(
      'name',
      JSON.stringify(settings.name)
    )
    await AsyncStorage.setItem(
      'targetCalories',
      JSON.stringify(settings.targetCalories)
    )
    await AsyncStorage.setItem(
      'logLocation',
      JSON.stringify(settings.logLocation)
    )

    dispatch({
      type: SAVE_SETTINGS,
      payload: settings
    })
  }
}
