import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import Router from './src/Router.js'

import store from './src/store/index.js'
import { hydrate } from './src/store/actions.js'

export default () => {
  useEffect(() => {
    async function hydrateStore() {
      store.dispatch(
        await hydrate()
      )
    }

    hydrateStore()
  }, [])

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
