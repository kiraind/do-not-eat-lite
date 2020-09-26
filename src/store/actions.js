export const HYDRATE             = 0
export const COMPLETE_ONBOARDING = 1

export async function completeOnboarding() {
  return { type: COMPLETE_ONBOARDING }
}

export async function hydrate() {
  return {
    type: HYDRATE,
    payload: {
      
    }
  }
}