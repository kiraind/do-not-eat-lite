import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'

const Stack = createStackNavigator()

const FridgeTab = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='frigde'
      options={{
        title: 'Моя еда'
      }}
      component={PlaceholderScreen}
    />
  </Stack.Navigator>
)

export default FridgeTab
