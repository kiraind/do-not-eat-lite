import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'

const Stack = createStackNavigator()

const PlateTab = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='plate'
      options={{
        title: 'Тарелка'
      }}
      component={PlaceholderScreen}
    />
  </Stack.Navigator>
)

export default PlateTab
