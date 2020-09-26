import { AsyncStorage } from 'react-native'

export const HYDRATE             = 0
export const COMPLETE_ONBOARDING = 1

export async function completeOnboarding() {
  await AsyncStorage.setItem('onboard', 'true')

  return { type: COMPLETE_ONBOARDING }
}

export async function hydrate() {
  const [
    onboard,
  ] = (await AsyncStorage.multiGet([
    'onboard',
  ])).map(pair => pair[1])

  return {
    type: HYDRATE,
    payload: {
      onboard: !!onboard
    }
  }
}