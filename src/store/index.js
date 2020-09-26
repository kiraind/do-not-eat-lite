import { createStore } from 'redux'
import {
  HYDRATE,
  COMPLETE_ONBOARDING,
} from './actions.js'

const defaultState = {
  hydrated: false,

  onboarded: false,
}

function mainReducer(state = defaultState, action) {
  const { type, payload } = action

  if(type === HYDRATE) {
    return {
      ...state,
      ...payload,
      hydrated: true 
    }
  } else if(type === COMPLETE_ONBOARDING) {
    return {
      ...state,

      onboarded: true,
    }
  } else {
    return state
  }
}

const store = createStore(mainReducer)

export default store