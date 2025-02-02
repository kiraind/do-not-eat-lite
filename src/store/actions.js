import { AsyncStorage } from 'react-native'

import * as Location from 'expo-location'

import { init as initDatabase, connection as db } from '../database/index.js'
import Eating from '../models/Eating.js'
import Meal, { MealItem } from '../models/Meal.js'
import Product, { ProductItem } from '../models/Product.js'
import * as EatingLabel from '../models/EatingLabel.js'

export const HYDRATE = 0
export const COMPLETE_ONBOARDING = 1
export const SAVE_SETTINGS = 2
export const REGISTER_PRODUCT = 3
export const ENPLATE_MEAL = 4
export const LOAD_PRODUCT = 5
export const EAT_PLATE = 6
export const LOAD_EATINGS = 7
export const LOAD_FRIDGE = 8
export const REGISTER_MEAL = 9
export const UPDATE_MEAL = 10
export const DEPLATE_MEAL = 11

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
  if (amount < 0) {
    return {
      type: -1
    }
  }
  if (amount === 0) {
    return {
      type: DEPLATE_MEAL,
      payload: item
    }
  }

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

export function deplateMeal (item) {
  return {
    type: DEPLATE_MEAL,
    payload: item
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
        EatingLabel.getCurrent(plate)
      )

      eating.meals = []

      for (const item of plate) {
        await item.pushToEating(eating.id)
        eating.meals.push(item)
      }

      dispatch({ type: EAT_PLATE, payload: eating })
    } catch (e) {
      await db.rollbackTransaction()
      throw e
    }

    await db.commitTransaction()
  }
}

export function loadEatings (count, offset = 0) {
  return async dispatch => {
    const eatings = await Eating.getRecent(count, offset)

    dispatch({ type: LOAD_EATINGS, payload: eatings })
  }
}

export function acquireProduct (product, amount) {
  return async dispatch => {
    const updated = await product.acquire(amount)

    dispatch({ type: LOAD_PRODUCT, payload: updated })

    return updated
  }
}

export function cookMeal (meal, amount) {
  return async dispatch => {
    const updated = await meal.cook(amount)

    dispatch({ type: UPDATE_MEAL, payload: updated })

    return updated
  }
}

export function loadProduct ({ barcode, id }) {
  return async dispatch => {
    const product = barcode
      ? await Product.getByBarcode(barcode)
      : await Product.getById(id)

    if (product !== null) {
      dispatch({ type: LOAD_PRODUCT, payload: product })
    }

    return product
  }
}

export function loadFrigde () {
  return async dispatch => {
    const meals = await Meal.getFromFridge()

    dispatch({ type: LOAD_FRIDGE, payload: meals })
  }
}

export function registerMeal (meal) {
  return async dispatch => {
    await meal.register()

    dispatch({ type: REGISTER_MEAL, payload: meal })
  }
}
