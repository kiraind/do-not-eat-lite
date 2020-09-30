import { AsyncStorage } from 'react-native'

import * as Location from 'expo-location'

import { init as initDatabase, connection as db } from '../database/index.js'
import Eating from '../models/Eating.js'
import Meal, { MealItem } from '../models/Meal.js'
import Product, { ProductItem } from '../models/Product.js'

export const HYDRATE = 0
export const COMPLETE_ONBOARDING = 1
export const SAVE_SETTINGS = 2
export const REGISTER_PRODUCT = 3
export const ENPLATE_MEAL = 4
export const ACQUIRE_MEAL = 5
export const THROW_MEAL = 6
export const EAT_PLATE = 7

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

    if (settings.logLocation) {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        settings.logLocation = false
      }
    }

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

export function enplateMeal (item, amount) {
  if (item instanceof Meal) {
    return {
      type: ENPLATE_MEAL,
      payload: new MealItem(item, amount)
    }
  } else if (item instanceof Product) {
    return {
      type: ENPLATE_MEAL,
      payload: new ProductItem(item, amount)
    }
  }
}

export function eatPlate () {
  return async (dispatch, getState) => {
    const { plate, logLocation } = getState()

    let latitude = null
    let longitude = null

    if (logLocation) {
      const { coords } = await Location.getCurrentPositionAsync()

      latitude = coords.latitude
      longitude = coords.longitude
    }

    try {
      await db.beginTransaction()

      const eating = await Eating.registerNew(
        new Date(),
        latitude,
        longitude,
        0
      )

      for (const item of plate) {
        await item.pushToEating(eating.id)
      }

      dispatch({ type: EAT_PLATE })
    } catch (e) {
      await db.rollbackTransaction()
      throw e
    } finally {
      await db.commitTransaction()
    }
  }
}
