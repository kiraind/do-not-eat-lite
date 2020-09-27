import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { defaultTargetCalories } from '../constants.js'

import {
  HYDRATE,
  COMPLETE_ONBOARDING,
  SAVE_SETTINGS
} from './actions.js'

const defaultState = {
  hydrated: false,

  onboarded: false,
  name: '',
  targetCalories: defaultTargetCalories,
  logLocation: true
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
