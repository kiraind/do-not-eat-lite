import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { defaultTargetCalories } from '../constants.js'
import { MealItem } from '../models/Meal.js'
import { ProductItem } from '../models/Product.js'

import {
  HYDRATE,
  COMPLETE_ONBOARDING,
  SAVE_SETTINGS,
  ENPLATE_MEAL,
  EAT_PLATE,
  LOAD_EATINGS,
  LOAD_PRODUCT,
  LOAD_FRIDGE
} from './actions.js'

const defaultState = {
  hydrated: false,

  onboarded: false,
  name: '',
  targetCalories: defaultTargetCalories,
  logLocation: true,

  plate: [],
  eatings: null,
  fridge: null,

  products: {} // cache
}

function mainReducer (state = defaultState, action) {
  const { type, payload } = action

  if (type === HYDRATE) {
    return {
      ...state,
      ...payload,
      hydrated: true
    }
  } else if (type === COMPLETE_ONBOARDING) {
    return {
      ...state,

      onboarded: true
    }
  } else if (type === SAVE_SETTINGS) {
    return {
      ...state,
      ...payload
    }
  } else if (type === ENPLATE_MEAL) {
    const duplicateId = state.plate.findIndex(
      item => item.id === payload.id && (
        (item instanceof MealItem && payload instanceof MealItem) ||
        (item instanceof ProductItem && payload instanceof ProductItem)
      )
    )

    if (duplicateId === -1) {
      return {
        ...state,
        plate: [...state.plate, payload]
      }
    } else {
      return {
        ...state,
        plate: [
          ...state.plate.slice(0, duplicateId),
          state.plate[duplicateId].merge(payload),
          ...state.plate.slice(duplicateId + 1)
        ]
      }
    }
  } else if (type === EAT_PLATE) {
    return {
      ...state,
      plate: [],
      eatings:
        state.eatings === null
          ? null
          : [payload, ...state.eatings]
    }
  } else if (type === LOAD_EATINGS) {
    return {
      ...state,
      eatings:
        state.eatings === null
          ? payload
          : [
            ...state.eatings,
            ...payload
          ]
    }
  } else if (type === LOAD_PRODUCT) {
    return {
      ...state,
      products: {
        ...state.products,
        [payload.id]: payload
      }
    }
  } else if (type === LOAD_FRIDGE) {
    return {
      ...state,
      fridge: payload
    }
  } else {
    return state
  }
}

const store = createStore(
  mainReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
